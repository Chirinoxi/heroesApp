import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes-response.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
      }
    `
  ],
})
export class AgregarComponent implements OnInit {
  private _rutaActiva!: string;

  private _publicadores = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  private _heroe: Heroe = {
    id: '',
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.url
      .subscribe((item) => {
        this.rutaActiva = item[0].path;
        // Si nuestra ruta activa es editar, cargamos los datos del héroe !
        if (this.rutaActiva == 'editar'){
          const heroeId = item[1].path;
          this.heroesService.getHeroeById(heroeId)
            .subscribe( heroe => this.heroe = heroe);
        }
      }
    );
  }

  public get rutaActiva(): string {
    return this._rutaActiva;
  }

  public set rutaActiva(value: string) {
    this._rutaActiva = value;
  }

  public get publicadores() {
    return this._publicadores;
  }

  public set publicadores(value) {
    this._publicadores = value;
  }

  public get heroe(): Heroe {
    return this._heroe;
  }

  public set heroe(value: Heroe) {
    this._heroe = value;
  }

  public guardarHeroe(): void {
    if (this.heroe.superhero.trim().length == 0) return;

    if (this.heroe.id == ''){
      // Agregar heroe
      this.heroesService.insertHeroe(this.heroe)
        .subscribe((heroe) => {
          console.log('heroe:', heroe);
          this.router.navigate(['/heroes/editar', heroe.id]);
        }
      );
    } else {
      // Editar Heroe
      this.heroesService.updateHeroe(this.heroe)
        .subscribe( (heroe) => {
          this.router.navigate(['/heroes', heroe.id]);
        }
      );
    }
  }
}
