import type { Lang } from "../i18n/utils";
import type { LocalizedText } from "../i18n/types";

export interface Skill {
  id: string;
  title: LocalizedText;
  icon: 'code' | 'panels' | 'database' | 'cpu' | 'key' | 'shield';
  tags: string[];
}

export const skills: Skill[] = [
  {
    id: 'lenguajes',
    title: { es: 'Lenguajes de Programacion', en: 'Programming Languages' },
    icon: 'panels',
    tags: ['JavaScript', 'TypeScript', 'Python', 'HTML & CSS', 'SQL', 'PHP'],
  },
  {
    id: 'frontend',
    title: { es: 'Desarrollo Frontend', en: 'Frontend Development' },
    icon: 'panels',
    tags: ['React', 'Tailwind CSS', 'Bootstrap', 'Shadcn', 'Next.js'],
  },
  {
    id: 'backend',
    title: { es: 'Desarrollo Backend', en: 'Backend Development' },
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
    title: { es: 'Bases de Datos', en: 'Databases' },
    icon: 'database',
    tags: ['MySQL', 'PostgreSQL', 'Prisma ORM', 'MongoDB'],
  },
  {
    id: 'networking',
    title: { es: 'Networking & Seguridad', en: 'Networking & Security' },
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
    title: { es: 'Herramientas y Tecnologias', en: 'Tools and Technologies' },
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
    title: { es: 'Soft Skills y Hard Skills', en: 'Soft Skills and Hard Skills' },
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

export function getSkills(lang: Lang) {
  return skills.map((s) => ({
    id: s.id,
    title: s.title[lang],
    icon: s.icon,
    tags: s.tags,
  }));
}

export type ResolvedSkill = ReturnType<typeof getSkills>[number];