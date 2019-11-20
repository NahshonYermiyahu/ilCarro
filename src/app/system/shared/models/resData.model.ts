import {CarModel} from './car.model';

export class ResDataModel {
  constructor(
  public current_page: number,
  public items_on_page: number,
  public items_total: number,
  public cars: [CarModel]
  ){}
}
