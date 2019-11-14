export class LocationModel {
  constructor(
    public city: string,
    public country: string,
    public street: string,
    public region?: string,
    public zip?: string
  ) {
  }
}
