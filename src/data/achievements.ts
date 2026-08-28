export interface Achievement {
  id: string;
  year: string;
  title: string;
  description: string;
  category: 'Academico' | 'Educacion' | 'Universitario';
  icon: 'trophy' | 'star' | 'award';
}

export const achievements: Achievement[] = [
  {
    id: 'tecnico-computacion',
    year: '2022',
    title: 'Titulo de Tecnico en computacion',
    description:
      'Obtuve el título de Técnico en Computación por parte del Colegio de Estudios Científicos y Tecnológicos del Estado de México (Cecytem).',
    category: 'Academico',
    icon: 'trophy',
  },
  {
    id: 'tecnico-nube',
    year: '2025',
    title: 'Técnico en cómputo en la nube',
    description:
      'Obtuve el título de Técnico en Cómputo en la Nube por parte del proyecto Capacitación para el Empleo del Gobierno de México y Fundación Carlos Slim. Este curso me proporcionó una sólida base en tecnologías de nube, incluyendo servicios de almacenamiento, bases de datos y computación en la nube.',
    category: 'Academico',
    icon: 'trophy',
  },
  {
    id: 'curso-nestjs',
    year: '2024',
    title: 'Curso NestJs',
    description:
      'Completé un curso de NestJs, donde aprendí a desarrollar aplicaciones backend escalables y eficientes utilizando este framework. El curso fui impartido por Fernando Herrera, un reconocido instructor en el ámbito del desarrollo web.',
    category: 'Educacion',
    icon: 'star',
  },
  {
    id: 'curso-microservicios',
    year: '2024',
    title: 'Curso Microservicios NestJs',
    description:
      'Completé un curso de Microservicios con NestJs, donde aprendí a diseñar y desarrollar aplicaciones distribuidas utilizando el patrón de microservicios. El curso fue impartido por Fernando Herrera, un reconocido instructor en el ámbito del desarrollo web.',
    category: 'Educacion',
    icon: 'star',
  },
  {
    id: 'coloquio-universitario',
    year: '2024',
    title: 'Participacion en Coloquio',
    description:
      'Participé en un coloquio universitario donde presenté un proyecto de compuertas logicas, electronica digital. Este evento me permitió compartir mis conocimientos y aprender de otros profesionales del campo.',
    category: 'Universitario',
    icon: 'award',
  },
];
