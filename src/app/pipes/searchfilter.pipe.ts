import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      query = query.toLowerCase();
      let intquery = +query;
      return _.filter(array, row =>
        (row.first_name != null && row.first_name.toLowerCase().indexOf(query) > -1)
        || (row.last_name != null && row.last_name.toLowerCase().indexOf(query) > -1)
        || (row.phone_no != null && row.phone_no.indexOf(query) > -1)
        || (row.email != null && row.email.indexOf(query) > -1)
        || (row.address_1 != null && row.address_1.toLowerCase().indexOf(query) > -1)
        || (row.address_2 != null && row.address_2.toLowerCase().indexOf(query) > -1)
        || (row.company != null && row.company.toLowerCase().indexOf(query) > -1)
        || (row.potential_type != null && row.potential_type.toLowerCase().indexOf(query) > -1)
        || (row.state != null && row.state.toLowerCase().indexOf(query) > -1)
        || (row.zip_code != null && row.zip_code.indexOf(query) > -1)
        || (row.subdivision != null && row.subdivision.indexOf(query) > -1)
        || (row.major_intersection != null && row.major_intersection.toLowerCase().indexOf(query) > -1)
        || (row.start_date != null && row.start_date.indexOf(query) > -1)
        || (row.end_date != null && row.end_date.indexOf(query) > -1)
        || (row.city != null && row.city.indexOf(query) > -1)
        || (row.project_type_name != null && row.project_type_name.toLowerCase().indexOf(query) > -1)
        || (row.project_number != null && row.project_number.indexOf(query) > -1)
      );
    }
    return array;
  }

}
