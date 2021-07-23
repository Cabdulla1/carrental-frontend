import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private authService:AuthService,
    private activatedRoute:ActivatedRoute,
    private userService:UserService,
    ) { }


  currentUser:User

  ngOnInit(): void {

    this.isAuthenticated();
    if(localStorage.getItem("userId")){
      this.getUserById(Number(localStorage.getItem("userId")))
    }
  }


  isAuthenticated(){
    return this.authService.isAuthenticated()
  }
  
  getUserById(id:number){
    this.userService.getById(id).subscribe(response=>{
      this.currentUser = response.data
    })    
  }

  clearLocalStorage(){
    localStorage.clear();
  }

}
