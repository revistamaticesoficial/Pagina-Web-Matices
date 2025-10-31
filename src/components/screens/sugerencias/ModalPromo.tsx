'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Benefit } from '@/types/sugerencias';
import { BenefitService } from '@/lib/benefit-service';
import { Gift, Calendar, X, CheckCircle, Loader2, AlertTriangle, Copy, Check, Download, QrCode, Printer } from 'lucide-react';
import { formatDateLabel } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalPromoProps {
  isRedeemOpen: boolean;
  setIsRedeemOpen: (isOpen: boolean) => void;
  selectedBenefit: Benefit | null;
}

type ModalStep = 'form' | 'confirm' | 'success' | 'error';

interface FormData {
  nombreCompleto: string;
  dni: string;
  telefono: string;
  email?: string;
  aceptaTerminos: boolean;
}

interface FormErrors {
  nombreCompleto?: string;
  dni?: string;
  telefono?: string;
  email?: string;
  aceptaTerminos?: string;
}

const ModalPromo = ({ isRedeemOpen, setIsRedeemOpen, selectedBenefit }: ModalPromoProps) => {
  const [step, setStep] = useState<ModalStep>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [formData, setFormData] = useState<FormData>({
    nombreCompleto: '',
    dni: '',
    telefono: '',
    email: '',
    aceptaTerminos: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showCoupon, setShowCoupon] = useState(false);

  useEffect(() => {
    if (isRedeemOpen) {
      setStep('form');
      setFormData({
        nombreCompleto: '',
        dni: '',
        telefono: '',
        email: '',
        aceptaTerminos: false
      });
      setErrors({});
      setGeneratedCode('');
    }
  }, [isRedeemOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombreCompleto.trim()) {
      newErrors.nombreCompleto = 'El nombre es requerido';
    } else if (formData.nombreCompleto.trim().length < 3) {
      newErrors.nombreCompleto = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.dni.trim()) {
      newErrors.dni = 'El DNI es requerido';
    } else if (!/^\d{7,8}$/.test(formData.dni.replace(/\D/g, ''))) {
      newErrors.dni = 'El DNI debe tener 7 u 8 dígitos';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'Ingresa un teléfono válido';
    }

    if (!formData.aceptaTerminos) {
      newErrors.aceptaTerminos = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !selectedBenefit) return;

    setIsLoading(true);

    try {
      // Usar el servicio para canjear el beneficio
      const result = await BenefitService.redeemBenefit(selectedBenefit, {
        nombreCompleto: formData.nombreCompleto,
        dni: formData.dni,
        telefono: formData.telefono,
        email: formData.email
      });

      if (result.success) {
        setStep('success');
      } else {
        console.error('Error al canjear beneficio:', result.error);
        setToastMessage(
          typeof result.error === 'string' ? result.error : 'No se pudo canjear el beneficio.'
        );
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
        setStep('error');
      }
    } catch (error) {
      console.error('Error al canjear beneficio:', error);
      setStep('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setToastMessage('Código copiado al portapapeles');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Error al copiar código:', error);
    }
  };

  const generateCouponImage = () => {
    // Esta función generaría una imagen del cupón
    // Por ahora, simplemente mostramos el cupón visual
    setShowCoupon(true);
  };

  const downloadCoupon = async () => {
    try {
      // Crear un canvas para generar la imagen del cupón
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx || !selectedBenefit) return;

      // Configurar el tamaño del canvas
      canvas.width = 800;
      canvas.height = 400;

      // Fondo con gradiente
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Borde decorativo
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Texto del título
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('CUPÓN DE DESCUENTO', canvas.width / 2, 80);

      // Logo de Revista Matices
      ctx.font = 'bold 24px Arial';
      ctx.fillText('REVISTA MATICES', canvas.width / 2, 120);

      // Información del beneficio
      ctx.font = 'bold 28px Arial';
      ctx.fillText(selectedBenefit.title, canvas.width / 2, 180);

      // Comercio
      ctx.font = '20px Arial';
      ctx.fillText(`Comercio: ${selectedBenefit.business}`, canvas.width / 2, 220);

      // Código de descuento
      ctx.font = 'bold 36px monospace';
      ctx.fillStyle = '#ffff00';
      ctx.fillText(generatedCode, canvas.width / 2, 280);

      // Fecha de vencimiento
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.fillText(`Válido hasta: ${formatDate(selectedBenefit.validUntil)}`, canvas.width / 2, 320);

      // Usuario
      ctx.font = '14px Arial';
      ctx.fillText(`Cliente: ${formData.nombreCompleto}`, canvas.width / 2, 350);

      // Descargar la imagen
      const link = document.createElement('a');
      link.download = `cupon-matices-${generatedCode}.png`;
      link.href = canvas.toDataURL();
      link.click();

      setToastMessage('Cupón descargado exitosamente');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Error al descargar cupón:', error);
    }
  };

  const printCoupon = () => {
    // Crear una ventana de impresión
    const printWindow = window.open('', '_blank');
    if (!printWindow || !selectedBenefit) return;

    const couponHTML = `
      <html>
        <head>
          <title>Cupón de Descuento - Revista Matices</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .coupon {
              background: white;
              border-radius: 15px;
              padding: 30px;
              max-width: 500px;
              width: 100%;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
              border: 4px solid #fff;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              border-bottom: 2px dashed #ddd;
              padding-bottom: 20px;
            }
            .title {
              font-size: 28px;
              font-weight: bold;
              color: #333;
              margin-bottom: 5px;
            }
            .subtitle {
              color: #666;
              font-size: 16px;
            }
            .content {
              text-align: center;
              margin: 20px 0;
            }
            .benefit-title {
              font-size: 20px;
              font-weight: bold;
              color: #333;
              margin-bottom: 10px;
            }
            .business {
              color: #666;
              margin-bottom: 20px;
            }
            .code-box {
              background: #f8f9fa;
              border: 2px solid #007bff;
              border-radius: 8px;
              padding: 15px;
              margin: 20px 0;
            }
            .code-label {
              font-size: 12px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 5px;
            }
            .code {
              font-size: 24px;
              font-family: monospace;
              font-weight: bold;
              color: #007bff;
              letter-spacing: 2px;
            }
            .info {
              font-size: 14px;
              color: #666;
              margin: 5px 0;
            }
            .qr-placeholder {
              width: 80px;
              height: 80px;
              background: #f8f9fa;
              border: 2px solid #ddd;
              border-radius: 8px;
              margin: 20px auto;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              color: #666;
            }
            @media print {
              body { background: white; }
              .coupon { box-shadow: none; border: 2px solid #000; }
            }
          </style>
        </head>
        <body>
          <div class="coupon">
            <div class="header">
              <div class="title">CUPÓN DE DESCUENTO</div>
              <div class="subtitle">REVISTA MATICES</div>
            </div>

            <div class="content">
              <div class="benefit-title">${selectedBenefit.title}</div>
              <div class="business">${selectedBenefit.business}</div>

              <div class="code-box">
                <div class="code-label">Código de Canje</div>
                <div class="code">${generatedCode}</div>
              </div>

              <div class="info">Cliente: ${formData.nombreCompleto}</div>
              <div class="info">Válido hasta: ${formatDate(selectedBenefit.validUntil)}</div>
              <div class="info">${selectedBenefit.discount}</div>

              <div class="qr-placeholder">
                QR Code
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(couponHTML);
    printWindow.document.close();

    // Esperar a que se cargue el contenido y luego imprimir
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  const renderBenefitInfo = () => {
    if (!selectedBenefit) return null;

    return (
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-lg text-gray-900 mb-1">
              {selectedBenefit.title}
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              {selectedBenefit.business}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Válido hasta: {formatDateLabel(selectedBenefit.validUntil)}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {selectedBenefit.discount}
              </Badge>
            </div>
          </div>
        </div>
        </div>
    );
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderBenefitInfo()}

      <div className="space-y-4">
          <div>
          <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre completo *
          </label>
            <input
              id="nombreCompleto"
              type="text"
            value={formData.nombreCompleto}
            onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
            className={`w-full rounded-lg border px-3 py-3 focus:outline-none focus:ring-2 transition-colors ${
              errors.nombreCompleto
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
              placeholder="Ej: Juan Pérez"
            />
          {errors.nombreCompleto && (
            <p className="mt-1 text-sm text-red-600">{errors.nombreCompleto}</p>
          )}
          </div>

            <div>
          <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-2">
            DNI *
          </label>
              <input
                id="dni"
                type="text"
            value={formData.dni}
            onChange={(e) => handleInputChange('dni', e.target.value.replace(/\D/g, ''))}
            className={`w-full rounded-lg border px-3 py-3 focus:outline-none focus:ring-2 transition-colors ${
              errors.dni
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
                placeholder="Ej: 12345678"
            maxLength={8}
              />
          {errors.dni && (
            <p className="mt-1 text-sm text-red-600">{errors.dni}</p>
          )}
            </div>

            <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono *
          </label>
              <input
                id="telefono"
                type="tel"
            value={formData.telefono}
            onChange={(e) => handleInputChange('telefono', e.target.value)}
            className={`w-full rounded-lg border px-3 py-3 focus:outline-none focus:ring-2 transition-colors ${
              errors.telefono
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Ej: +54 9 351 123 4567"
          />
          {errors.telefono && (
            <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email (opcional)
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Ej: juan@email.com"
              />
            </div>

        {/* Términos y Condiciones */}
        {selectedBenefit?.terms && selectedBenefit.terms.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Términos y condiciones:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {selectedBenefit.terms.map((term, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-start gap-3">
          <input
            id="aceptaTerminos"
            type="checkbox"
            checked={formData.aceptaTerminos}
            onChange={(e) => handleInputChange('aceptaTerminos', e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="aceptaTerminos" className="text-sm text-gray-700">
            Acepto los términos y condiciones del beneficio *
          </label>
        </div>
        {errors.aceptaTerminos && (
          <p className="text-sm text-red-600">{errors.aceptaTerminos}</p>
        )}
      </div>

      <motion.div 
        className="flex items-center justify-end gap-3 pt-4 border-t"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRedeemOpen(false)}
                className="px-6"
              >
                Cancelar
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isLoading || !formData.aceptaTerminos}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Canjear Beneficio'
                )}
              </Button>
            </motion.div>
          </motion.div>
        </form>
  );

  const renderCouponVisual = () => {
    if (!selectedBenefit) return null;

    return (
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl shadow-lg text-white max-w-md mx-auto">
        {/* Header del cupón */}
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold mb-1">CUPÓN DE DESCUENTO</h3>
          <p className="text-purple-100">REVISTA MATICES</p>
        </div>

        {/* Línea punteada */}
        <div className="border-t-2 border-dashed border-white/50 mb-4"></div>

        {/* Información del beneficio */}
        <div className="text-center mb-4">
          <h4 className="text-lg font-bold mb-2">{selectedBenefit.title}</h4>
          <p className="text-sm text-purple-100">{selectedBenefit.business}</p>
        </div>

        {/* Código de descuento */}
        <div className="bg-white text-gray-900 p-3 rounded-lg text-center mb-4">
          <p className="text-xs text-gray-500 mb-1">CÓDIGO DE CANJE</p>
          <p className="text-xl font-mono font-bold tracking-wider">{generatedCode}</p>
        </div>

        {/* Información adicional */}
        <div className="text-center text-sm space-y-1">
          <p>Cliente: {formData.nombreCompleto}</p>
          <p>Válido hasta: {formatDate(selectedBenefit.validUntil)}</p>
          <p className="text-purple-100">{selectedBenefit.discount}</p>
        </div>

        {/* QR Code placeholder */}
        <div className="flex justify-center mt-4">
          <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
            <QrCode className="w-8 h-8" />
          </div>
        </div>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          ¡Solicitud registrada!
        </h3>
        <p className="text-gray-600">
          Presenta tu DNI en el comercio para retirar tu beneficio.
        </p>
      </div>

      {/* Mostrar cupón visual si está activado */}
      {showCoupon && renderCouponVisual()}

      

      {/* Botones de acción para el cupón */}
      <div className="flex gap-3">
        
        <Button
          onClick={() => setIsRedeemOpen(false)}
          variant="outline"
          className="flex-1"
        >
          Cerrar
        </Button>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg text-left">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">Importante:</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Beneficio: {selectedBenefit?.title}</li>
              <li>• Comercio: {selectedBenefit?.business}</li>
              <li>• Cliente: {formData.nombreCompleto} — DNI: {formData.dni}</li>
              {formData.email && <li>• Email: {formData.email}</li>}
              <li>• Válido hasta: {selectedBenefit ? formatDate(selectedBenefit.validUntil) : ''}</li>
              <li>• Presenta tu DNI en el comercio para validar la identidad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Error al canjear el beneficio
        </h3>
        <p className="text-gray-600">
          {toastMessage || 'Ha ocurrido un error al procesar tu solicitud. Por favor, intenta nuevamente.'}
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => setStep('form')}
          variant="outline"
          className="flex-1"
        >
          Intentar nuevamente
        </Button>
        <Button
          onClick={() => setIsRedeemOpen(false)}
          className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white"
        >
          Cerrar
        </Button>
      </div>
    </div>
  );

  if (!isRedeemOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        aria-modal="true"
        role="dialog"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => !isLoading && setIsRedeemOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.4 
          }}
        >
          {/* Header */}
          <motion.div 
            className="flex items-center justify-between px-6 py-4 border-b border-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h2 
              className="text-xl font-bold text-gray-900"
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {step === 'form' && 'Canjear Beneficio'}
              {step === 'success' && '¡Beneficio Canjeado!'}
              {step === 'error' && 'Error'}
            </motion.h2>
            {!isLoading && (
              <motion.button
                onClick={() => setIsRedeemOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Cerrar modal"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            )}
          </motion.div>

          {/* Content */}
          <motion.div 
            className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-120px)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {step === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderForm()}
                </motion.div>
              )}
              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                >
                  {renderSuccess()}
                </motion.div>
              )}
              {step === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderError()}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              className="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalPromo;





