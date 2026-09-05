import type { Lang } from "../i18n/utils";
import type { LocalizedText } from "../i18n/types";

export interface Achievement {
  id: string;
  year: string;
  title: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  icon: "trophy" | "star" | "award";
}

export const achievements: Achievement[] = [
  {
    id: "tecnico-computacion",
    year: "2022",
    title: {
      es: "Título de Técnico en Computación",
      en: "Technical Degree in Computer Science",
    },
    description: {
      es: "Obtuve el título de Técnico en Computación por parte del Colegio de Estudios Científicos y Tecnológicos del Estado de México (Cecytem).",
      en: "I obtained the Technical Degree in Computer Science from the College of Scientific and Technological Studies of the State of Mexico (Cecytem).",
    },
    category: { es: "Académico", en: "Academic" },
    icon: "trophy",
  },
  {
    id: "tecnico-nube",
    year: "2025",
    title: {
      es: "Técnico en cómputo en la nube",
      en: "Cloud Computing Technician",
    },
    description: {
      es: "Obtuve el título de Técnico en Cómputo en la Nube por parte del proyecto Capacitación para el Empleo del Gobierno de México y Fundación Carlos Slim.",
      en: "I obtained the Cloud Computing Technician title from the Government of Mexico and Carlos Slim Foundation's Employment Training Project.",
    },
    category: { es: "Académico", en: "Academic" },
    icon: "trophy",
  },
  {
    id: "curso-nestjs",
    year: "2024",
    title: { es: "Curso NestJs", en: "NestJs Course" },
    description: {
      es: "Completé un curso de NestJs, donde aprendí a desarrollar aplicaciones backend escalables y eficientes. Impartido por Fernando Herrera.",
      en: "I completed a NestJs course, learning to develop scalable and efficient backend applications. Taught by Fernando Herrera.",
    },
    category: { es: "Educación", en: "Education" },
    icon: "star",
  },
  {
    id: "curso-microservicios",
    year: "2024",
    title: { es: "Curso Microservicios NestJs", en: "Microservices with NestJs Course" },
    description: {
      es: "Completé un curso de Microservicios con NestJs, aprendiendo a diseñar aplicaciones distribuidas. Impartido por Fernando Herrera.",
      en: "I completed a Microservices with NestJs course, learning to design distributed applications. Taught by Fernando Herrera.",
    },
    category: { es: "Educación", en: "Education" },
    icon: "star",
  },
  {
    id: "coloquio-universitario",
    year: "2024",
    title: { es: "Participación en Coloquio", en: "Participation in Symposium" },
    description: {
      es: "Participé en un coloquio universitario donde presenté un proyecto de compuertas lógicas, electrónica digital.",
      en: "I participated in a university symposium presenting a project on logic gates and digital electronics.",
    },
    category: { es: "Universitario", en: "University" },
    icon: "award",
  },
];

export function getAchievements(lang: Lang) {
  return achievements.map((a) => ({
    id: a.id,
    year: a.year,
    title: a.title[lang],
    description: a.description[lang],
    category: a.category[lang],
    icon: a.icon,
  }));
}

export type ResolvedAchievement = ReturnType<typeof getAchievements>[number];