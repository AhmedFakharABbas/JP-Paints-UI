import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter',
  pure: false
})
export class ArrayFilterPipe implements PipeTransform {

  transform(value: Array<any>, filterValue: Array<any>, propName1: string, propName2: string) {
    if (value == undefined || (value != undefined && value.length == 0)) 
    {
        return value;
    }
    if (filterValue == undefined || (filterValue != undefined && filterValue.length == 0)) 
    {
        return value;
    }
    return value.filter(item1 => filterValue.some(item2 => item2[propName2] == item1[propName1]));
  }
}
