import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalResponseModel } from '../models/rentalResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44333/api/rentals";

  constructor(private httpClient : HttpClient) { }

  getRentals():Observable<RentalResponseModel>{
    let newPath = this.apiUrl + '/getrentaldetails'
    return this.httpClient.get<RentalResponseModel>(newPath);
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + '/add'
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }

  getRentals2():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + '/getall'
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  getRentalById(rentalId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + '/getrentaldetailsbyid?id=' + rentalId 
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }
  
}
