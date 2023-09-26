import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerFilter',
  pure:false
})
export class CustomerPipe implements PipeTransform {

  transform(value: any, filterValue: string): any {
    if (value == '' || value == undefined) {
      return value;
    }
    return value.filter(item => item.deleted_at == filterValue)
  }

}
