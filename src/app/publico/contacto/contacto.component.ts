import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapaSedeComponent } from '../../compartido/mapa-sede.component';
import { RedesEnlacesComponent } from '../../compartido/redes-enlaces.component';
import { RedesService } from '../../compartido/redes.service';
import { LOCALES } from '../../data/datos';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RouterLink, MapaSedeComponent, RedesEnlacesComponent],
  template: `
    <section class="cabecera-pagina">
      <div class="contenedor">
        <div class="miga"><a routerLink="/">Inicio</a> / Contacto</div>
        <h1>Contacto</h1>
        <p>Elige el canal que te resulte más cómodo o visita una de nuestras sedes.</p>
      </div>
    </section>

    <section class="seccion">
      <div class="contenedor contacto">
        <article class="panel contacto__canales">
          <span class="contacto__eyebrow">Atención directa</span>
          <h2>Estamos para ayudarte</h2>
          <p>
            Consulta tratamientos, productos, promociones o la disponibilidad de nuestras sedes por el canal que prefieras.
          </p>

          <div class="contacto__acciones">
            @if (redes.whatsapp()) {
              <a [href]="whatsappGeneral()" target="_blank" rel="noopener" class="btn btn--primario btn--bloque">
                Escribir por WhatsApp
              </a>
            }
            <a href="tel:945189720" class="btn btn--linea btn--bloque">Llamar al 945 189 720</a>
          </div>

          @if (redes.activas().length) {
            <div class="contacto-redes">
              <span class="dato__label">Redes sociales</span>
              <app-redes-enlaces [conTexto]="true" />
            </div>
          }
        </article>

        <aside class="panel contacto__visita">
          <span class="contacto__eyebrow">Visítanos</span>
          <h2>Dos sedes muy cerca de ti</h2>
          <p>Atendemos todos los días de 9:00 a. m. a 7:00 p. m. en San Juan de Lurigancho.</p>
          <div class="contacto__sedes-resumen">
            @for (l of locales(); track l.id) {
              <div class="contacto__sede-resumen">
                <span>{{ l.nombre }}</span>
                <strong>{{ l.telefono }}</strong>
              </div>
            }
          </div>
        </aside>

        <section class="contacto__sedes" aria-labelledby="sedes-titulo">
          <div class="contacto__sedes-cabecera">
            <div>
              <span class="contacto__eyebrow">Ubicación</span>
              <h2 id="sedes-titulo">Encuentra la sede que te quede mejor</h2>
            </div>
            <p>Ambas sedes están en Las Flores de Primavera, a pocos minutos una de la otra.</p>
          </div>

          <div class="contacto__sedes-grid">
            @for (l of locales(); track l.id) {
              <article class="panel sede-contacto">
                <app-mapa-sede [local]="l" [alto]="220" />
                <div class="sede-contacto__contenido">
                  <div class="sede-contacto__encabezado">
                    <span class="sede-contacto__numero">Sede {{ l.id }}</span>
                    <h3>{{ l.nombre }}</h3>
                  </div>
                  <p class="sede-contacto__direccion">
                    {{ l.direccion }}<br>
                    {{ l.referencia }}<br>
                    {{ l.distrito }}
                  </p>
                  @for (h of l.horario; track h.dias) {
                    <div class="contacto__horario"><span>{{ h.dias }}</span><strong>{{ h.apertura }} — {{ h.cierre }}</strong></div>
                  }
                  <div class="sede-contacto__acciones">
                    <a [href]="l.mapa" target="_blank" rel="noopener" class="btn btn--linea btn--sm">Ver ruta</a>
                    @if (redes.whatsapp()) {
                      <a [href]="whatsappSede(l.nombre)" target="_blank" rel="noopener" class="btn btn--primario btn--sm">Consultar sede</a>
                    }
                  </div>
                </div>
              </article>
            }
          </div>
        </section>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [`
    .contacto {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 24px;
      align-items: stretch;
    }
    .contacto__canales,
    .contacto__visita { padding: 30px; }
    .contacto__eyebrow,
    .sede-contacto__numero {
      display: block;
      color: var(--magenta);
      font-size: .73rem;
      font-weight: 700;
      letter-spacing: .14em;
      text-transform: uppercase;
    }
    .contacto h2 { margin: 8px 0 10px; font-size: clamp(1.45rem, 2vw, 1.85rem); }
    .contacto__canales > p,
    .contacto__visita > p { color: var(--gris); line-height: 1.7; margin: 0; }
    .contacto__acciones { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 24px; }
    .contacto-redes { margin-top: 24px; padding-top: 20px; border-top: 1px dashed var(--linea); }
    .contacto-redes .dato__label { margin-bottom: 10px; }
    .contacto__sedes-resumen { display: grid; gap: 10px; margin-top: 24px; }
    .contacto__sede-resumen {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
      padding: 14px 16px;
      border: 1px solid var(--linea);
      border-radius: var(--radio);
      background: var(--rosa-50);
      color: var(--gris);
      font-size: .94rem;
    }
    .contacto__sede-resumen strong { color: var(--tinta); font-weight: 600; white-space: nowrap; }
    .contacto__sedes { grid-column: 1 / -1; margin-top: 16px; }
    .contacto__sedes-cabecera {
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 32px;
      margin-bottom: 18px;
    }
    .contacto__sedes-cabecera h2 { margin-bottom: 0; }
    .contacto__sedes-cabecera p { max-width: 450px; margin: 0; color: var(--gris); line-height: 1.65; }
    .contacto__sedes-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
    .sede-contacto { padding: 14px; overflow: hidden; }
    .sede-contacto app-mapa-sede { display: block; }
    .sede-contacto__contenido { padding: 20px 8px 8px; }
    .sede-contacto__encabezado { margin-bottom: 14px; }
    .sede-contacto__encabezado h3 { margin: 5px 0 0; font-size: 1.18rem; }
    .sede-contacto__direccion { min-height: 76px; margin: 0 0 14px; color: var(--gris); line-height: 1.6; }
    .contacto__horario {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      font-size: .92rem;
      color: var(--gris);
      padding: 10px 0;
      border-block: 1px dashed var(--linea);
    }
    .contacto__horario strong { color: var(--tinta); font-weight: 600; white-space: nowrap; }
    .sede-contacto__acciones { display: flex; gap: 10px; margin-top: 18px; }
    .sede-contacto__acciones .btn { flex: 1; }
    @media (max-width: 960px) {
      .contacto { grid-template-columns: 1fr; }
      .contacto__sedes { grid-column: auto; margin-top: 0; }
      .contacto__sedes-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .contacto { gap: 16px; }
      .contacto__canales,
      .contacto__visita { padding: 22px; }
      .contacto__acciones,
      .contacto__sedes-cabecera { grid-template-columns: 1fr; flex-direction: column; align-items: stretch; }
      .contacto__sede-resumen { align-items: flex-start; flex-direction: column; gap: 5px; }
      .contacto__sedes-cabecera { gap: 8px; margin-bottom: 14px; }
      .sede-contacto { padding: 10px; }
      .sede-contacto__contenido { padding: 18px 6px 8px; }
      .sede-contacto__direccion { min-height: 0; }
      .sede-contacto__acciones { flex-direction: column; }
    }
  `]
})
export class ContactoComponent {
  readonly redes = inject(RedesService);
  locales = computed(() => LOCALES);

  whatsappGeneral(): string {
    const texto = 'Hola, quiero consultar sobre Rubi Estetica Integral.';
    return `https://wa.me/51945189720?text=${encodeURIComponent(texto)}`;
  }

  whatsappSede(nombreSede: string): string {
    const texto = `Hola, quiero consultar sobre la ${nombreSede}.`;
    return `https://wa.me/51945189720?text=${encodeURIComponent(texto)}`;
  }
}
