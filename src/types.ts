export interface Grade {
  id: string;
  courseName: string;
  courseCode: string;
  teacher?: string;
  credits: number;
  partial1: number | null;
  partial2: number | null;
  partial3: number | null;
  final: number | null;
  average: number | null;
  status: 'passed' | 'failed' | 'in_progress' | 'risk';
}

export interface ClassSchedule {
  id: string;
  courseName: string;
  time: string;
  classroom: string;
  teacher: string;
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes';
  note?: string;
}

export interface Semester {
  id: string;
  period: string;
  year: string;
  gpa: number;
  courses: Grade[];
}

export interface User {
  id: string;
  name: string;
  career: string;
  currentSemester: number;
  overallGpa: number;
  totalCredits: number;
  periodLabel: string;
  email: string;
  phone: string;
  address: string;
  bloodType: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
}

export interface Room {
  id: string;
  name: string;
  type: 'Aula Teórica' | 'Laboratorio' | 'Auditorio' | 'Sala de Juntas';
  status: 'Libre' | 'Ocupado' | 'Reservado';
  capacity: number;
  currentActivity?: string;
  nextFreeTime?: string;
  location?: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  category: string;
  coverUrl: string;
  description: string;
  isAvailable: boolean;
}

export interface TeacherEvaluation {
  teacherId: string;
  teacherName: string;
  courseName: string;
  isEvaluated: boolean;
  ratings?: {
    domain: number;
    clarity: number;
    resources: number;
    engagement: number;
  };
  comment?: string;
}

export interface PQRS {
  id: string;
  type: 'Petición' | 'Queja' | 'Reclamo' | 'Sugerencia';
  subject: string;
  description: string;
  status: 'Radicado' | 'En Trámite' | 'Resuelto' | 'Cerrado';
  date: string;
  response?: string;
}

export interface SupportTicket {
  id: string;
  category: 'Técnico' | 'Académico' | 'Acceso/Password' | 'Otro';
  priority: 'Baja' | 'Media' | 'Alta';
  subject: string;
  description: string;
  status: 'Abierto' | 'En Progreso' | 'Resuelto';
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'event' | 'quiz' | 'exam' | 'info';
  date: string;
  isRead: boolean;
}
