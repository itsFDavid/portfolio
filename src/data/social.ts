export interface SocialLink {
  label: string;
  href: string;
  type: 'github' | 'linkedin' | 'email';
  size?: 'sm' | 'md';
}

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/itsFdavid',
    type: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/francisco-david-dev/',
    type: 'linkedin',
  },
  {
    label: 'Email',
    href: 'mailto:fdavid04@icloud.com',
    type: 'email',
  },
];
