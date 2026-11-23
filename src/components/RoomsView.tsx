import React, { useState } from 'react';
import { Room } from '../types';
import { Building2, Search, Filter, Users, MapPin, Clock, Calendar, CheckCircle2, XCircle, Clock4 } from 'lucide-react';
import { motion } from 'motion/react';

interface RoomsViewProps {
  rooms: Room[];
}

export default function RoomsView({ rooms }: RoomsViewProps) {
  const [filter, setFilter] = useState<'Todos' | 'Libre' | 'Ocupado' | 'Reservado'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRooms = rooms.filter(room => {
    const matchesFilter = filter === 'Todos' || room.status === filter;
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          room.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: Room['status']) => {
    switch (status) {
      case 'Libre':
        return (
          <span className="flex items-center gap-1 bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-green-100">
            <CheckCircle2 className="w-3 h-3" />
            Disponible
          </span>
        );
      case 'Ocupado':
        return (
          <span className="flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-red-100">
            <XCircle className="w-3 h-3" />
            Ocupado
          </span>
        );
      case 'Reservado':
        return (
          <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-amber-100">
            <Clock4 className="w-3 h-3" />
            Reservado
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-2">
              <span>Inicio</span>
              <span>•</span>
              <span className="text-slate-600">Aulas y Espacios</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-brand-info" />
              Estado de Aulas Disponibles
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          {['Todos', 'Libre', 'Ocupado', 'Reservado'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === status 
                ? 'bg-[#1e2d4d] text-white shadow-md' 
                : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text"
          placeholder="Buscar aula, laboratorio o tipo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-info/20 focus:border-brand-info transition-all"
        />
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredRooms.map((room, idx) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className={`card-base p-6 space-y-4 hover:border-brand-info transition-all group relative overflow-hidden`}
          >
            {/* Type Indicator */}
            <div className="flex justify-between items-start">
              <div className="bg-slate-50 p-2 rounded-lg text-slate-400 group-hover:text-brand-info group-hover:bg-brand-info/5 transition-colors">
                <Building2 className="w-4 h-4" />
              </div>
              {getStatusBadge(room.status)}
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-black text-[#1e2d4d] leading-none">{room.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{room.type}</p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                <Users className="w-3 h-3 text-slate-400" />
                Capacidad: {room.capacity} personas
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                <MapPin className="w-3 h-3 text-slate-400" />
                {room.location}
              </div>
            </div>

            {room.status !== 'Libre' && room.currentActivity && (
              <div className={`mt-4 p-3 rounded-xl border ${room.status === 'Ocupado' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className={`w-3 h-3 ${room.status === 'Ocupado' ? 'text-red-500' : 'text-amber-500'}`} />
                  <p className={`text-[9px] font-black uppercase tracking-tight ${room.status === 'Ocupado' ? 'text-red-700' : 'text-amber-700'}`}>
                    {room.status === 'Ocupado' ? 'Ocupado hasta' : 'Reservado desde'}
                  </p>
                </div>
                <p className={`text-xs font-bold ${room.status === 'Ocupado' ? 'text-red-900' : 'text-amber-900'} leading-tight`}>
                  {room.currentActivity}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className={`w-3 h-3 ${room.status === 'Ocupado' ? 'text-red-400' : 'text-amber-400'}`} />
                  <p className="text-[10px] font-black text-slate-600">{room.nextFreeTime}</p>
                </div>
              </div>
            )}

            {room.status === 'Libre' && (
              <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
                 <p className="text-[10px] font-black text-green-700 uppercase">Sin actividades activas</p>
              </div>
            )}
            
            {/* Background Decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
               <Building2 className="w-24 h-24" />
            </div>
          </motion.div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="h-64 flex flex-col items-center justify-center text-slate-400 bg-white border border-slate-100 rounded-2xl shadow-sm">
           <Search className="w-12 h-12 opacity-10 mb-4" />
           <p className="text-xs font-bold uppercase tracking-widest text-slate-600">No se encontraron aulas</p>
           <p className="text-[10px] mt-1 font-medium">Prueba con otro filtro o término de búsqueda.</p>
        </div>
      )}
    </div>
  );
}
