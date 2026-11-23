import React from 'react';
import { ClassSchedule } from '../types';
import { Calendar, Clock, MapPin, PencilLine, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ScheduleViewProps {
  schedule: ClassSchedule[];
}

export default function ScheduleView({ schedule }: ScheduleViewProps) {
  const days: ClassSchedule['day'][] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-2">
            <span>Inicio</span>
            <span>•</span>
            <span className="text-slate-600">Horario de Clases</span>
        </div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-brand-info" />
            Horario Nocturno - Semestre Actual
        </h1>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {days.map((day, idx) => {
          const dayClasses = schedule.filter(s => s.day === day);
          
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-4"
            >
              <div className="bg-[#1e2d4d] text-white py-2 px-4 rounded-xl text-xs font-black uppercase tracking-widest text-center">
                {day}
              </div>
              
              <div className="space-y-4">
                {dayClasses.length > 0 ? (
                  dayClasses.map((item) => (
                    <div key={item.id} className="card-base p-4 space-y-3 group hover:border-brand-info transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-black text-[#1e2d4d] group-hover:text-brand-info transition-colors leading-tight">
                          {item.courseName}
                        </h4>
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                          <MapPin className="w-3 h-3" />
                          {item.classroom}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 italic">
                          <PencilLine className="w-3 h-3" />
                          {item.teacher}
                        </div>
                      </div>

                      {item.note && (
                        <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-100 flex gap-2">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-[9px] text-amber-700 font-black leading-tight">
                            {item.note}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="h-24 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center text-[10px] font-bold text-slate-300">
                    Sin clases
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
