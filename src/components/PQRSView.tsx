import React, { useState } from 'react';
import { PQRS } from '../types';
import { MessageSquare, Send, Clock, CheckCircle2, AlertCircle, Plus, Search, Filter, History, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PQRSViewProps {
  pqrsList: PQRS[];
}

export default function PQRSView({ pqrsList: initialList }: PQRSViewProps) {
  const [list, setList] = useState(initialList);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [type, setType] = useState<PQRS['type']>('Petición');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newPQRS: PQRS = {
        id: `PQRS-00${list.length + 1}`,
        type,
        subject,
        description,
        status: 'Radicado',
        date: new Date().toLocaleDateString('es-ES'),
      };

      setList([newPQRS, ...list]);
      setIsSubmitting(false);
      setShowForm(false);
      setShowSuccess(true);
      setSubject('');
      setDescription('');
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const getStatusColor = (status: PQRS['status']) => {
    switch (status) {
      case 'Radicado': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'En Trámite': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Resuelto': return 'bg-green-50 text-green-600 border-green-100';
      case 'Cerrado': return 'bg-slate-50 text-slate-600 border-slate-100';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  const filteredList = list.filter(item => 
    item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-2">
              <span>Inicio</span>
              <span>•</span>
              <span className="text-slate-600">PQRS</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-brand-info" />
              Peticiones, Quejas, Reclamos y Sugerencias
          </h1>
        </div>

        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#1e2d4d] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:shadow-[#1e2d4d]/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Nueva Solicitud
        </button>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of PQRS */}
        <div className="lg:col-span-8 space-y-4">
          <div className="card-base p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
             <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar por radicado o asunto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-info/10"
                />
             </div>
             <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">
                <Filter className="w-3.5 h-3.5" />
                Filtrar
             </button>
          </div>

          <div className="space-y-4">
            {filteredList.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-base p-6 hover:border-brand-info transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                       <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${getStatusColor(item.status)}`}>
                         {item.status}
                       </span>
                       <span className="text-[10px] font-bold text-slate-400">{item.id} • {item.date}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">{item.subject}</h3>
                      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{item.description}</p>
                    </div>
                    {item.response && (
                      <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-brand-info mt-4">
                        <div className="flex items-center gap-2 text-brand-info mb-1">
                           <CheckCircle2 className="w-3.5 h-3.5" />
                           <span className="text-[10px] font-black uppercase">Respuesta Institucional</span>
                        </div>
                        <p className="text-[10px] text-slate-600 font-medium italic">"{item.response}"</p>
                      </div>
                    )}
                  </div>
                  <div className="flex md:flex-col items-center justify-center gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-50 pt-4 md:pt-0 md:pl-6 min-w-[100px]">
                     <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{item.type}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredList.length === 0 && (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 bg-white border border-slate-100 rounded-2xl shadow-sm">
                 <History className="w-12 h-12 opacity-10 mb-4" />
                 <p className="text-xs font-bold uppercase tracking-widest text-slate-600">No hay registros</p>
                 <p className="text-[10px] mt-1 font-medium">No se encontraron solicitudes que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Info and Status */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#1e2d4d] text-white rounded-3xl p-8 relative overflow-hidden shadow-xl">
             <div className="relative z-10 space-y-4">
                <HelpCircle className="w-10 h-10 text-brand-accent opacity-80" />
                <h3 className="text-lg font-black leading-tight">¿Tienes alguna duda o sugerencia?</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  En Unicomfacauca escuchamos tu voz. Todas tus solicitudes se gestionan de manera oportuna para garantizar tu bienestar estudiantil.
                </p>
             </div>
             <MessageSquare className="absolute -right-8 -bottom-8 w-40 h-40 text-white/5" />
          </div>

          <div className="card-base p-6 space-y-4">
            <h3 className="text-xs font-black text-[#1e2d4d] uppercase tracking-widest border-b border-slate-50 pb-3">
              Información de Interés
            </h3>
            <div className="space-y-4">
               {[
                 { title: 'Tiempos de Respuesta', desc: 'Las peticiones se resuelven en 15 días hábiles.' },
                 { title: 'Seguimiento', desc: 'Recibirás actualizaciones en tu correo institucional.' },
                 { title: 'Confidencialidad', desc: 'Tus quejas se manejan con estricta reserva.' }
               ].map((info, i) => (
                 <div key={i} className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">{info.title}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{info.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[95vh] flex flex-col"
            >
              <div className="bg-[#1e2d4d] p-6 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-widest">Radicar Nueva Solicitud</h2>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Portal PQRS Estudiantil</p>
                  </div>
                </div>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipo de Solicitud</label>
                      <select 
                        value={type}
                        onChange={(e) => setType(e.target.value as any)}
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-info/10"
                      >
                         <option>Petición</option>
                         <option>Queja</option>
                         <option>Reclamo</option>
                         <option>Sugerencia</option>
                      </select>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Asunto</label>
                      <input 
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Ej: Certificado, Wi-Fi..."
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-info/10"
                      />
                   </div>
                </div>

                <div className="space-y-1.5">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Descripción Detallada</label>
                   <textarea 
                     required
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     rows={5}
                     placeholder="Describe de manera clara y precisa tu solicitud..."
                     className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-info/10 resize-none"
                   />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors"
                  >
                    Anular
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-[#1e2d4d] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-[#1e2d4d]/20 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Radicar Solicitud
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50"
          >
            <CheckCircle2 className="w-5 h-5 text-green-200" />
            <p className="text-xs font-bold tracking-tight">¡PQRS radicado exitosamente!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const X = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
