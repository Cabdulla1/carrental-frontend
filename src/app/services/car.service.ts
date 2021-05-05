import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarResponseModel } from '../models/carResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl ="https://localhost:44333/api/";
  constructor(private httpClient : HttpClient) { }


  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getcardetailsbybrand?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getcardetailsbycolor?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailsById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getcardetailsbyid?carId='+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailsByBrandAndColor(brandId:number,colorId:number){
    let newPath = this.apiUrl + 'cars/getcardetailsbybrandandcolor?brandId='+ brandId + '&colorId=' + colorId; 
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
