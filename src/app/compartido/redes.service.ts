import { Injectable, computed, signal } from '@angular/core';

export type RedSocial = 'instagram' | 'tiktok' | 'facebook' | 'whatsapp';

export interface RedConfig {
  red: RedSocial;
  nombre: string;
  url: string;
  visible: boolean;
}

export const REDES_DEFAULT: RedConfig[] = [
  { red: 'instagram', nombre: 'Instagram', url: 'https://www.instagram.com/rubiesteticaintegral346', visible: true },
  { red: 'tiktok', nombre: 'TikTok', url: 'https://www.tiktok.com/@rubiesteticaintegral', visible: true },
  { red: 'facebook', nombre: 'Facebook', url: 'https://www.facebook.com/share/1EmkVciVwj/', visible: true },
  { red: 'whatsapp', nombre: 'WhatsApp', url: 'https://wa.me/51945189720', visible: true }
];

/** Enlaces publicos de redes sociales para cabecera, pie y pagina de contacto. */
@Injectable({ providedIn: 'root' })
export class RedesService {
  redes = signal<RedConfig[]>(REDES_DEFAULT.map(r => ({ ...r })));

  /** Redes marcadas como visibles y con enlace configurado. */
  activas = computed(() => this.redes().filter(r => r.visible && !!r.url.trim()));

  /** Enlace de WhatsApp para el botón flotante; vacío si está oculto. */
  whatsapp = computed(() => this.activas().find(r => r.red === 'whatsapp')?.url ?? '');
}
