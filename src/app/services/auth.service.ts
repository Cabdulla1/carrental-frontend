import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44333/api/auth/';
  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel) {
    let newPath = this.apiUrl + 'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, loginModel);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  register(registerModel:RegisterModel){
    let newPath = this.apiUrl + 'register'
    return this.httpClient.post<SingleResponseModel<RegisterModel>>(newPath,registerModel)
  }
}
