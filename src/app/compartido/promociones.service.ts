import { Injectable, computed, signal } from '@angular/core';
import { PROMOCIONES } from '../data/datos';
import { Promocion } from '../data/modelos';

/** Promociones publicas que alimentan el carrusel y las tarjetas informativas. */
@Injectable({ providedIn: 'root' })
export class PromocionesService {
  private lista = signal<Promocion[]>(PROMOCIONES.map(p => ({ ...p })));

  readonly promociones = this.lista.asReadonly();

  readonly activas = computed(() => this.lista().filter(p => p.activa));

  readonly carrusel = computed(() => this.lista().filter(p => p.activa && p.destacada));

  porId(id: number): Promocion | undefined {
    return this.lista().find(p => p.id === id);
  }
}
