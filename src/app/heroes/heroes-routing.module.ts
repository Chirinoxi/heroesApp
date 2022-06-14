import { NgModule } from '@angular/core';
import { ListadoComponent } from './pages/listado/listado.component'
import { AgregarComponent } from './pages/agregar/agregar.component'
import { BuscarComponent } from './pages/buscar/buscar.component'
import { VerComponent } from './pages/ver/ver.component'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
       path: 'listado',
       component: ListadoComponent
      },
      {
        path: 'agregar',
        component: AgregarComponent
       },
       {
        path: 'editar/:id',
        component: AgregarComponent
       },
       {
        path: 'buscar',
        component: BuscarComponent
       },
       {
        path: ':id',
        component: VerComponent
       },
       {
        path: '**',
        redirectTo: 'listado'
       },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
