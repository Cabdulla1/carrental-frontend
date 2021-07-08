import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ColorResponseModel } from '../models/colorResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="https://localhost:44333/api/"
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ColorResponseModel>{
    let newPath = this.apiUrl + 'colors/getall'
    return this.httpClient.get<ColorResponseModel>(newPath);
  }

  add(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'colors/add'
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  getColorById(id:number):Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + 'colors/getbyid?id=' + id;
    return this.httpClient.get<ListResponseModel<Color>>(newPath) 
  }

  update(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'colors/update';
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
}
