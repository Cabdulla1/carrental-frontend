import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  user:User
  constructor(private userService:UserService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }


  getUserById(id:number){
    this.userService.getById(id)
  }

  

}
