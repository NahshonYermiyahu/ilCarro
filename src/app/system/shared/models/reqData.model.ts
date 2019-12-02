export class ReqDataModel {
  constructor(
    public city: string,
    public start_date: string,
    public end_date: string,
    public min_amount: number,
    public max_amount: number,
    public ascending?: boolean,
    public items_on_page?: number,
    public current_page?: number
  ){}
}
