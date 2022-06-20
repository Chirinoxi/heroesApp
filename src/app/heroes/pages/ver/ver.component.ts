import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes-response.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class VerComponent implements OnInit {
  private _heroeId!: string;
  private _heroe!: Heroe;

  constructor(
    private route: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap(({ id }) => this.heroeService.getHeroeById(id)))
      .subscribe((heroe) => {
        this.heroe = heroe;
      });
  }

  public get heroe(): Heroe {
    return this._heroe;
  }

  public set heroe(value: Heroe) {
    this._heroe = value;
  }

  public get heroeId(): string {
    return this._heroeId;
  }

  public set heroeId(value: string) {
    this._heroeId = value;
  }

  public regresar(): void {
    this.router.navigate(['/heroes/listado']);
  }
}
