import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { Heroe } from '../../interfaces/heroes-response.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  private _termino: string = '';
  private _filteredOptions!: Observable<string[]>;
  private _heroes: Heroe[] = [];
  private option!: Heroe;
  private _heroeSelecionado!: Heroe | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  public get termino(): string {
    return this._termino;
  }

  public set termino(value: string) {
    this._termino = value;
  }

  public get filteredOptions(): Observable<string[]> {
    return this._filteredOptions;
  }

  public get heroes(): Heroe[] {
    return this._heroes;
  }

  public set heroes(value: Heroe[]) {
    this._heroes = value;
  }

  public get heroeSeleccionado(): Heroe | undefined {
    return this._heroeSelecionado;
  }

  public set heroeSeleccionado(value: Heroe | undefined) {
    this._heroeSelecionado = value;
  }

  public buscando(): void {
    if (this.termino.trim().length != 0){
      this.heroesService
        .getSuggestions(this.termino)
          .subscribe((resp) => {
            this.heroes = resp;
          }
        );
    }else{
      this.heroes = [];
      return;
    }
  }

  /**
   * Esta función es utilizada para desplegar el héroe seleccionado en nuestro input!
   */
  public opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if(!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    };
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    this.heroesService
      .getHeroeById(heroe.id!)
      .subscribe((heroe) => (this.heroeSeleccionado = heroe));
  }
}
