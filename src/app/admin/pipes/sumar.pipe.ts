import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumar'
})
export class SumarPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
