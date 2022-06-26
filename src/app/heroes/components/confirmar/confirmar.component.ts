import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Heroe } from '../../interfaces/heroes-response.interface'

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe
  ) { }

  ngOnInit(): void {
  }

  /**
   * Cerramos nuestro objeto MatDialog
   */
  public cerrar(): void {
    this.dialogRef.close(false);
    return
  }

  /**
   * Esta función retorna true en caso de que se desee eliminar un registro.
   * 
   * @returns empty
   */
  public borrar (): void {
    this.dialogRef.close(true);
    return
  }

}
