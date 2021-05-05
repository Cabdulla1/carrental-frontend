import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImages } from 'src/app/models/carImages';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car:Car[]=[]
  currentRental:Rental[]=[]
  carImages:CarImages[]
  currentCar:Car
  currentCustomerId:string
  rentDate:string
  returnDate:string
  rental:Rental
  customers:Customer[]
  result:any
  rentalSuccess:boolean
  url : "https://localhost:44333"

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private customerService:CustomerService,
    private rentalService:RentalService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    
    console.log(this.currentRental)
    this.rentalSuccess = false;
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsById(params["carId"]);
      }
    })
    this.getCustomers();
    
  }


  getCarDetailsById(carId:number){
    this.carService.getCarDetailsById(carId).subscribe(response=>{
      this.car = response.data;
      this.carImages = this.car[0].carImages;
    })
  }

  setCurrentCar(){
    this.currentCar = this.car[0];
  }
  
  setCurrentRental(){
       this.rental = {
       id:0,
       carId:this.car[0].id,
       customerId: parseInt(this.currentCustomerId), 
       customer:"",
       brandName:"",
       rentDate:new Date(this.rentDate),
       returnDate:new Date(this.returnDate)
    }
    /* let rentalRentDate = new Date(this.rentDate)
    this.rental.rentDate = rentalRentDate
    let rentalReturnDate = new Date(this.returnDate)
    this.rental.returnDate = rentalRentDate
    this.rental.customerId = this.currentCustomerId */
  }


  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      this.customers = response.data
    })
  }

  addRental(){
    if(this.rentDate!=null && this.returnDate!=null){
      this.rentalService.addRental(this.rental).subscribe(result=>{
        if(result.success===true){
          this.toastrService.success(result.message)
          this.getCurrentRental()
          this.checkRentalSuccess();
        }else{
          this.toastrService.error(result.message)
          
        }
      })
    }else{
      this.toastrService.error("Kiralama bilgileri tam doldurulmalıdır.Lütfen tarih bilgilerini seçiniz")
    }
  }

  checkRentalSuccess(){
    this.rentalSuccess = true;
  }

  getCurrentRental(){
    this.rentalService.getRentals2().subscribe(response=>{
      this.currentRental = response.data
    })
    
  }

}
