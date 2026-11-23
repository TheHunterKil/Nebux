import React from 'react';
import { User, Semester, ClassSchedule } from '../types';
import { 
  AlertTriangle, 
  TrendingUp, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  Clock,
  MapPin,
  Lightbulb
} from 'lucide-react';
import { motion } from 'motion/react';

interface OverviewProps {
  user: User;
  currentSemester: Semester;
  schedule: ClassSchedule[];
}

export default function Overview({ user, currentSemester, schedule }: OverviewProps) {
  const gpa = user.overallGpa;
  const riskCoursesCount = currentSemester.courses.filter(c => (c.average || 0) < 3.0).length;

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

  const alert = getAlertConfig();

  return (
    <div className="space-y-6">
      {/* Dynamic Academic Alert */}
      <div className={`${alert.bg} border-l-4 ${alert.border} p-4 rounded-r-lg flex items-center gap-4`}>
        <div className={`${alert.iconBg} p-2 rounded-full`}>
          <alert.icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className={`text-sm font-bold ${alert.textTitle}`}>{alert.title}</h3>
          <p className={`text-xs ${alert.textDesc} font-medium`}>
            Promedio actual: {gpa.toFixed(2)} • {riskCoursesCount} materia(s) en riesgo
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Promedio Actual', value: user.overallGpa.toFixed(2), icon: TrendingUp, bg: 'bg-green-100', text: 'text-green-600', iconBg: 'bg-green-500' },
          { label: 'Créditos Cursados', value: user.totalCredits, icon: GraduationCap, bg: 'bg-blue-100', text: 'text-blue-600', iconBg: 'bg-blue-500' },
          { label: 'Materias Activas', value: currentSemester.courses.length, icon: BookOpen, bg: 'bg-purple-100', text: 'text-purple-600', iconBg: 'bg-purple-500' },
          { label: 'Semestre', value: 'VI', icon: Calendar, bg: 'bg-orange-100', text: 'text-orange-600', iconBg: 'bg-orange-500' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-start gap-2"
          >
            <div className={`p-1.5 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-4 h-4 ${stat.text}`} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.text}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Subjects and Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subjects List */}
        <div className="card-base p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
               <BookOpen className="w-5 h-5 text-slate-400" />
               <h3 className="text-sm font-bold text-slate-700">Materias del Semestre</h3>
          </div>
          <div className="space-y-6">
            {currentSemester.courses.map((course) => {
              const status = getStatusConfig(course.average || 0);
              return (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-slate-700 leading-none">{course.courseName}</span>
                    <div className="text-right leading-none">
                      <span className={`text-[10px] font-bold uppercase ${status.colorClass}`}>
                          {status.label}
                      </span>
                      <p className="text-xs font-black text-slate-800 mt-1">{course.average?.toFixed(1)}</p>
                    </div>
                  </div>
                  <div className="progress-bar-container">
                    <div className={`h-full rounded-full ${status.bgClass}`} style={{ width: `${(course.average || 0) * 20}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule and Tip */}
        <div className="space-y-6">
          <div className="card-base p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                 <Calendar className="w-5 h-5 text-slate-400" />
                 <h3 className="text-sm font-bold text-slate-700">Próximas Clases Hoy</h3>
            </div>
            <div className="space-y-4">
              {schedule.filter(s => s.day === 'Lunes').map((item) => (
                <div key={item.id} className="flex gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                  <div className="w-20 h-14 bg-blue-50 rounded-lg flex flex-col items-center justify-center text-[9px] font-black text-blue-600 shrink-0 text-center px-1">
                    {item.time.replace(' - ', '\n')}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{item.courseName}</h4>
                    <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">{item.classroom}</p>
                    {item.note && (
                      <div className="mt-1 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <p className="text-[9px] text-amber-600 font-bold truncate italic">{item.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip of the day */}
          <div className="bg-blue-50 p-4 rounded-xl flex gap-3 border border-blue-100">
             <div className="p-2 bg-blue-500 rounded-lg h-fit">
                <Lightbulb className="w-4 h-4 text-white" />
             </div>
             <div>
                <h4 className="text-xs font-bold text-blue-700">Tip del día</h4>
                <p className="text-[10px] text-blue-600 font-medium mt-1">
                    Recuerda que tienes una evaluación de Redes el próximo jueves.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
