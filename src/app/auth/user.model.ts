export class User {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    private registration_date: string
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
