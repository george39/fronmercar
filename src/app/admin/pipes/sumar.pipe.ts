import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumar'
})
export class SumarPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //Order ascendente
        let newVal = value.sort((a: any, b: any) => {
            let date1 = new Date(a.date);
            let date2 = new Date(b.date);
        
            if (date1 > date2) {
                return 1;
            } else if (date1 < date2) {
                return -1;
            } else {
                return 0;
            }
        });
        
        return newVal;

//Order descendente
    //     let newVal = value.sort((a: any, b: any) => {
    //         let date1 = new Date(a.date);
    //         let date2 = new Date(b.date);

    //         if (date2 > date1) {
    //             return 1;
    //         } else if (date2 < date1) {
    //             return -1;
    //         } else {
    //             return 0;
    //         }
    //     });

    //     return newVal;
    // }

}
}
