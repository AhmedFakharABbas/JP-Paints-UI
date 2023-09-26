import { AuthorizeCity } from './authorize-city.model';
import { AuthorizeZipCode } from './authorize-zip-code.model';

export class UserManageAccess {

    id: number;
    estimator_id: number;
    authorizeCityArray: Array<AuthorizeCity>
    authorizeZipCodeArray: Array<AuthorizeZipCode>
}
