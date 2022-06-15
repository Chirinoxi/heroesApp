import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    VerComponent,
    HomeComponent,
    ListadoComponent,
    HeroeCardComponent,
    ImagenPipe,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HeroesRoutingModule,
    MaterialModule,
  ],
})
export class HeroesModule {}
