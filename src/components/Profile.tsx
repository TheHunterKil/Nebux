import React, { useState } from 'react';
import { User } from '../types';
import { User as UserIcon, Mail, Phone, MapPin, Calendar, ShieldCheck, Edit, Save, X, Fingerprint, Droplets, CreditCard, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

export default function Profile({ user, onUpdate }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    onUpdate(editedUser);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="space-y-6">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-2">
              <span>Inicio</span>
              <span>•</span>
              <span className="text-slate-600">Mi Perfil</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <UserIcon className="w-5 h-5 text-brand-info" />
              Gestión de Perfil Estudiantil
          </h1>
        </div>

        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-[#1e2d4d] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:shadow-[#1e2d4d]/20 transition-all active:scale-95"
          >
              <Edit className="w-4 h-4" />
              Editar Información
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleCancel}
              className="flex items-center gap-2 bg-slate-100 text-slate-600 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
                <X className="w-4 h-4" />
                Cancelar
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:shadow-green-600/20 transition-all active:scale-95"
            >
                <Save className="w-4 h-4" />
                Guardar Cambios
            </button>
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-base p-10 flex flex-col items-center text-center space-y-4">
            <div className="w-28 h-28 rounded-3xl bg-[#1e2d4d] flex items-center justify-center text-white text-3xl font-black shadow-xl relative group overflow-hidden">
               {initials}
               <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <UserIcon className="w-8 h-8" />
               </div>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">{user.name}</h2>
              <p className="text-xs font-bold text-slate-400 mt-1">{user.career}</p>
              <div className="mt-3 inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter border border-blue-100">
                  <ShieldCheck className="w-3 h-3" />
                  Estudiante Regular
              </div>
            </div>
            
            <div className="w-full space-y-3 pt-6 text-left border-t border-slate-50 mt-4">
               <div className="space-y-1">
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">ID UNICOMFACAUCA</span>
                  <p className="text-xs font-black text-slate-800 break-all">{user.id}</p>
               </div>
               <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Período Activo</span>
                  <span className="text-slate-800 font-black">{user.periodLabel}</span>
               </div>
               <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Progreso Académico</span>
                  <span className="text-brand-info font-black">65%</span>
               </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative">
             <div className="relative z-10">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Promedio Acumulado</p>
                <h3 className="text-4xl font-black text-brand-gold">{user.overallGpa.toFixed(2)}</h3>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">Top 5% de la carrera</p>
             </div>
             <TrendingUp className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5" />
          </div>
        </div>

        {/* Info Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="card-base p-8 space-y-8">
            <div>
               <h3 className="text-sm font-black text-[#1e2d4d] uppercase tracking-widest flex items-center gap-2 mb-6">
                 <Fingerprint className="w-4 h-4 text-brand-info" />
                 Información Personal e Inmutable
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1 opacity-70">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Nombre Completo</p>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700">
                       {user.name}
                    </div>
                  </div>
                  <div className="space-y-1 opacity-70">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Grupo Sanguíneo</p>
                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700 uppercase">
                       <Droplets className="w-3.5 h-3.5 text-red-500" />
                       {user.bloodType}
                    </div>
                  </div>
                  <div className="space-y-1 opacity-70">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Identificación</p>
                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700">
                       <CreditCard className="w-3.5 h-3.5" />
                       {user.documentType}: {user.documentNumber}
                    </div>
                  </div>
                  <div className="space-y-1 opacity-70">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Fecha de Nacimiento</p>
                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700">
                       <Calendar className="w-3.5 h-3.5" />
                       {user.birthDate}
                    </div>
                  </div>
               </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
               <h3 className="text-sm font-black text-[#1e2d4d] uppercase tracking-widest flex items-center gap-2 mb-6">
                 <Mail className="w-4 h-4 text-brand-info" />
                 Información Actualizable
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Correo Institucional</p>
                    {isEditing ? (
                      <input 
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                        className="w-full p-3 bg-white border border-brand-info/30 rounded-xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-brand-info/10 focus:outline-none transition-all"
                      />
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700">
                        {user.email}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Teléfono de Contacto</p>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={editedUser.phone}
                        onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                        className="w-full p-3 bg-white border border-brand-info/30 rounded-xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-brand-info/10 focus:outline-none transition-all"
                      />
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700">
                        {user.phone}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Dirección de Residencia</p>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={editedUser.address}
                        onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                        className="w-full p-3 bg-white border border-brand-info/30 rounded-xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-brand-info/10 focus:outline-none transition-all"
                      />
                    ) : (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700 uppercase">
                        {user.address}
                      </div>
                    )}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-slate-900 text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-3 z-50 border border-white/10"
          >
            <Save className="w-5 h-5 text-brand-gold" />
            <p className="text-xs font-bold tracking-tight">¡Perfil actualizado correctamente!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
