'use client';

import { useState, useRef} from 'react';
import { Calendar, Clock, MapPin, Users, Camera, X, Plus, Edit, Eye, ChefHat, DollarSign, Star, Tag } from 'lucide-react';

interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: Date;
  hora: string;
  ubicacion: string;
  chef: string;
  tipoCocina: string;
  precio: number;
  capacidad: number;
  imagen: string;
  etiquetas: string[];
  puntuacion: number;
}

interface FormData {
  titulo: string;
  descripcion: string;
  fecha: Date;
  hora: string;
  ubicacion: string;
  chef: string;
  tipoCocina: string;
  precio: string;
  capacidad: string;
  etiquetas: string[];
  imagen: string | null;
}

const EventosGastronomicos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventos, setEventos] = useState<Evento[]>([
    {
      id: 1,
      titulo: "Cena Maridaje de Vinos",
      descripcion: "Una experiencia única combinando vinos seleccionados con platos gourmet",
      fecha: "2024-12-15",
      hora: "19:30",
      ubicacion: "Restaurante El Patio",
      chef: "María González",
      tipoCocina: "Mediterránea",
      precio: 85,
      capacidad: 24,
      imagen: "/api/placeholder/300/200",
      etiquetas: ["Vinos", "Gourmet", "Maridaje"],
      puntuacion: 4.8
    },
    {
      id: 2,
      titulo: "Masterclass de Pasta Artesanal",
      descripcion: "Aprende a hacer pasta fresca con técnicas tradicionales italianas",
      fecha: "2024-12-20",
      hora: "16:00",
      ubicacion: "Escuela Culinaria Italiana",
      chef: "Giuseppe Romano",
      tipoCocina: "Italiana",
      precio: 65,
      capacidad: 12,
      imagen: "/api/placeholder/300/200",
      etiquetas: ["Masterclass", "Pasta", "Italiano"],
      puntuacion: 4.9
    },
    {
      id: 3,
      titulo: "Festival de Tacos Gourmet",
      descripcion: "Degusta una variedad de tacos creativos con ingredientes premium",
      fecha: "2024-12-25",
      hora: "18:00",
      ubicacion: "Plaza Central",
      chef: "Carlos Mendoza",
      tipoCocina: "Mexicana Fusion",
      precio: 45,
      capacidad: 50,
      imagen: "/api/placeholder/300/200",
      etiquetas: ["Tacos", "Festival", "Mexicana"],
      puntuacion: 4.7
    }
  ]);

  const [eventoEditando, setEventoEditando] = useState<Evento | null>(null);
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    chef: '',
    tipoCocina: '',
    precio: '',
    capacidad: '',
    etiquetas: [],
    imagen: null
  });

  const [nuevaEtiqueta, setNuevaEtiqueta] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const abrirModal = (evento: Evento | null = null) => {
    if (evento) {
      setEventoEditando(evento);
      setFormData({
        titulo: evento.titulo,
        descripcion: evento.descripcion,
        fecha: evento.fecha,
        hora: evento.hora,
        ubicacion: evento.ubicacion,
        chef: evento.chef,
        tipoCocina: evento.tipoCocina,
        precio: evento.precio.toString(),
        capacidad: evento.capacidad.toString(),
        etiquetas: [...evento.etiquetas],
        imagen: evento.imagen
      });
    } else {
      setEventoEditando(null);
      setFormData({
        titulo: '',
        descripcion: '',
        fecha: '',
        hora: '',
        ubicacion: '',
        chef: '',
        tipoCocina: '',
        precio: '',
        capacidad: '',
        etiquetas: [],
        imagen: null
      });
    }
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setEventoEditando(null);
    setNuevaEtiqueta('');
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarEtiqueta = () => {
    if (nuevaEtiqueta.trim() && !formData.etiquetas.includes(nuevaEtiqueta.trim())) {
      setFormData(prev => ({
        ...prev,
        etiquetas: [...prev.etiquetas, nuevaEtiqueta.trim()]
      }));
      setNuevaEtiqueta('');
    }
  };

  const eliminarEtiqueta = (etiqueta: string) => {
    setFormData(prev => ({
      ...prev,
      etiquetas: prev.etiquetas.filter(e => e !== etiqueta)
    }));
  };

  const manejarImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          imagen: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const guardarEvento = () => {
    if (!formData.titulo || !formData.fecha || !formData.hora) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    if (eventoEditando) {
      const eventoActualizado: Evento = {
        ...eventoEditando,
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fecha: formData.fecha,
        hora: formData.hora,
        ubicacion: formData.ubicacion,
        chef: formData.chef,
        tipoCocina: formData.tipoCocina,
        precio: Number(formData.precio) || 0,
        capacidad: Number(formData.capacidad) || 0,
        etiquetas: formData.etiquetas,
        imagen: formData.imagen || "/api/placeholder/300/200"
      };
      setEventos(prev => prev.map(evento => 
        evento.id === eventoEditando.id ? eventoActualizado : evento
      ));
    } else {
      const nuevoEvento: Evento = {
        id: Date.now(),
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fecha: formData.fecha,
        hora: formData.hora,
        ubicacion: formData.ubicacion,
        chef: formData.chef,
        tipoCocina: formData.tipoCocina,
        precio: Number(formData.precio) || 0,
        capacidad: Number(formData.capacidad) || 0,
        etiquetas: formData.etiquetas,
        imagen: formData.imagen || "/api/placeholder/300/200",
        puntuacion: 0
      };
      setEventos(prev => [...prev, nuevoEvento]);
    }
    
    cerrarModal();
  };

  const verDetalleEvento = (eventoId: number) => {
    // Aquí simularíamos la navegación a la página de detalles
    console.log(`Navegando a /eventos/${eventoId}`);
    alert(`Navegando a la página de detalles del evento ${eventoId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-005B82 via-red-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-[#005B82] via-red-600 to-pink-600 bg-clip-text text-transparent">
              🍽️ Eventos
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Descubre experiencias gastronómicas únicas</p>
          </div>
          
          <button
            onClick={() => abrirModal()}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md hover:opacity-90 border-2 border-black hover:bg-black hover:text-white duration-200"
          >
            <Plus className="w-6 h-6" />
            Agregar Evento
          </button>
        </div>

        {/* Grid de Eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento) => (
            <div key={evento.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2">
              {/* Imagen del evento */}
              <div className="relative h-48 bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
                {evento.imagen && evento.imagen !== "/api/placeholder/300/200" ? (
                  <img src={evento.imagen} alt={evento.titulo} className="w-full h-full object-cover" />
                ) : (
                  <ChefHat className="w-16 h-16 text-white" />
                )}
                <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-sm">
                  {evento.tipoCocina}
                </div>
                {evento.puntuacion > 0 && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {evento.puntuacion}
                  </div>
                )}
              </div>

              {/* Contenido de la card */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                  {evento.titulo}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {evento.descripcion}
                </p>

                {/* Información del evento */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{evento.fecha}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{evento.hora}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{evento.ubicacion}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ChefHat className="w-4 h-4" />
                    <span>Chef {evento.chef}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{evento.capacidad} personas</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <DollarSign className="w-4 h-4" />
                      <span>${evento.precio}</span>
                    </div>
                  </div>
                </div>

                {/* Etiquetas */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {evento.etiquetas.slice(0, 3).map((etiqueta, index) => (
                    <span key={index} className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                      {etiqueta}
                    </span>
                  ))}
                </div>

                {/* Botones de acción */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => abrirModal(evento)}
                    className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                    title="Editar evento"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => verDetalleEvento(evento.id)}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Header del Modal */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">
                    {eventoEditando ? '✏️ Editar Evento' : '🚀 Crear Nuevo Evento'}
                  </h3>
                  <button
                    onClick={cerrarModal}
                    className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Cuerpo del Modal */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Columna Izquierda */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre del Evento *
                      </label>
                      <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={manejarCambio}
                        placeholder="Ej: Cena Maridaje de Vinos"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Descripción
                      </label>
                      <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={manejarCambio}
                        rows={3}
                        placeholder="Describe tu evento gastronómico..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          📅 Fecha *
                        </label>
                        <input
                          type="date"
                          name="fecha"
                          value={formData.fecha}
                          onChange={manejarCambio}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          🕐 Hora *
                        </label>
                        <input
                          type="time"
                          name="hora"
                          value={formData.hora}
                          onChange={manejarCambio}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📍 Ubicación
                      </label>
                      <input
                        type="text"
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={manejarCambio}
                        placeholder="Centro de Convenciones, Ciudad"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        👨‍🍳 Chef
                      </label>
                      <input
                        type="text"
                        name="chef"
                        value={formData.chef}
                        onChange={manejarCambio}
                        placeholder="Nombre del chef"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Columna Derecha */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🍽️ Tipo de Cocina
                      </label>
                      <select
                        name="tipoCocina"
                        value={formData.tipoCocina}
                        onChange={manejarCambio}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      >
                        <option value="">Selecciona el tipo</option>
                        <option value="Mediterránea">Mediterránea</option>
                        <option value="Italiana">Italiana</option>
                        <option value="Mexicana">Mexicana</option>
                        <option value="Asiática">Asiática</option>
                        <option value="Francesa">Francesa</option>
                        <option value="Fusión">Fusión</option>
                        <option value="Vegetariana">Vegetariana</option>
                        <option value="Vegana">Vegana</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          💰 Precio
                        </label>
                        <input
                          type="number"
                          name="precio"
                          value={formData.precio}
                          onChange={manejarCambio}
                          placeholder="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          👥 Capacidad
                        </label>
                        <input
                          type="number"
                          name="capacidad"
                          value={formData.capacidad}
                          onChange={manejarCambio}
                          placeholder="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🏷️ Etiquetas
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.etiquetas.map((etiqueta, index) => (
                          <span key={index} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                            {etiqueta}
                            <button
                              type="button"
                              onClick={() => eliminarEtiqueta(etiqueta)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={nuevaEtiqueta}
                          onChange={(e) => setNuevaEtiqueta(e.target.value)}
                          placeholder="Agregar etiqueta..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                          onKeyPress={(e) => e.key === 'Enter' && agregarEtiqueta()}
                        />
                        <button
                          type="button"
                          onClick={agregarEtiqueta}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Tag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📸 Imagen del Evento
                      </label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-red-400 transition-colors"
                      >
                        {formData.imagen ? (
                          <div className="space-y-2">
                            <img src={formData.imagen} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                            <p className="text-sm text-gray-600">Haz clic para cambiar</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                            <p className="text-gray-600">Haz clic para seleccionar una imagen</p>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={manejarImagen}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vista Previa */}
                <div className="mt-8 bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">👀 Vista Previa</h4>
                  <div className="bg-white rounded-lg p-4 flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                      {formData.imagen ? (
                        <img src={formData.imagen} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <ChefHat className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">
                        {formData.titulo || 'Título del evento'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        📅 {formData.fecha || '2024-12-15'} | 🕐 {formData.hora || '19:00'}
                      </p>
                      <p className="text-sm text-gray-600">
                        📍 {formData.ubicacion || 'Ubicación'}
                      </p>
                      {formData.chef && (
                        <p className="text-sm text-gray-600">
                          👨‍🍳 Chef {formData.chef}
                        </p>
                      )}
                    </div>
                    {formData.precio && (
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">${formData.precio}</p>
                        {formData.capacidad && (
                          <p className="text-sm text-gray-500">{formData.capacidad} personas</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                  <button
                    onClick={cerrarModal}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={guardarEvento}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                  >
                    {eventoEditando ? 'Actualizar Evento' : 'Crear Evento'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventosGastronomicos;