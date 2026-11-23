import React, { useState } from 'react';
import { TeacherEvaluation } from '../types';
import { Star, CheckCircle2, User, BookOpen, Send, AlertCircle, TrendingUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TeacherEvaluationViewProps {
  evaluations: TeacherEvaluation[];
}

export default function TeacherEvaluationView({ evaluations: initialEvals }: TeacherEvaluationViewProps) {
  const [evalList, setEvalList] = useState(initialEvals);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialEvals.find(e => !e.isEvaluated)?.teacherId || null
  );
  const [ratings, setRatings] = useState({ domain: 0, clarity: 0, resources: 0, engagement: 0 });
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedEval = evalList.find(e => e.teacherId === selectedId);
  const pendingCount = evalList.filter(e => !e.isEvaluated).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setEvalList(prev => prev.map(ev => 
        ev.teacherId === selectedId 
          ? { ...ev, isEvaluated: true, ratings, comment } 
          : ev
      ));
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Select next pending
      const nextPending = evalList.find(ev => ev.teacherId !== selectedId && !ev.isEvaluated);
      if (nextPending) {
        setSelectedId(nextPending.teacherId);
        setRatings({ domain: 0, clarity: 0, resources: 0, engagement: 0 });
        setComment('');
      } else {
        setSelectedId(null);
      }
    }, 1000);
  };

  const RatingStars = ({ value, onChange, label }: { value: number, onChange: (v: number) => void, label: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        <span className="text-[10px] font-bold text-brand-info">{value}/5</span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`p-1.5 rounded-lg transition-all ${
              star <= value ? 'text-brand-accent bg-orange-50 scale-110' : 'text-slate-200 hover:text-slate-300'
            }`}
          >
            <Star className={`w-5 h-5 ${star <= value ? 'fill-current' : ''}`} />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-2">
            <span>Inicio</span>
            <span>•</span>
            <span className="text-slate-600">Evaluación Docente</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-brand-info" />
              Evaluación de Desempeño Docente
          </h1>
          <div className="bg-blue-50 px-4 py-2 rounded-xl flex items-center gap-3 border border-blue-100">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
             <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">
               {pendingCount} Docentes pendientes
             </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Teacher List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="card-base p-4 space-y-4">
            <h3 className="text-xs font-black text-[#1e2d4d] uppercase tracking-widest border-b border-slate-50 pb-3">
              Tus Docentes
            </h3>
            <div className="space-y-2">
              {evalList.map((ev) => (
                <button
                  key={ev.teacherId}
                  onClick={() => {
                    setSelectedId(ev.teacherId);
                    if (!ev.isEvaluated) {
                      setRatings({ domain: 0, clarity: 0, resources: 0, engagement: 0 });
                      setComment('');
                    }
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                    selectedId === ev.teacherId 
                    ? 'bg-[#1e2d4d] text-white shadow-md scale-[1.02]' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="min-w-0">
                    <p className={`text-[10px] font-black uppercase tracking-tight truncate ${selectedId === ev.teacherId ? 'text-blue-300' : 'text-slate-400'}`}>
                      {ev.courseName}
                    </p>
                    <p className="text-xs font-bold truncate">{ev.teacherName}</p>
                  </div>
                  {ev.isEvaluated ? (
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${selectedId === ev.teacherId ? 'text-green-400' : 'text-green-500'}`} />
                  ) : (
                    <div className={`w-2 h-2 rounded-full shrink-0 ${selectedId === ev.teacherId ? 'bg-blue-400' : 'bg-slate-300'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex gap-3">
             <Info className="w-5 h-5 text-amber-500 shrink-0" />
             <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
               Tu evaluación es totalmente anónima. Tus respuestas ayudan a mejorar la calidad académica de nuestra institución.
             </p>
          </div>
        </div>

        {/* Right Content: Evaluation Form */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedId && selectedEval && !selectedEval.isEvaluated ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card-base p-8 space-y-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
                     <User className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-lg font-black text-[#1e2d4d] leading-none">{selectedEval.teacherName}</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                       <BookOpen className="w-3.5 h-3.5" />
                       {selectedEval.courseName}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <RatingStars 
                      label="Dominio del Tema" 
                      value={ratings.domain} 
                      onChange={(v) => setRatings(prev => ({ ...prev, domain: v }))} 
                    />
                    <RatingStars 
                      label="Claridad en Explicación" 
                      value={ratings.clarity} 
                      onChange={(v) => setRatings(prev => ({ ...prev, clarity: v }))} 
                    />
                    <RatingStars 
                      label="Uso de Tecnologías" 
                      value={ratings.resources} 
                      onChange={(v) => setRatings(prev => ({ ...prev, resources: v }))} 
                    />
                    <RatingStars 
                      label="Puntualidad y Trato" 
                      value={ratings.engagement} 
                      onChange={(v) => setRatings(prev => ({ ...prev, engagement: v }))} 
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">¿Algo que destacar? (Opcional)</p>
                    <textarea 
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Escribe un breve comentario sobre tu experiencia..."
                      className="w-full h-24 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-info/10 focus:border-brand-info transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || Object.values(ratings).some(v => v === 0)}
                    className="w-full bg-[#1e2d4d] text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg hover:shadow-[#1e2d4d]/20 transition-all disabled:opacity-50 disabled:grayscale"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar Evaluación
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : selectedId && selectedEval && selectedEval.isEvaluated ? (
              <motion.div
                key="evaluated"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-base p-12 flex flex-col items-center text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                   <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-800">¡Docente Evaluado!</h3>
                  <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto">
                    Ya has calificado a <strong>{selectedEval.teacherName}</strong>. Gracias por tu feedback.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    const next = evalList.find(e => !e.isEvaluated);
                    if (next) setSelectedId(next.teacherId);
                  }}
                  className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors"
                >
                  Continuar con otros docentes
                </button>
              </motion.div>
            ) : (
              <div className="card-base p-12 flex flex-col items-center text-center space-y-4 opacity-60">
                 <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                    <TrendingUp className="w-8 h-8" />
                 </div>
                 <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Evaluación Completada</h3>
                 <p className="text-xs text-slate-400 font-medium italic">Has finalizado todas las evaluaciones pendientes del semestre.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50"
          >
            <CheckCircle2 className="w-5 h-5 text-green-200" />
            <p className="text-xs font-bold tracking-tight">Evaluación enviada con éxito</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
