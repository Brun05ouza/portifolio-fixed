import type { ComponentType, SVGProps } from 'react';
import {
  SiJavascript,
  SiReact,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiTypescript,
  SiExpress,
  SiGit,
} from 'react-icons/si';

type SiIcon = ComponentType<SVGProps<SVGSVGElement>>;

export const CERT_ICON_MAP: Record<string, SiIcon> = {
  javascript: SiJavascript,
  react: SiReact,
  html5: SiHtml5,
  css3: SiCss3,
  nodejs: SiNodedotjs,
  typescript: SiTypescript,
  express: SiExpress,
  git: SiGit,
};

export const CERT_ICON_OPTIONS = Object.keys(CERT_ICON_MAP).map((id) => ({
  id,
  label: id,
}));

export function getCertIcon(iconId: string): SiIcon {
  return CERT_ICON_MAP[iconId] ?? SiJavascript;
}
