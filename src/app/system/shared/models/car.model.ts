import {Pick_up_placeModel} from './pick_up_place.model';
import {OwnerModel} from './owner.model';

export class CarModel {
  constructor(
    public serial_number: string,
    public make: string,
    public model: string,
    public year: string,
    public engine: string,
    public fuel: string,
    public gear: string,
    public wheels_drive: string,
    public doors: number,
    public seats: number,
    public fuel_consumption: number,
    public features: [],
    public car_class: string,
    public price_per_day: number,
    public distance_included: number,
    public about: string,
    public pick_up_place?: Pick_up_placeModel,
    public image_url?: [string, string],
    public owner?: OwnerModel,
    public booked_periods?: [{ end_date_time: string; start_date_time: string }]
  ) {}
}
