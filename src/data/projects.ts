import type { LocalizedText } from "../i18n/types";
import type { Lang } from "../i18n/utils";

export interface Project {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  image?: string;
  tags: string[];
  demoUrl?: string;
  demoLabel?: LocalizedText;
  repoUrl?: string;
  repoLabel?: string;
  detailUrl?: string;
  detailLabel?: LocalizedText;
  featured?: boolean;
  hidden?: boolean;
  iframe?: {
    src: string;
  };
}

export const projects: Project[] = [
  {
    id: 'homelab-infrastructure',
    title: { es: 'Infraestructura del Homelab — Proxmox + OPNsense + k3s', en: 'Homelab Infrastructure — Proxmox + OPNsense + k3s' },
    description: {
      es: 'Laboratorio de infraestructura propio para tener recursos de desarrollo, testing y proyectos personales sin pagar VPS/cloud, con segmentación de red por VLANs y virtualización completa.',
      en: 'Own infrastructure lab for having development, testing and personal projects resources without paying for VPS/cloud, with network segmentation by VLANs and complete virtualization.',
    },
    image: '/images/homelab.svg',
    tags: ['Proxmox VE', 'OPNsense', 'k3s', 'Apache Guacamole', 'VLAN', 'Networking'],
    detailUrl: '/projects/homelab-infrastructure',
    detailLabel: { es: 'Ver Detalle', en: 'View Details' },
    featured: true,
  },
  {
    id: 'isverceo',
    title: { es: 'Plataforma IsVerceo', en: 'IsVerceo Platform' },
    description: {
      es: 'Plataforma como Servicio (PaaS) construida para automatizar el despliegue de aplicaciones. Diseñada con una arquitectura de microservicios, integración de proxy inverso y orquestación de contenedores para alta disponibilidad.',
      en: 'Platform as a Service (PaaS) built to automate application deployment. Designed with a microservices architecture, reverse proxy integration, and container orchestration for high availability.',
    },
    tags: ['NestJS', 'Docker Swarm', 'Traefik', 'Microservicios'],
    detailUrl: '/projects/isverceo',
    detailLabel: { es: 'Ver Detalle', en: 'View Details' },
    demoUrl: 'https://isverceo.com',
    demoLabel: { es: 'Abrir Plataforma', en: 'Open Platform' },
    featured: true,
    iframe: {
      src: 'https://isverceo.com',
    },
  },
  {
    id: 'tiendas-don-pepe',
    title: { es: 'E-commerce Tiendas Don Pepe', en: 'E-commerce Tiendas Don Pepe' },
    description: {
      es: 'Un sistema de comercio electrónico desarrollado con Next y NestJs, que permite a los usuarios comprar productos en línea de manera fácil y rápida ademas de descargar sus facturas en PDF.',
      en: 'An e-commerce system developed with Next and NestJs, allowing users to buy products online easily and quickly, as well as download their invoices in PDF format.',
    },
    image: '/images/tiendas-don-pepe.webp',
    tags: ['NextJs', 'NestJs', 'MySQL', 'PdfMake', 'TypeScript', 'Shadcn', 'Tailwind CSS'],
    repoUrl: 'https://github.com/itsFDavid/Projects/tree/main/API-Nest-Tienda/tienda-don-pepe',
    repoLabel: 'GitHub API',
    detailUrl: '/projects/tiendas-don-pepe',
    detailLabel: { es: 'Ver Detalle', en: 'View Details' },
    demoUrl: 'https://tiendas-pepe.itsfdavid.com/login',
    demoLabel: { es: 'Ver Sitio', en: 'View Site' },
  },
  {
    id: 'gestion-escolar',
    title: { es: 'Gestion Escolar con Laravel', en: 'School Management with Laravel' },
    description: {
      es: 'Un sistema de gestión escolar desarrollado en Laravel que permite administrar estudiantes, cursos y calificaciones de manera eficiente.',
      en: 'A school management system developed in Laravel that allows for the efficient management of students, courses, and grades.',
    },
    image: '/images/gestion_escolar.webp',
    tags: ['Laravel', 'MySQL', 'Blade Php', 'Tailwind CSS'],
    repoUrl: 'https://github.com/School-Rating-Management/rating-management-laravel',
    repoLabel: 'GitHub',
    hidden: true,
  },
  {
    id: 'memory-game',
    title: { es: 'Juego de Memoria', en: 'Memory Game' },
    description: {
      es: 'Un juego de memoria interactivo desarrollado con React. El objetivo es encontrar pares de cartas iguales antes que tu contrincante.',
      en: 'An interactive memory game developed with React. The objective is to find pairs of identical cards before your opponent.',
    },
    image: '/images/memory_game.webp',
    tags: ['React', 'Tailwind CSS'],
    demoUrl: 'https://illustrious-alfajores-e89d2e.netlify.app/',
    demoLabel: { es: 'Demo', en: 'Demo' },
    hidden: true,
  },
  {
    id: 'heart-fail-detect',
    title: { es: 'Detectar Fallos Cardíacos', en: 'Detect Heart Failures' },
    description: {
      es: 'Un proyecto de análisis de datos que utiliza Python y Machine Learning para detectar fallos cardíacos a partir de un conjunto de datos de salud. Utiliza un modelo de regresión logística entrenado con datos de pacientes con fallos cardíacos. Contiene: Precicison de 88.12% F1 Score de 89.60%',
      en: 'A data analysis project that uses Python and Machine Learning to detect heart failures from a set of health data. Uses a logistic regression model trained with data from patients with heart failures. Contains: Precision of 88.12% F1 Score of 89.60%',
    },
    image: '/images/heart_fail_detector.webp',
    tags: ['Python', 'Flask'],
    repoUrl: 'https://github.com/itsFDavid/Simulacion/tree/main/Practices/Train_Heart_Failure',
    repoLabel: 'GitHub',
    hidden: true,
  },
  {
    id: 'turing-machine',
    title: { es: 'Simulador de Máquina de Turing', en: 'Turing Machine Simulator' },
    description: {
      es: 'Un simulador de máquina de Turing que permite a los usuarios experimentar con diferentes configuraciones y ver cómo la máquina procesa cadenas de entrada. Utiliza un modelo de máquina de Turing para simular el procesamiento de cadenas de caracteres con prodcuto de dos numeros.',
      en: 'A Turing machine simulator that allows users to experiment with different configurations and see how the machine processes input strings. Uses a Turing machine model to simulate the processing of character strings with the product of two numbers.',
    },
    image: '/images/turing_machine.webp',
    tags: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://projects-m69u.onrender.com/',
    demoLabel: { es: 'Demo', en: 'Demo' },
    hidden: true,
  },
];

export function getProjects(lang: Lang) {
  return projects.map((p) => ({
    id: p.id,
    title: p.title[lang],
    description: p.description[lang],
    image: p.image,
    tags: p.tags,
    demoUrl: p.demoUrl,
    demoLabel: p.demoLabel ? p.demoLabel[lang] : undefined,
    repoUrl: p.repoUrl,
    repoLabel: p.repoLabel,
    detailUrl: p.detailUrl,
    detailLabel: p.detailLabel ? p.detailLabel[lang] : undefined,
    featured: p.featured,
    hidden: p.hidden,
    iframe: p.iframe,
  }));
}

export type ResolvedProject = ReturnType<typeof getProjects>[number];
