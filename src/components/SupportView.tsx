import React, { useState } from 'react';
import { SupportTicket } from '../types';
import { LifeBuoy, Send, Clock, CheckCircle2, AlertTriangle, Plus, Search, HelpCircle, Phone, Mail, Globe, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SupportViewProps {
  tickets: SupportTicket[];
}

export default function SupportView({ tickets: initialTickets }: SupportViewProps) {
  const [ticketList, setTicketList] = useState(initialTickets);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [category, setCategory] = useState<SupportTicket['category']>('Técnico');
  const [priority, setPriority] = useState<SupportTicket['priority']>('Media');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newTicket: SupportTicket = {
        id: `TICK-00${ticketList.length + 1}`,
        category,
        priority,
        subject,
        description,
        status: 'Abierto',
        createdAt: new Date().toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      };

      setTicketList([newTicket, ...ticketList]);
      setIsSubmitting(false);
      setShowForm(false);
      setShowSuccess(true);
      setSubject('');
      setDescription('');
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const getPriorityColor = (p: SupportTicket['priority']) => {
    switch (p) {
      case 'Baja': return 'bg-slate-100 text-slate-600';
      case 'Media': return 'bg-blue-50 text-blue-600';
      case 'Alta': return 'bg-red-50 text-red-600';
      default: return 'bg-slate-50';
    }
  };

  const getStatusIcon = (status: SupportTicket['status']) => {
    switch (status) {
      case 'Abierto': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'En Progreso': return <div className="w-4 h-4 border-2 border-brand-info border-t-transparent rounded-full animate-spin" />;
      case 'Resuelto': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    }
  };

  const filteredTickets = ticketList.filter(t => 
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const faqs = [
    { q: "¿Cómo recupero mi clave del correo?", a: "Debes dirigirte a la oficina de sistemas o radicar un ticket en la categoría 'Acceso/Password'." },
    { q: "¿Dónde veo mis calificaciones finales?", a: "En la sección de 'Historial Académico' puedes ver el consolidado de todos tus periodos." },
    { q: "¿Cómo solicito un supletorio?", a: "La solicitud de supletorios se realiza a través de la oficina de Registro y Control." }
  ];

  return (
    <div className="space-y-8 pb-12">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-2">
              <span>Inicio</span>
              <span>•</span>
              <span className="text-slate-600">Centro de Soporte</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <LifeBuoy className="w-5 h-5 text-brand-info" />
              Soporte y Mesa de Ayuda
          </h1>
        </div>

        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#1e2d4d] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:shadow-[#1e2d4d]/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Crear Ticket de Soporte
        </button>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Help Contacts */}
        <div className="lg:col-span-1 space-y-6">
           <div className="card-base p-6 space-y-6">
              <h3 className="text-xs font-black text-[#1e2d4d] uppercase tracking-widest border-b border-slate-50 pb-3">Canales de Atención</h3>
              <div className="space-y-4">
                 {[
                   { icon: Phone, label: 'Línea de Atención', value: '(602) 822 0517' },
                   { icon: Mail, label: 'Correo Soporte', value: 'sistemas@unicomfacauca.edu.co' },
                   { icon: Globe, label: 'Sitio Web Ayuda', value: 'ayuda.unicomfacauca.edu.co' }
                 ].map((channel, i) => (
                   <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand-info transition-colors group">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-slate-400 group-hover:text-brand-info transition-colors">
                        <channel.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-1">{channel.label}</p>
                        <p className="text-xs font-black text-slate-700">{channel.value}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="card-base p-6 space-y-4">
              <h3 className="text-xs font-black text-[#1e2d4d] uppercase tracking-widest border-b border-slate-50 pb-3">Preguntas Frecuentes</h3>
              <div className="space-y-3">
                 {faqs.map((faq, i) => (
                   <div key={i} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all cursor-pointer group">
                      <p className="text-[10px] font-black text-slate-700 leading-tight flex items-center justify-between">
                        {faq.q}
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </p>
                      <p className="text-[9px] text-slate-500 mt-1 font-medium line-clamp-1 group-hover:line-clamp-none transition-all">{faq.a}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Tickets Section */}
        <div className="lg:col-span-2 space-y-6">
           <div className="card-base p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Buscar ticket por número o asunto..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-info/10"
                 />
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase">Estado:</span>
                 <select className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-[10px] font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-info/10">
                    <option>Todos</option>
                    <option>Abierto</option>
                    <option>En Progreso</option>
                    <option>Resuelto</option>
                 </select>
              </div>
           </div>

           <div className="space-y-4">
              {filteredTickets.map((ticket, idx) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="card-base p-6 group hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                     <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-4 min-w-[100px] border border-slate-100 group-hover:border-brand-info/20 transition-colors shrink-0">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Categoría</span>
                        <span className="text-[10px] font-black text-slate-700">{ticket.category}</span>
                        <div className="mt-3 w-full border-t border-slate-200 pt-3 flex flex-col items-center gap-1">
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Prioridad</span>
                           <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-tight ${getPriorityColor(ticket.priority)}`}>
                             {ticket.priority}
                           </span>
                        </div>
                     </div>
                     
                     <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              {getStatusIcon(ticket.status)}
                              <span className={`text-[10px] font-black uppercase tracking-widest ${ticket.status === 'Resuelto' ? 'text-green-600' : 'text-amber-600'}`}>
                                {ticket.status}
                              </span>
                           </div>
                           <span className="text-[10px] font-bold text-slate-300 tracking-tight">{ticket.id} • {ticket.createdAt}</span>
                        </div>
                        <h3 className="text-sm font-bold text-[#1e2d4d] uppercase tracking-tight">{ticket.subject}</h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic line-clamp-2">"{ticket.description}"</p>
                        
                        {ticket.status === 'Resuelto' && (
                          <div className="flex items-center gap-2 pt-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                             <span className="text-[10px] font-bold text-green-600">Este caso ha sido cerrado satisfactoriamente.</span>
                          </div>
                        )}
                     </div>
                  </div>
                </motion.div>
              ))}

              {filteredTickets.length === 0 && (
                <div className="card-base p-16 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <Search className="w-12 h-12 text-slate-300" />
                  <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Sin resultados</h3>
                    <p className="text-[10px] font-medium text-slate-500 max-w-xs mx-auto">No encontramos tickets que coincidan con tus criterios de búsqueda.</p>
                  </div>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Ticket Creation Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl"
            >
              <div className="bg-[#1e2d4d] p-8 text-white relative">
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-brand-accent/20 flex items-center justify-center border border-brand-accent/30">
                    <LifeBuoy className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h2 className="text-base font-black uppercase tracking-widest text-white">Nuevo Ticket de Soporte</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Reportar falla técnica o solicitud de ayuda</p>
                  </div>
                </div>
                <button onClick={() => setShowForm(false)} className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full" />
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoría del Problema</label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-brand-info/10 transition-all"
                      >
                         <option>Técnico</option>
                         <option>Académico</option>
                         <option>Acceso/Password</option>
                         <option>Otro</option>
                      </select>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Prioridad Estimada</label>
                      <select 
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as any)}
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-brand-info/10 transition-all"
                      >
                         <option>Baja</option>
                         <option>Media</option>
                         <option>Alta</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-1.5">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Asunto de la Solicitud</label>
                   <input 
                     type="text"
                     required
                     value={subject}
                     onChange={(e) => setSubject(e.target.value)}
                     placeholder="Ej: Problemas con mi contraseña, No carga el horario..."
                     className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-brand-info/10 transition-all"
                   />
                </div>

                <div className="space-y-1.5">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Descripción del Incidente</label>
                   <textarea 
                     required
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     rows={4}
                     placeholder="Describe de manera detallada el problema y los pasos para reproducirlo..."
                     className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-4 focus:ring-brand-info/10 transition-all resize-none"
                   />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors"
                  >
                    Cerrar
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-4 bg-[#1e2d4d] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:shadow-[#1e2d4d]/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar Reporte
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 z-50 border border-white/10"
          >
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
               <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest">Ticket creado exitosamente</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
