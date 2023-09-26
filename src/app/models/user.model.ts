export class User {
  id: number;
  email: string;
  userName: string;
  first_name: string;
  last_name: string;
  password: string;
  commission: string;
  isComissionDisabled: boolean;

  roles: Array<number>;

  constructor() {
    this.isComissionDisabled = true;
    this.roles = new Array<number>();
  }
}
