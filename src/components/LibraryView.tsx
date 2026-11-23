import React, { useState } from 'react';
import { LibraryBook } from '../types';
import { Library, Search, ExternalLink, Bookmark, User as UserIcon, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface LibraryViewProps {
  books: LibraryBook[];
}

export default function LibraryView({ books }: LibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-2">
              <span>Inicio</span>
              <span>•</span>
              <span className="text-slate-600">Biblioteca Virtual</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <Library className="w-5 h-5 text-brand-info" />
              Recursos de Ingeniería de Sistemas
          </h1>
        </div>

        <a 
          href="https://www.sciencedirect.com/#open-access" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-brand-info text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-brand-info/90 transition-all"
        >
          <ExternalLink className="w-3 h-3" />
          Base de Datos Libre
        </a>
      </section>

      {/* Search and Filters */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text"
          placeholder="Buscar libros por título, autor o categoría..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-info/20 focus:border-brand-info transition-all shadow-sm"
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book, idx) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-lg hover:border-brand-info transition-all"
          >
            {/* Book Cover Container */}
            <div className="h-48 relative overflow-hidden bg-slate-100">
               <img 
                 src={book.coverUrl} 
                 alt={book.title} 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute top-3 right-3">
                  {book.isAvailable ? (
                    <span className="bg-green-500/90 text-white p-1.5 rounded-full shadow-lg">
                       <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="bg-red-500/90 text-white p-1.5 rounded-full shadow-lg">
                       <XCircle className="w-3.5 h-3.5" />
                    </span>
                  )}
               </div>
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="text-[9px] font-black text-white uppercase tracking-widest bg-brand-info/80 px-2 py-0.5 rounded">
                    {book.category}
                  </span>
               </div>
            </div>

            <div className="p-5 flex-1 flex flex-col space-y-3">
              <div className="space-y-1">
                 <h3 className="text-sm font-bold text-[#1e2d4d] leading-tight line-clamp-2 min-h-[2.5rem]">
                   {book.title}
                 </h3>
                 <div className="flex items-center gap-1.5 text-slate-400">
                    <UserIcon className="w-3 h-3" />
                    <span className="text-[10px] font-bold">{book.author}</span>
                 </div>
              </div>

              <p className="text-[10px] text-slate-500 font-medium line-clamp-3 italic">
                "{book.description}"
              </p>

              <div className="pt-4 mt-auto border-t border-slate-50 flex items-center justify-between">
                 <button className="flex items-center gap-2 text-brand-info text-[10px] font-black uppercase tracking-widest hover:translate-x-1 transition-transform">
                    <BookOpen className="w-3.5 h-3.5" />
                    Leer Online
                 </button>
                 <button className="text-slate-300 hover:text-brand-accent transition-colors">
                    <Bookmark className="w-4 h-4" />
                 </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="h-64 flex flex-col items-center justify-center text-slate-400 bg-white border border-slate-100 rounded-2xl shadow-sm">
           <Library className="w-12 h-12 opacity-10 mb-4" />
           <p className="text-xs font-bold uppercase tracking-widest text-slate-600">No se encontraron libros</p>
           <p className="text-[10px] mt-1 font-medium">Intenta con otro término de búsqueda.</p>
        </div>
      )}

      {/* Database recommendation banner */}
      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
         <div className="relative z-10 space-y-4 max-w-lg">
            <h2 className="text-xl font-black leading-tight">Acceso a Bases de Datos Académicas</h2>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Como estudiante de Unicomfacauca, tienes acceso a múltiples bases de datos científicas y técnicas para profundizar en tu formación como Ingeniero de Sistemas.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
               <a 
                 href="https://doaj.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all glass-effect border border-white/5"
               >
                 <ExternalLink className="w-3 h-3" />
                 DOAJ (Open Access)
               </a>
               <a 
                 href="https://arxiv.org/list/cs/recent" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all glass-effect border border-white/5"
               >
                 <ExternalLink className="w-3 h-3" />
                 ArXiv (Computer Science)
               </a>
            </div>
         </div>
         <div className="absolute -right-10 -bottom-10 opacity-10">
            <Library className="w-64 h-64 text-white" />
         </div>
      </div>
    </div>
  );
}
