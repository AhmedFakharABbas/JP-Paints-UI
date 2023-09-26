import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idFilter',
  pure: false
})
export class IdFilterPipe implements PipeTransform {

  transform(value: any, filterValue: string): any {
    if(value == '' || value == undefined)
    {
      return value;
    }
    return value.filter(item => item == filterValue)
  }

}
