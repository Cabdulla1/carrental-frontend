import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44333/api/users/";
  
  currentUser:User
  constructor(private httpClient:HttpClient) { }


  getByMail(email:string){
    let newPath = this.apiUrl+'getbymail?email='+email
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  } 

  getById(id:number){
    let newPath = this.apiUrl +'getbyid?id='+id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }

}
