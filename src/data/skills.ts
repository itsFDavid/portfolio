export interface Skill {
  id: string;
  title: string;
  icon: 'code' | 'panels' | 'database' | 'cpu' | 'key' | 'shield';
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
    tags: ['React', 'Tailwind CSS', 'Bootstrap', 'Shadcn', 'Next.js'],
  },
  {
    id: 'backend',
    title: 'Desarrollo Backend',
    icon: 'code',
    tags: [
      'Node.js',
      'Express.js',
      'NestJS',
      'Microservicios NestJS',
      'REST APIs',
      'RabbitMQ',
      'Redis',
      'TypeORM',
      'pdfmake',
      'Laravel',
    ],
  },
  {
    id: 'bases-datos',
    title: 'Bases de Datos',
    icon: 'database',
    tags: ['MySQL', 'PostgreSQL', 'Prisma ORM', 'MongoDB'],
  },
  {
    id: 'networking',
    title: 'Networking & Seguridad',
    icon: 'shield',
    tags: [
      'Proxmox VE',
      'OPNsense',
      'VLAN 802.1Q',
      'Apache Guacamole',
      'Dnsmasq',
      'AES-256-GCM',
    ],
  },
  {
    id: 'herramientas',
    title: 'Herramientas y Tecnologias',
    icon: 'cpu',
    tags: [
      'Git',
      'VS Code',
      'Docker',
      'Docker Swarm',
      'k3s',
      'Traefik',
      'Postman',
      'Swagger',
      'Stripe API',
      'GitHub Apps / OAuth',
      'Figma',
    ],
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
