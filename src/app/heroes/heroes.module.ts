import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { VerComponent } from './pages/ver/ver.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { HeroeCardComponent } from './components/heroe-card-component/heroe-card.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';

@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    VerComponent,
    HomeComponent,
    ListadoComponent,
    HeroeCardComponent,
    ImagenPipe,
    ConfirmarComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HeroesRoutingModule,
    MaterialModule,
    FormsModule
  ],
})
export class HeroesModule {}
