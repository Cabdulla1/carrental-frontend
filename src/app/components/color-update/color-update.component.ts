import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {

  color: Color[] = [];
  colorUpdateForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createColorUpdateForm();
    this.activatedRoute.params.subscribe(params=>{
      if(params["colorId"]){
        this.getById(params["colorId"])
      }
    })
  }


  getById(id:number){
    this.colorService.getColorById(id).subscribe(response=>{
      this.color = response.data
    })
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorName:['',Validators.required]
    })
  }

  update(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({},this.colorUpdateForm.value)
      colorModel.id = this.color[0].id
      this.colorService.update(colorModel).subscribe(response=>{
        this.toastrService.success(response.message)
      },
      (responseError=>{
        console.log(responseError.error)
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage);
          }
        }
      }))
    }else{
      this.toastrService.error('Formunuz Eksik','Dikkat')
    }
  }
}
