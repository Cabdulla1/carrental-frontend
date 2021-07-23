import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder,FormGroup,FormControl,Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm:FormGroup;
  constructor(private authService:AuthService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({},this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.success(response.message)
        this.toastrService.success("Kayıt Başarılı")
        this.router.navigate(["login"])
      },
      (responseError=>{
        this.toastrService.error(responseError.error)
      }))
    }else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }


}
