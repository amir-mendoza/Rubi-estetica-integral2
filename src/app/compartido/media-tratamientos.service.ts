import { Injectable } from '@angular/core';
import { TRATAMIENTOS } from '../data/datos';
import { Tratamiento } from '../data/modelos';

export interface MediaTratamiento {
  video: string;
  videoPoster: string;
  tiktokUrl: string;
  galeria: string[];
}

function vacia(): MediaTratamiento {
  return { video: '', videoPoster: '', tiktokUrl: '', galeria: [] };
}

/** Media publica configurada directamente en el catalogo de tratamientos. */
@Injectable({ providedIn: 'root' })
export class MediaTratamientosService {
  media(t: Tratamiento): MediaTratamiento {
    return {
      video: t.video ?? '',
      videoPoster: t.videoPoster ?? '',
      tiktokUrl: t.tiktokUrl ?? '',
      galeria: t.galeria ?? []
    };
  }

  mediaPorId(id: number): MediaTratamiento {
    const base = TRATAMIENTOS.find(t => t.id === id);
    return base ? this.media(base) : vacia();
  }
}
