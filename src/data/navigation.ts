export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: 'Inicio', href: '#home' },
  { label: 'Acerca', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Logros', href: '#achievements' },
  { label: 'Contacto', href: '#contact' },
];
