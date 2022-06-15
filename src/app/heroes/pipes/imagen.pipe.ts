import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes-response.interface';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe, ...args: unknown[]): string {
    const { id } = heroe;
    let imagePath: string = '';
    if (id?.trim().length != 0) {
      imagePath = `../../../assets/heroes/${id}.jpg`;
    } else {
      imagePath = '../../../assets/no-image.png';
    }
    return imagePath;
  }
}
