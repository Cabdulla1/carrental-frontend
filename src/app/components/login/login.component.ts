import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  currentUser:User
  constructor(private formBuilder :FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private userService:UserService
     ) { }

  ngOnInit(): void {
    this.createLoginForm()
  }


  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  login(){
    let loginModel = Object.assign({},this.loginForm.value)
    this.authService.login(loginModel).subscribe(response=>{
      this.toastrService.info(response.message)
      localStorage.setItem("token",response.data.token)
      this.router.navigate(["/"])
      this.userService.getByMail(loginModel.email).subscribe(response=>{
        localStorage.setItem("userId",response.data.id.toString())
      })
    },
    (responseError=>{
      this.toastrService.error(responseError.error)
    }))
  }


  
}
