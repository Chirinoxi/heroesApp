import { Component, OnInit, Pipe } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes-response.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
      }
    `,
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
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((item) => {
      this.rutaActiva = item[0].path;
      // Si nuestra ruta activa es editar, cargamos los datos del héroe !
      if (this.rutaActiva == 'editar') {
        const heroeId = item[1].path;
        this.heroesService
          .getHeroeById(heroeId)
          .subscribe((heroe) => (this.heroe = heroe));
      }
    });
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

    if (this.heroe.id == '') {
      // Agregar heroe
      this.heroesService.insertHeroe(this.heroe).subscribe((heroe) => {
        this.mostrarSnackBar('Registro creado');
        this.router.navigate(['/heroes/editar', heroe.id]);
      });
    } else {
      // Editar Heroe
      this.heroesService.updateHeroe(this.heroe).subscribe((heroe) => {
        this.mostrarSnackBar('Registro actualizado');
        this.router.navigate(['/heroes', heroe.id]);
      });
    }
  }

  public eliminarHeroe(): boolean {
    if (this.heroe.id == undefined) return false;
    try {
      const dialog = this.mostrarDialog();
      // ---------------- FORMA # 1 ----------------
      dialog.afterClosed().subscribe((result) => {
        // console.log('result:', result);
        if (result) {
          this.heroesService.deleteHeroe(this.heroe.id!).subscribe((item) => {
            this.router.navigate(['/heroes/listado']);
            return true;
          });
        }
      });
      // ---------------- TODO: FORMA # 2 ----------------
      // dialog.afterClosed().pipe(
      //   switchMap( (result): any => {
      //     return;
      //   })
      // )
    } catch (error) {
      console.log('error:', error);
    }
    return false;
  }

  public mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 3000,
    });
  }

  public mostrarDialog(): MatDialogRef<ConfirmarComponent> {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      data: { ...this.heroe },
    });

    return dialog;
  }
}
