import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userpipes',
  pure: false
})

export class UserpipesPipe implements PipeTransform {
  transform(value: any , filterValue: string): any {
    if(value == '' || value == undefined)
    {
      return value;
    }
    return value.filter(item => item.is_active == filterValue)
  }
}
