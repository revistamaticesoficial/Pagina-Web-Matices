"use client";

import { useState } from 'react';
import { Plus, Trash2, Search, Grid, List, Save } from 'lucide-react';

interface Nota {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
}

export default function NotasPage() {
  const [notas, setNotas] = useState<Nota[]>([
    { 
      id: 1, 
      titulo: 'Reunión de equipo', 
      contenido: 'Discutir objetivos del Q4', 
      fecha: '2025-09-28' 
    },
    { 
      id: 2, 
      titulo: 'Ideas de proyecto', 
      contenido: 'Nueva funcionalidad para usuarios', 
      fecha: '2025-09-27' 
    }
  ]);
  
  const [mostrarForm, setMostrarForm] = useState(false);
  const [notaActual, setNotaActual] = useState({ titulo: '', contenido: '' });
  const [busqueda, setBusqueda] = useState('');
  const [vista, setVista] = useState<'grid' | 'list'>('grid');

  const agregarNota = () => {
    if (!notaActual.titulo.trim()) return;
    
    const nuevaNota: Nota = {
      id: Date.now(),
      titulo: notaActual.titulo,
      contenido: notaActual.contenido,
      fecha: new Date().toISOString().split('T')[0]
    };

    setNotas([nuevaNota, ...notas]);
    setNotaActual({ titulo: '', contenido: '' });
    setMostrarForm(false);
  };

  const eliminarNota = (id: number) => {
    setNotas(notas.filter(n => n.id !== id));
  };

  const notasFiltradas = notas.filter(n => 
    n.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    n.contenido.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel de Notas</h1>
              <p className="text-gray-500">Tienes {notas.length} notas guardadas</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 outline-none"
                />
              </div>
              <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setVista('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    vista === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'
                  }`}
                  aria-label="Vista de cuadrícula"
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setVista('list')}
                  className={`p-2 rounded-lg transition-all ${
                    vista === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'
                  }`}
                  aria-label="Vista de lista"
                >
                  <List size={20} />
                </button>
              </div>
              <button
                onClick={() => setMostrarForm(!mostrarForm)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-all"
              >
                <Plus size={20} />
                Agregar
              </button>
            </div>
          </div>

          {mostrarForm && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8 border border-indigo-200">
              <input
                type="text"
                placeholder="Título de la nota"
                value={notaActual.titulo}
                onChange={(e) => setNotaActual({...notaActual, titulo: e.target.value})}
                className="w-full text-xl font-semibold mb-4 p-3 rounded-xl outline-none border-2 border-transparent focus:border-indigo-500 transition-all"
              />
              <textarea
                placeholder="Contenido de la nota..."
                value={notaActual.contenido}
                onChange={(e) => setNotaActual({...notaActual, contenido: e.target.value})}
                className="w-full h-28 p-3 rounded-xl outline-none resize-none border-2 border-transparent focus:border-indigo-500 transition-all"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={agregarNota}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 flex items-center gap-2 transition-all"
                >
                  <Save size={18} />
                  Guardar
                </button>
                <button
                  onClick={() => {
                    setMostrarForm(false);
                    setNotaActual({titulo: '', contenido: ''});
                  }}
                  className="bg-white text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-100 border border-gray-300 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {notasFiltradas.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                {busqueda ? 'No se encontraron notas' : 'No hay notas aún. ¡Crea tu primera nota!'}
              </p>
            </div>
          ) : (
            <div className={vista === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-4'}>
              {notasFiltradas.map((nota) => (
                <div
                  key={nota.id}
                  className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border-l-4 border-indigo-500 ${
                    vista === 'list' ? 'p-5 flex justify-between items-center' : 'p-6'
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{nota.titulo}</h3>
                    <p className="text-gray-600 mb-3">{nota.contenido}</p>
                    <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                      {nota.fecha}
                    </span>
                  </div>
                  <button
                    onClick={() => eliminarNota(nota.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg ml-4 transition-all"
                    aria-label="Eliminar nota"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}