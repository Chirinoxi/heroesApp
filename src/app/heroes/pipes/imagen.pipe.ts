import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes-response.interface';

@Pipe({
  name: 'imagen',
  // pure: false
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe, ...args: unknown[]): string {
    // console.log('¡Pipe imagen se proceso!');
    const { id } = heroe;
    let imagePath: string = '';
    if (heroe.alt_img && heroe.alt_img.trim().length != 0) {
      imagePath = `${heroe.alt_img}`;
    } else if (id && id.trim().length != 0){
      imagePath = `../../../assets/heroes/${id}.jpg`;
    } else {
      imagePath = '../../../assets/no-image.png';
    }
    return imagePath;
  }
}
