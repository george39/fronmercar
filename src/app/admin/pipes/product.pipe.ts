import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productos'
})
export class ProductPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if (term === undefined) {
      return items;
    }

    return items.filter(function(item) {
      return item.code.toLowerCase().includes(term.toLowerCase());
    });
  }

}
