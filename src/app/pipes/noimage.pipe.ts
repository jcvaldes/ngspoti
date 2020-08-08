import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(images: any[]): string {
     return images.length > 0 ? images[0].url : 'assets/img/noimage.png';
    // if ( !images ) {
    //   return 'assets/img/noimage.png';
    // }

    // if ( images.length > 0 ) {
    //   return images[0].url;
    // } else {
    //   return 'assets/img/noimage.png';
    // }
  }
}
