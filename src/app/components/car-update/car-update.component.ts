import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car: Car[] = [];
  carUpdateForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.createCarUpdateForm();
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarById(params["carId"])
      }
    })
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      brandId:['',Validators.required],
      colorId:['',Validators.required],
      carName:['',Validators.required],
      modelYear:['',Validators.required],
      dailyPrice:['',Validators.required],
      description:['',Validators.required]
    })
  }

  getCarById(id:number){
    this.carService.getCarDetailsById(id).subscribe(response=>{
      this.car = response.data
    })
  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value)
      carModel.id = this.car[0].id
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message)
      },
      (responseError=>{ 
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
          }
        }
      }))
    }else{
      this.toastrService.error('Formunuz Eksik','Dikkat')
    }
  }

}
