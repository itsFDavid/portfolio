export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  demoUrl?: string;
  demoLabel?: string;
  repoUrl?: string;
  repoLabel?: string;
  detailUrl?: string;
  detailLabel?: string;
  featured?: boolean;
  hidden?: boolean;
  iframe?: {
    src: string;
  };
}

export const projects: Project[] = [
  {
    id: 'homelab-infrastructure',
    title: 'Homelab Infrastructure — Proxmox + OPNsense + k3s',
    description:
      'Laboratorio de infraestructura propio para tener recursos de desarrollo, testing y proyectos personales sin pagar VPS/cloud, con segmentación de red por VLANs y virtualización completa.',
    image: '/images/homelab.svg',
    tags: ['Proxmox VE', 'OPNsense', 'k3s', 'Apache Guacamole', 'VLAN', 'Networking'],
    detailUrl: '/projects/homelab-infrastructure',
    detailLabel: 'Ver Detalle',
    featured: true,
  },
  {
    id: 'isverceo',
    title: 'Plataforma IsVerceo',
    description:
      'Plataforma como Servicio (PaaS) construida para automatizar el despliegue de aplicaciones. Diseñada con una arquitectura de microservicios, integración de proxy inverso y orquestación de contenedores para alta disponibilidad.',
    tags: ['NestJS', 'Docker Swarm', 'Traefik', 'Microservicios'],
    demoUrl: 'https://isverceo.com',
    demoLabel: 'Abrir Plataforma',
    featured: true,
    iframe: {
      src: 'https://isverceo.com',
    },
  },
  {
    id: 'tiendas-don-pepe',
    title: 'E-commerce Tiendas Don Pepe',
    description:
      'Un sistema de comercio electrónico desarrollado con Next y NestJs, que permite a los usuarios comprar productos en línea de manera fácil y rápida ademas de descargar sus facturas en PDF.',
    image: '/images/tiendas-don-pepe.webp',
    tags: ['NextJs', 'NestJs', 'MySQL', 'PdfMake', 'TypeScript', 'Shadcn', 'Tailwind CSS'],
    repoUrl: 'https://github.com/itsFDavid/Projects/tree/main/API-Nest-Tienda/tienda-don-pepe',
    repoLabel: 'GitHub API',
    demoUrl: 'https://tiendas-pepe.itsfdavid.com/login',
    demoLabel: 'Ver Sitio',
  },
  {
    id: 'gestion-escolar',
    title: 'Gestion Escolar con Laravel',
    description:
      'Un sistema de gestión escolar desarrollado en Laravel que permite administrar estudiantes, cursos y calificaciones de manera eficiente.',
    image: '/images/gestion_escolar.webp',
    tags: ['Laravel', 'MySQL', 'Blade Php', 'Tailwind CSS'],
    repoUrl: 'https://github.com/School-Rating-Management/rating-management-laravel',
    repoLabel: 'GitHub',
    hidden: true,
  },
  {
    id: 'memory-game',
    title: 'Memory Game',
    description:
      'Un juego de memoria interactivo desarrollado con React. El objetivo es encontrar pares de cartas iguales antes que tu contrincante.',
    image: '/images/memory_game.webp',
    tags: ['React', 'Tailwind CSS'],
    demoUrl: 'https://illustrious-alfajores-e89d2e.netlify.app/',
    demoLabel: 'Demo',
    hidden: true,
  },
  {
    id: 'heart-fail-detect',
    title: 'Detectar Fallos Cardíacos',
    description:
      'Un proyecto de análisis de datos que utiliza Python y Machine Learning para detectar fallos cardíacos a partir de un conjunto de datos de salud. Utiliza un modelo de regresión logística entrenado con datos de pacientes con fallos cardíacos. Contiene: Precicison de 88.12% F1 Score de 89.60%',
    image: '/images/heart_fail_detector.webp',
    tags: ['Python', 'Flask'],
    repoUrl: 'https://github.com/itsFDavid/Simulacion/tree/main/Practices/Train_Heart_Failure',
    repoLabel: 'GitHub',
    hidden: true,
  },
  {
    id: 'turing-machine',
    title: 'Simulador de Máquina de Turing',
    description:
      'Un simulador de máquina de Turing que permite a los usuarios experimentar con diferentes configuraciones y ver cómo la máquina procesa cadenas de entrada. Utiliza un modelo de máquina de Turing para simular el procesamiento de cadenas de caracteres con prodcuto de dos numeros.',
    image: '/images/turing_machine.webp',
    tags: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://projects-m69u.onrender.com/',
    demoLabel: 'Demo',
    hidden: true,
  },
];
