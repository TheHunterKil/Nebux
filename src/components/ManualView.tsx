import React, { useState } from 'react';
import { Book, ChevronRight, Layout, GraduationCap, Calendar, Building2, Library, Star, MessageSquare, LifeBuoy, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MANUAL_SECTIONS = [
  {
    id: 'intro',
    title: 'Primeros Pasos',
    description: 'Guía de inicio rápido y navegación general del portal.',
    icon: Book,
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed">
          Bienvenido al nuevo **Portal Estudiantil de Unicomfacauca**. Esta aplicación está diseñada para centralizar todos tus procesos académicos y administrativos en un solo lugar.
        </p>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
           <h4 className="text-[10px] font-black text-blue-700 uppercase mb-2">Diseño Responsivo</h4>
           <p className="text-[10px] text-blue-600 font-medium">Puedes acceder desde tu PC, Tablet o Smartphone sin perder ninguna funcionalidad.</p>
        </div>
      </div>
    )
  },
  {
    id: 'dashboard',
    title: 'Panel Principal',
    description: 'Aprende a interpretar tu progreso académico y alertas.',
    icon: Layout,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed">
          Es tu centro de control diario. Aquí podrás ver:
        </p>
        <ul className="list-disc list-inside text-sm text-slate-600 space-y-2 ml-2">
          <li>Resumen de tu promedio acumulado en tiempo real.</li>
          <li>Materias del semestre con alertas de riesgo (Rojo, Azul, Verde, Dorado).</li>
          <li>Próximas clases de tu jornada nocturna.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'grades',
    title: 'Gestión de Notas',
    description: 'Consulta de parciales y promedios por asignatura.',
    icon: GraduationCap,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed">
          Consulta el detalle de tus notas por parciales. El sistema calcula automáticamente tu promedio ponderado por materia.
        </p>
        <p className="text-sm text-slate-600">En <strong>Historial Académico</strong> podrás navegar por periodos anteriores para comparar tu evolución.</p>
      </div>
    )
  },
  {
    id: 'schedule',
    title: 'Horario Escolar',
    description: 'Visualización de clases, salones y recordatorios.',
    icon: Calendar,
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed">
          Accede a tu programación semanal. Cada bloque incluye:
        </p>
        <ul className="list-disc list-inside text-sm text-slate-600 space-y-2 ml-2">
          <li>Hora exacta y salón asignado.</li>
          <li>Notas del docente sobre parciales o entregas.</li>
          <li>Visualización clara de la jornada nocturna.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'eval',
    title: 'Evaluación Docente',
    description: 'Instrucciones para calificar el desempeño docente.',
    icon: Star,
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed">
          Califica a tus profesores mediante 4 criterios clave. El proceso es anónimo y vital para la acreditación institucional.
        </p>
        <div className="p-4 bg-purple-900 rounded-xl text-white">
           <p className="text-[10px] font-bold uppercase tracking-widest text-purple-200">Recordatorio</p>
           <p className="text-xs mt-1">Debes evaluar a todos tus docentes para evitar restricciones en la consulta de notas finales.</p>
        </div>
      </div>
    )
  },
  {
    id: 'pqrs_support',
    title: 'PQRS y Soporte',
    description: 'Cómo radicar solicitudes y pedir ayuda técnica.',
    icon: MessageSquare,
    color: 'bg-pink-50 text-pink-600 border-pink-100',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Usa **PQRS** para peticiones académicas o administrativas. Usa **Soporte** para fallas en la plataforma o accesos.
        </p>
        <p className="text-sm rounded-xl p-4 bg-slate-50 border border-slate-100 font-medium text-slate-600">
          Ambos módulos generan un radicado para que hagas seguimiento a la respuesta.
        </p>
      </div>
    )
  }
];

export default function ManualView() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedSection = MANUAL_SECTIONS.find(s => s.id === selectedId);

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-2">
            <span>Configuración</span>
            <span>•</span>
            <span className="text-slate-600">Manual de Usuario</span>
        </div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <Book className="w-5 h-5 text-brand-info" />
            Guías y Tutoriales del Portal
        </h1>
        <p className="text-xs text-slate-500 mt-2 font-medium">Selecciona un módulo para ver las instrucciones detalladas de uso.</p>
      </section>

      {/* Grid Layout of Manual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MANUAL_SECTIONS.map((section, idx) => (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => setSelectedId(section.id)}
            disabled={selectedId !== null}
            className={`group card-base p-0 overflow-hidden text-left transition-all hover:shadow-xl active:scale-[0.98] ${
              selectedId !== null ? 'opacity-50 cursor-not-allowed' : 'hover:border-brand-info'
            }`}
          >
            <div className="p-8 space-y-4 h-full flex flex-col">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-110 transition-transform ${section.color}`}>
                  <section.icon className="w-6 h-6" />
               </div>
               <div className="flex-1">
                  <h3 className="text-sm font-black text-[#1e2d4d] uppercase tracking-widest">{section.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-2 font-medium leading-relaxed">
                    {section.description}
                  </p>
               </div>
               <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-brand-info opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Abrir Manual</span>
                  <ArrowRight className="w-3.5 h-3.5" />
               </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Modal / Overlay for Section Content */}
      <AnimatePresence>
        {selectedId && selectedSection && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="bg-[#1e2d4d] p-10 text-white relative">
                <div className="flex items-center gap-6 relative z-10">
                  <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center shadow-lg border-2 border-white/10 ${selectedSection.color.split(' ')[0]} ${selectedSection.color.split(' ')[1]}`}>
                    <selectedSection.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-[0.1em] text-white leading-none">{selectedSection.title}</h2>
                    <p className="text-[10px] text-brand-accent font-black uppercase tracking-widest mt-2">Guía Oficial Unicomfacauca</p>
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full" />
              </div>

              {/* Modal Content */}
              <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="prose prose-slate max-w-none">
                   {selectedSection.content}
                </div>

                <div className="pt-8 border-t border-slate-100 flex justify-center">
                   <button 
                     onClick={() => setSelectedId(null)}
                     className="w-full md:w-auto px-12 py-3 bg-[#1e2d4d] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-[#1e2d4d]/20 transition-all active:scale-95"
                   >
                     Entendido
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
