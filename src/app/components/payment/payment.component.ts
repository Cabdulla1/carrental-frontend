import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private rentalService: RentalService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private paymentService:PaymentService,
    private toastrService:ToastrService
  ) {}

  car: Car[] = [];
  rental: Rental[] = [];
  totalPrice: number;
  creditCardNumber:string;
  payment:Payment;
  paymentSuccess:boolean;

  ngOnInit(): void {
    this.paymentSuccess = false;
    this.activatedRoute.params.subscribe((params) => {
      this.getCar(params['carId']);
      this.getRental(params['rentalId']);
    });
  }
  getRental(id: number) {
    this.rentalService.getRentalById(id).subscribe((response) => {
      this.rental = response.data;
    });
  }
  getCar(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.car = response.data;
    });
  }

  calculateTotalPrice():number{
    let rentDate = new Date(this.rental[0]?.rentDate)
    let returnDate =new Date(this.rental[0]?.returnDate)
    let diff = returnDate.getTime() - rentDate.getTime()
    let msInDay = 1000* 3600*24;
    return (diff/msInDay)*this.car[0]?.dailyPrice
  }
  
  addPayment(payment:Payment){
    if(payment.customerId!=null && payment.creditCardNumber!=null && payment.customerId!=null){
      this.paymentService.addPayment(payment).subscribe(result=>{
        
      });
      this.setPaymentSuccess();
      this.toastrService.success("Odeme işlemi başarıyla tamamlandı");
    }else{
      this.toastrService.error("Hata","Bilgiler tam doldurulmalıdır");
    }
  }

  setPayment(){
    this.payment={
      customerId:this.rental[0]?.customerId,
      totalPrice : this.calculateTotalPrice(),
      creditCardNumber:this.creditCardNumber
    }
  }

  setPaymentSuccess(){
    this.paymentSuccess = true;
  }

}
