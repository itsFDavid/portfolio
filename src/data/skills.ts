export interface Skill {
  id: string;
  title: string;
  icon: 'code' | 'panels' | 'database' | 'cpu' | 'key';
  tags: string[];
}

export const skills: Skill[] = [
  {
    id: 'lenguajes',
    title: 'Lenguajes de Programacion',
    icon: 'panels',
    tags: ['JavaScript', 'TypeScript', 'Python', 'HTML & CSS', 'SQL', 'PHP'],
  },
  {
    id: 'frontend',
    title: 'Desarrollo Frontend',
    icon: 'panels',
    tags: ['React', 'Tailwind CSS', 'Bootstrap', 'Blade php'],
  },
  {
    id: 'backend',
    title: 'Desarrollo Backend',
    icon: 'code',
    tags: ['Node.js', 'Express.js', 'NestJs', 'Microservicios NestJs', 'REST APIs', 'Laravel'],
  },
  {
    id: 'bases-datos',
    title: 'Bases de Datos',
    icon: 'database',
    tags: ['MySQL', 'PostgreSQL', 'Prisma ORM', 'Type ORM', 'MongoDB'],
  },
  {
    id: 'herramientas',
    title: 'Herramientas y Tecnologias',
    icon: 'cpu',
    tags: ['Git', 'VS Code', 'Docker', 'Postman', 'Swagger', 'Figma'],
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills y Hard Skills',
    icon: 'key',
    tags: [
      'Ingles B2',
      'Trabajo en equipo',
      'Comunicación',
      'Resolución de problemas',
      'Adaptabilidad',
      'Creatividad',
      'Liderazgo',
    ],
  },
];
