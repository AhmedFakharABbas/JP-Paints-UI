import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter',
  pure: false
})
export class CustomFilterPipe implements PipeTransform {
  


  transform(value: any, filterValue: any, propName1: string, propName2: string): any {
    if (value == undefined || (filterValue == undefined || filterValue == '' && filterValue != 0) || (value != undefined && value.length == 0)) {
      return value;
  }
    return value.filter(item => item[propName1].some(item2 => item2[propName2] == filterValue));
  }

}
