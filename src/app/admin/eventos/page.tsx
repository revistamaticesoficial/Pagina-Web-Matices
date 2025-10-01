'use client';

import { useState, useRef} from 'react';
import { Calendar, Clock, MapPin, Users, Camera, X, Plus, Edit, Eye, ChefHat, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { eventos as eventosData } from '@/data/eventos';
import { Event } from '@/types/sugerencias';
import { useParams } from 'next/navigation';




// Usamos el tipo Event importado de tipos

interface FormData {
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  ubicacion: string;
  capacidad: string;
  imagen: string | null;
}

const EventosGastronomicos = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Función para cargar eventos desde localStorage
  const loadEventos = (): Event[] => {
    if (typeof window !== 'undefined') {
      const storedEventos = localStorage.getItem('eventos');
      if (storedEventos) {
        return JSON.parse(storedEventos);
      }
    }
    return eventosData;
  };

  // Función para guardar eventos en localStorage
  const saveEventos = (eventos: Event[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('eventos', JSON.stringify(eventos));
    }
  };

  const [eventos, setEventos] = useState<Event[]>(loadEventos);

  const [eventoEditando, setEventoEditando] = useState<Event | null>(null);
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    capacidad: '',
    imagen: null
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const abrirModal = (evento: Event | null = null) => {
    if (evento) {
      setEventoEditando(evento);
      setFormData({
        titulo: evento.title,
        descripcion: evento.description,
        fecha: evento.date,
        hora: evento.time,
        ubicacion: evento.location,
        capacidad: evento.capacity?.toString() || '',
        imagen: evento.image
      });
    } else {
      setEventoEditando(null);
      setFormData({
        titulo: '',
        descripcion: '',
        fecha: '',
        hora: '',
        ubicacion: '',
        capacidad: '',
        imagen: null
      });
    }
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setEventoEditando(null);
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      const eventoActualizado: Event = {
        ...eventoEditando,
        title: formData.titulo,
        description: formData.descripcion,
        date: formData.fecha,
        time: formData.hora,
        location: formData.ubicacion,
        price: undefined,
        capacity: Number(formData.capacidad) || undefined,
        image: formData.imagen || "/images/logo.jpg",
        tags: []
      };
      const eventosActualizados = eventos.map(evento => 
        evento.id === eventoEditando.id ? eventoActualizado : evento
      );
      setEventos(eventosActualizados);
      saveEventos(eventosActualizados);
    } else {
      const nuevoEvento: Event = {
        id: Date.now().toString(),
        title: formData.titulo,
        description: formData.descripcion,
        date: formData.fecha,
        time: formData.hora,
        location: formData.ubicacion,
        neighborhood: 'Centro', // valor por defecto
        category: 'ENTRETENIMIENTO', // valor por defecto
        organizer: 'Organizador', // valor por defecto
        price: undefined,
        capacity: Number(formData.capacidad) || undefined,
        image: formData.imagen || "/images/logo.jpg",
        isFree: true,
        tags: []
      };
      const eventosActualizados = [...eventos, nuevoEvento];
      setEventos(eventosActualizados);
      saveEventos(eventosActualizados);
    }
    
    cerrarModal();
  };

  const verDetalleEvento = (eventoId: string) => {
    // Navegar a la página de detalles del evento
    console.log('Navegando a evento:', eventoId);
    console.log('URL:', `/gestion/eventos/${eventoId}`);
    
    try {
      router.push(`/gestion/eventos/${eventoId}`);
    } catch (error) {
      console.error('Error con router.push:', error);
      // Fallback usando window.location
      window.location.href = `/gestion/eventos/${eventoId}`;
    }
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
            className="flex items-center gap-2 px-4 py-2 bg-[#005B82] text-white rounded-md hover:bg-[#004A6B] border-2 border-[#005B82] hover:border-[#004A6B] duration-200"
          >
            <Plus className="w-6 h-6" />
            Agregar Evento
          </button>
        </div>

        {/* Grid de Eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento) => (
            <div key={evento.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 h-[560px]">
              {/* Imagen del evento */}
              <div className="relative h-40 flex-1 bg-gradient-to-r from-[#323333] to-[#111111] flex items-center justify-center">
                {evento.image && evento.image !== "/images/logo.jpg" ? (
                  <img src={evento.image} alt={evento.title} className="w-full h-full object-cover" />
                ) : (
                  <ChefHat className="w-16 h-16 text-white" />
                )}
                <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-sm">
                  {evento.category}
                </div>
              </div>

              {/* Contenido de la card */}
              <div className="p-6 flex flex-col justify-between h-4/6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                  {evento.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {evento.description}
                </p>

                {/* Información del evento */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(evento.date).toLocaleDateString('es-ES')}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{evento.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{evento.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ChefHat className="w-4 h-4" />
                    <span>{evento.organizer}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    {evento.capacity && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{evento.capacity} personas</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Etiquetas */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {evento.tags.slice(0, 3).map((etiqueta, index) => (
                    <span key={index} className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                      {etiqueta}
                    </span>
                  ))}
                </div>

                {/* Botones de acción */}
                <div className="flex justify-start w-full items-center gap-2">
                  <button
                    onClick={() => abrirModal(evento)}
                    className="bg-[#3BA740] hover:bg-[#1D8422] active:bg-[#3BA740] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                  
                  <button
                    onClick={() => verDetalleEvento(evento.id)}
                    className="bg-[#005B82] hover:bg-[#0074B7] active:bg-[#0074B7] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
              {/* Header del Modal - Fijo */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl flex-shrink-0 sticky top-0 z-10">
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

              {/* Cuerpo del Modal - Scrolleable */}
              <div className="p-6 overflow-y-auto flex-1">
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

                  </div>

                  {/* Columna Derecha */}
                  <div className="space-y-4">

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
                      📅 {formData.fecha ? new Date(formData.fecha).toLocaleDateString('es-ES') : '2024-12-15'} | 🕐 {formData.hora || '19:00'}
                    </p>
                    <p className="text-sm text-gray-600">
                      📍 {formData.ubicacion || 'Ubicación'}
                    </p>
                  </div>
                    {formData.capacidad && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{formData.capacidad} personas</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                  <button
                    onClick={cerrarModal}
                    className="px-6 py-3 bg-red-700 hover:bg-red-500 active:bg-red-500 text-white rounded-lg hover:bg-red-500 transition-all duration-300 font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={guardarEvento}
                    className="px-6 py-3 bg-[#005B82] text-white rounded-lg hover:bg-[#004A6B] transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
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