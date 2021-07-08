import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-detail',
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.css']
})
export class ColorDetailComponent implements OnInit {

  colors: Color[]; 
  constructor(private formBuilde:FormBuilder,
    private toastrService:ToastrService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.getAll();
  }


  getAll(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

}
