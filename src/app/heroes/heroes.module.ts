import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { VerComponent } from './pages/ver/ver.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';



@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    VerComponent,
    HomeComponent,
    ListadoComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HeroesModule { }
