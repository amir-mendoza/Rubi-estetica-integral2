import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOCALES, PRODUCTOS, TRATAMIENTOS, soles } from '../../data/datos';
import { PromoCarruselComponent } from './promo-carrusel.component';
import { RedesEnlacesComponent } from '../../compartido/redes-enlaces.component';
import { RedesService } from '../../compartido/redes.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, PromoCarruselComponent, RedesEnlacesComponent],
  templateUrl: './inicio.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  readonly redes = inject(RedesService);
  soles = soles;
  destacados = TRATAMIENTOS.filter(t => t.destacado).slice(0, 6);
  productos = PRODUCTOS.slice(0, 4);
  locales = computed(() => LOCALES);

  pilares = [
    {
      titulo: 'Atención personalizada',
      texto: 'Consulta por WhatsApp y recibe orientación sobre el tratamiento que buscas.'
    },
    {
      titulo: 'Tecnología certificada',
      texto: 'Equipos de aparatología de última generación con mantenimiento y protocolos verificados.'
    },
    {
      titulo: 'Equipo capacitado',
      texto: 'Atención en cabina con protocolos estéticos y orientación antes del tratamiento.'
    },
    {
      titulo: 'Cuidado post sesión',
      texto: 'Recomendaciones para cuidar tu piel y mantener tus resultados después de la visita.'
    }
  ];

  pasos = [
    { n: '01', titulo: 'Explora tratamientos', texto: 'Revisa tratamientos faciales, corporales, promociones y productos disponibles.' },
    { n: '02', titulo: 'Consulta por WhatsApp', texto: 'Escríbenos indicando el tratamiento o producto que te interesa.' },
    { n: '03', titulo: 'Coordina tu visita', texto: 'El equipo te confirma disponibilidad, sede y recomendaciones antes de atenderte.' },
    { n: '04', titulo: 'Visita el local', texto: 'Acércate a la sede acordada para tu atención o para recoger tus productos.' }
  ];

  testimonios = [
    {
      texto: 'Llegué con manchas y marcas de acné. Después de tres sesiones mi piel cambió por completo y me explicaron todo el proceso con claridad.',
      autor: 'Rosa H.',
      detalle: 'Peeling facial · Sede Las Flores 1522'
    },
    {
      texto: 'El HIFU me dio el efecto lifting que buscaba sin cirugía. La atención fue puntual y muy profesional.',
      autor: 'Verónica A.',
      detalle: 'HIFU 25D · Sede Las Flores 1522'
    },
    {
      texto: 'Reservé desde el celular en dos minutos y me llegó la confirmación al instante. Excelente organización.',
      autor: 'Fiorella C.',
      detalle: 'Limpieza facial profunda · Sede Las Flores 1544'
    }
  ];
}
