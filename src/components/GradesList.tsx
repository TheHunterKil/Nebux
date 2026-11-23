import React from 'react';
import { Semester, User } from '../types';
import { AlertTriangle, TrendingUp, Book, BarChart3, GraduationCap, BookOpen, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface GradesListProps {
  semester: Semester;
  user: User;
}

export default function GradesList({ semester, user }: GradesListProps) {
  const gpa = user.overallGpa;
  const riskCoursesCount = semester.courses.filter(c => (c.average || 0) < 3.0).length;

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

  const getAlertConfig = () => {
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
        icon: Book
      };
    } else {
      return {
        title: 'Rendimiento Superior',
        bg: 'bg-amber-50',
        border: 'border-brand-gold',
        iconBg: 'bg-brand-gold',
        textTitle: 'text-amber-900',
        textDesc: 'text-amber-800',
        icon: Book
      };
    }
  };

  const alert = getAlertConfig();

  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-2">
            <span>Inicio</span>
            <span>•</span>
            <span>Calificaciones</span>
            <span>•</span>
            <span className="text-slate-600">Semestre Actual</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-sidebar rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-brand-accent" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-[#1e2d4d] italic tracking-tight">{semester.period}</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{semester.year}</p>
          </div>
        </div>
        <div className="bg-white px-4 md:px-6 py-2.5 md:py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-info" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Semestre Actual</span>
          </div>
          <div className="w-px h-6 bg-slate-100" />
          <div className="text-sm font-black text-brand-info">Activo</div>
        </div>
      </div>
      </section>

      {/* Dynamic Academic Alert */}
      <div className={`${alert.bg} border-l-4 ${alert.border} p-4 rounded-r-lg flex items-center gap-4`}>
        <div className={`${alert.iconBg} p-2 rounded-full`}>
          <alert.icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className={`text-sm font-bold ${alert.textTitle}`}>{alert.title}</h3>
          <p className={`text-xs ${alert.textDesc} font-medium`}>
            Promedio actual: {gpa.toFixed(2)} • {riskCoursesCount} materia(s) en riesgo
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
<<<<<<< HEAD
          { label: 'PROMEDIO ACTUAL DEL SEMESTRE', value: semester.gpa.toFixed(2), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'PROMEDIO DEL PROGRAMA', value: semester.gpa.toFixed(2), icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
=======
          { label: 'PAPA', value: semester.gpa.toFixed(2), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'PAPI', value: semester.gpa.toFixed(2), icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
>>>>>>> 081ba80e444631c8ed62a59ea8182c8c812c35a6
          { label: 'Créditos', value: semester.courses.reduce((acc, c) => acc + c.credits, 0), icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Materias', value: semester.courses.length, icon: BookOpen, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className={`p-3 md:p-4 rounded-2xl border border-slate-100 ${stat.bg} flex items-center gap-3 md:gap-4 shadow-sm`}>
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white flex items-center justify-center ${stat.color} shadow-sm shrink-0`}>
              <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div>
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 leading-tight mb-0.5">{stat.label}</p>
              <p className={`text-sm md:text-xl font-black ${stat.color} leading-none`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Course List - Desktop Table / Mobile Cards */}
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
              {semester.courses.map((course) => {
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
                  <td colSpan={2} className="px-6 py-4 uppercase tracking-widest">Promedio Semestral</td>
                  <td className="px-6 py-4">{semester.courses.reduce((acc, c) => acc + c.credits, 0)}</td>
                  <td colSpan={2} className="px-6 py-4 text-right pr-6 tracking-widest text-[#1e2d4d] text-sm">{semester.gpa.toFixed(2)}</td>
                  <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Card View */}
        <div id="grades-mobile-list" className="grid grid-cols-1 gap-3 md:hidden">
          {semester.courses.map((course) => {
            const status = getStatusConfig(course.average || 0);
            return (
              <motion.div 
                key={course.id}
                id={`course-card-${course.id}`}
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
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Promedio Semestral</span>
            <span className="text-xl font-black italic">{semester.gpa.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
