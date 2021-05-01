import { Pipe, PipeTransform } from '@angular/core';
import {ImagesModel} from '../models/images-model';
@Pipe({
  name: 'imgFilter'
})
export class ImgFilterPipe implements PipeTransform {

  transform(value: ImagesModel[], args: string): ImagesModel[] {
    if (!value || args == undefined || !args) {
      return value;
    }
    args = args.toLowerCase();
    return value.filter(x => x.tags.find(y => y.startsWith(args) || y.endsWith(args) || y === args));
  }

}
