import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./publico/layout/publico-layout.component').then(m => m.PublicoLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./publico/inicio/inicio.component').then(m => m.InicioComponent) },
      { path: 'nosotros', loadComponent: () => import('./publico/nosotros/nosotros.component').then(m => m.NosotrosComponent) },
      { path: 'tratamientos', loadComponent: () => import('./publico/tratamientos/tratamientos.component').then(m => m.TratamientosComponent) },
      { path: 'tratamientos/:id', loadComponent: () => import('./publico/tratamientos/tratamiento-detalle.component').then(m => m.TratamientoDetalleComponent) },
      { path: 'productos', loadComponent: () => import('./publico/productos/productos.component').then(m => m.ProductosComponent) },
      { path: 'productos/:id', loadComponent: () => import('./publico/productos/producto-detalle.component').then(m => m.ProductoDetalleComponent) },
      { path: 'locales', loadComponent: () => import('./publico/locales/locales.component').then(m => m.LocalesComponent) },
      { path: 'contacto', loadComponent: () => import('./publico/contacto/contacto.component').then(m => m.ContactoComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
