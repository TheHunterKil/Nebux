import React, { useState } from 'react';
import { Semester } from '../types';
import { History, ChevronRight, ArrowLeft, BookOpen, AlertTriangle, TrendingUp, Book, GraduationCap, BarChart3, Calendar, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AcademicHistoryProps {
  semesters: Semester[];
}

export default function AcademicHistory({ semesters }: AcademicHistoryProps) {
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null);

  const getStatusConfig = (score: number) => {
    if (score < 3.0) {
      return {
        label: 'En riesgo',
        colorClass: 'text-brand-warning',
        bgClass: 'bg-brand-warning'
      };
    } else if (score < 4.0) {
      return {
        label: 'Medio',
        colorClass: 'text-brand-info',
        bgClass: 'bg-brand-info'
      };
    } else if (score < 4.6) {
      return {
        label: 'Alto',
        colorClass: 'text-brand-success',
        bgClass: 'bg-brand-success'
      };
    } else {
      return {
        label: 'Superior',
        colorClass: 'text-brand-gold',
        bgClass: 'bg-brand-gold'
      };
    }
  };

  const getAlertConfig = (gpa: number) => {
    if (gpa < 3.0) {
      return {
        title: 'Riesgo Académico',
        bg: 'bg-red-50',
        border: 'border-red-500',
        iconBg: 'bg-red-500',
        textTitle: 'text-red-700',
        textDesc: 'text-red-600',
        icon: AlertTriangle
      };
    } else if (gpa < 4.0) {
      return {
        title: 'Rendimiento Medio',
        bg: 'bg-blue-50',
        border: 'border-blue-500',
        iconBg: 'bg-blue-500',
        textTitle: 'text-blue-700',
        textDesc: 'text-blue-600',
        icon: TrendingUp
      };
    } else if (gpa < 4.6) {
      return {
        title: 'Rendimiento Alto',
        bg: 'bg-green-50',
        border: 'border-green-500',
        iconBg: 'bg-green-500',
        textTitle: 'text-green-700',
        textDesc: 'text-green-600',
        icon: GraduationCap
      };
    } else {
      return {
        title: 'Rendimiento Superior',
        bg: 'bg-amber-50',
        border: 'border-brand-gold',
        iconBg: 'bg-brand-gold',
        textTitle: 'text-amber-900',
        textDesc: 'text-amber-800',
        icon: GraduationCap
      };
    }
  };

  if (selectedSemester) {
    const alert = getAlertConfig(selectedSemester.gpa);
    return (
      <div className="space-y-6">
        <section>
          <button 
            onClick={() => setSelectedSemester(null)}
            className="flex items-center gap-2 text-brand-info text-xs font-bold mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al listado
          </button>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-2">
              <span>Inicio</span>
              <span>•</span>
              <span>Historial</span>
              <span>•</span>
              <span className="text-slate-600">Período {selectedSemester.period}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-brand-info" />
              Detalle del Período {selectedSemester.period}
          </h1>
        </section>

        {/* Dynamic Alert */}
        <div className={`${alert.bg} border-l-4 ${alert.border} p-4 rounded-r-lg flex items-center gap-4`}>
          <div className={`${alert.iconBg} p-2 rounded-full`}>
            <alert.icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className={`text-sm font-bold ${alert.textTitle}`}>{alert.title}</h3>
            <p className={`text-xs ${alert.textDesc} font-medium`}>
              Promedio del período: {selectedSemester.gpa.toFixed(2)} • {selectedSemester.courses.length} materias registradas
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: 'Promedio Periodo', value: selectedSemester.gpa.toFixed(2), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Créditos Periodo', value: selectedSemester.courses.reduce((acc, c) => acc + c.credits, 0), icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Materias', value: selectedSemester.courses.length, icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Estado', value: selectedSemester.year, icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((stat, i) => (
            <div key={i} className={`p-3 md:p-4 rounded-2xl border border-slate-100 ${stat.bg} flex items-center gap-3 md:gap-4 shadow-sm`}>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white flex items-center justify-center ${stat.color} shadow-sm shrink-0`}>
                <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 mb-0.5 leading-tight">{stat.label}</p>
                <p className={`text-sm md:text-xl font-black ${stat.color} leading-none truncate`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Course Records - Desktop Table / Mobile Cards */}
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="card-base overflow-x-auto custom-scrollbar hidden md:block">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-[#1e2d4d] text-white text-[10px] uppercase tracking-widest">
                  <th className="px-6 py-4 font-bold">Código</th>
                  <th className="px-6 py-4 font-bold">Materia</th>
                  <th className="px-6 py-4 font-bold">Créditos</th>
                  <th className="px-6 py-4 font-bold">Docente</th>
                  <th className="px-6 py-4 font-bold">Nota</th>
                  <th className="px-6 py-4 font-bold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {selectedSemester.courses.map((course) => {
                  const status = getStatusConfig(course.average || 0);
                  return (
                    <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-500 font-mono italic">{course.courseCode}</td>
                      <td className="px-6 py-4 text-slate-800 font-bold">{course.courseName}</td>
                      <td className="px-6 py-4 text-slate-600">{course.credits}</td>
                      <td className="px-6 py-4 text-slate-500">{course.teacher}</td>
                      <td className="px-6 py-4 min-w-[120px]">
                        <div className="flex items-center gap-3">
                          <div className="progress-bar-container w-16">
                            <div className={`h-full rounded-full ${status.bgClass}`} style={{ width: `${(course.average || 0) * 20}%` }} />
                          </div>
                          <span className={`font-black ${status.colorClass}`}>
                            {course.average?.toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase ${status.colorClass}`}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-50/80">
                <tr className="text-xs font-black text-slate-700">
                    <td colSpan={2} className="px-6 py-4 uppercase tracking-widest">Promedio Período</td>
                    <td className="px-6 py-4">{selectedSemester.courses.reduce((acc, c) => acc + c.credits, 0)}</td>
                    <td colSpan={2} className="px-6 py-4 text-right pr-6 tracking-widest text-[#1e2d4d] text-sm">{selectedSemester.gpa.toFixed(2)}</td>
                    <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Mobile Card View */}
          <div id="history-detail-mobile-list" className="grid grid-cols-1 gap-3 md:hidden">
            {selectedSemester.courses.map((course) => {
              const status = getStatusConfig(course.average || 0);
              return (
                <motion.div 
                  key={course.id}
                  id={`history-course-card-${course.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{course.courseCode}</p>
                    <p className="text-sm font-bold text-[#1e2d4d] truncate">{course.courseName}</p>
                    <p className="text-[10px] text-slate-500 mt-1 truncate">{course.teacher}</p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-black ${status.colorClass}`}>
                        {course.average?.toFixed(1)}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full mb-0.5 ${status.bgClass}`} />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${status.colorClass}`}>
                      {status.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
            
            <div className="bg-[#1e2d4d] p-4 rounded-2xl text-white flex justify-between items-center mt-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Promedio Período</span>
              <span className="text-xl font-black italic">{selectedSemester.gpa.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-2">
            <span>Inicio</span>
            <span>•</span>
            <span className="text-slate-600">Historial Académico</span>
        </div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <History className="w-5 h-5 text-brand-info" />
            Historial por Períodos
        </h1>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {semesters.map((sem, idx) => {
          const status = getStatusConfig(sem.gpa);
          return (
            <motion.div
              key={sem.id}
              onClick={() => setSelectedSemester(sem)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4 hover:border-brand-info transition-all cursor-pointer group"
            >
              <div className="space-y-1">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest leading-none">Periodo</p>
                  <h3 className="text-lg font-black text-[#1e2d4d] leading-none">{sem.period}</h3>
              </div>
              
              <div className="space-y-1">
                  <p className={`text-3xl font-black ${status.colorClass}`}>
                      {sem.gpa.toFixed(1)}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {sem.courses.length} materias • {sem.courses.reduce((acc, c) => acc + c.credits, 0)} créditos
                  </p>
              </div>

              <div className="pt-2">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${status.bgClass} bg-opacity-10 ${status.colorClass}`}>
                      {sem.period === '2024-2' ? 'Actual' : status.label}
                  </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const Award = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
    <circle cx="12" cy="8" r="6" />
  </svg>
);
