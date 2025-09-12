-- Schema para la base de datos de Matices
-- Ejecutar este archivo en Supabase SQL Editor

-- Tabla de beneficios
CREATE TABLE IF NOT EXISTS benefits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  business TEXT NOT NULL,
  business_logo TEXT,
  discount TEXT NOT NULL,
  discount_percentage INTEGER,
  code TEXT NOT NULL UNIQUE,
  valid_until DATE NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  terms JSONB, -- Array de términos y condiciones
  is_active BOOLEAN DEFAULT true,
  usage_limit INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de beneficios canjeados
CREATE TABLE IF NOT EXISTS redeemed_benefits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  benefit_id UUID NOT NULL REFERENCES benefits(id) ON DELETE CASCADE,
  nombre_completo TEXT NOT NULL,
  dni TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT,
  generated_code TEXT NOT NULL UNIQUE,
  redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Índices para optimización
  UNIQUE(benefit_id, dni), -- Un usuario solo puede canjear un beneficio una vez
  INDEX idx_benefit_id (benefit_id),
  INDEX idx_dni (dni),
  INDEX idx_generated_code (generated_code),
  INDEX idx_redeemed_at (redeemed_at)
);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at en benefits
CREATE TRIGGER update_benefits_updated_at
  BEFORE UPDATE ON benefits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Políticas RLS (Row Level Security)
ALTER TABLE benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE redeemed_benefits ENABLE ROW LEVEL SECURITY;

-- Políticas para benefits (todos pueden leer, solo admin puede modificar)
CREATE POLICY "Anyone can view active benefits" ON benefits
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage benefits" ON benefits
  FOR ALL USING (auth.role() = 'admin');

-- Políticas para redeemed_benefits
CREATE POLICY "Users can insert their own redemptions" ON redeemed_benefits
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own redemptions" ON redeemed_benefits
  FOR SELECT USING (
    dni = (SELECT raw_user_meta_data->>'dni' FROM auth.users WHERE id = auth.uid())
  );

-- Vista para estadísticas de beneficios
CREATE VIEW benefit_stats AS
SELECT
  b.id,
  b.title,
  b.business,
  b.discount,
  b.usage_limit,
  COUNT(rb.id) as redeemed_count,
  CASE
    WHEN b.usage_limit IS NOT NULL THEN
      CASE WHEN COUNT(rb.id) >= b.usage_limit THEN 'agotado'
           ELSE 'disponible' END
    ELSE 'disponible'
  END as status
FROM benefits b
LEFT JOIN redeemed_benefits rb ON b.id = rb.benefit_id
WHERE b.is_active = true
GROUP BY b.id, b.title, b.business, b.discount, b.usage_limit;

-- Insertar algunos datos de ejemplo
INSERT INTO benefits (title, description, business, discount, discount_percentage, code, valid_until, category, terms, usage_limit) VALUES
('20% OFF en Lomitos Completos', 'Descuento especial en todos los lomitos completos', 'Betos', '20% OFF', 20, 'LOMITO20', '2024-12-31', 'GASTRONOMIA', '["Válido solo para lomitos completos", "No acumulable con otras promociones", "Máximo 2 lomitos por persona"]'::jsonb, 100),
('15% OFF en Pizza Familiar', 'Descuento en pizzas familiares de cualquier sabor', 'Pizza Libre', '15% OFF', 15, 'PIZZA15', '2025-01-15', 'GASTRONOMIA', '["Solo pizzas familiares", "Delivery gratuito incluido", "Válido de lunes a jueves"]'::jsonb, 75),
('Helado Gratis por Compra Mayor a $5.000', 'Llevá un helado de regalo en compras superiores a $5.000', 'Heladería Cremosa', 'HELADO GRATIS', NULL, 'HELADO5K', '2025-02-15', 'GASTRONOMIA', '["Compra mínima $5.000", "Helado de 1/4 kg", "Sabores disponibles según stock"]'::jsonb, 50);
