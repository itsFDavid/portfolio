import type { Lang } from "../i18n/utils";
import type { LocalizedText } from "../i18n/types";

export interface NavItem {
  label: LocalizedText;
  href: string;
}

export const navigation: NavItem[] = [
  { label: { es: "Inicio", en: "Home" }, href: "#home" },
  { label: { es: "Acerca", en: "About" }, href: "#about" },
  { label: { es: "Proyectos", en: "Projects" }, href: "#projects" },
  { label: { es: "Habilidades", en: "Skills" }, href: "#skills" },
  { label: { es: "Logros", en: "Achievements" }, href: "#achievements" },
  { label: { es: "Contacto", en: "Contact" }, href: "#contact" },
];

export function getNavigation(lang: Lang) {
  return navigation.map((n) => ({ label: n.label[lang], href: n.href }));
}

export type ResolvedNavigation = ReturnType<typeof getNavigation>[number];