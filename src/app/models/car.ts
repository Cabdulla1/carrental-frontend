import { CarImages } from "./carImages";

export interface Car{
    id:number,
    brandId:number,
    colorId:number,
    carName:string,
    brandName:string,
    colorName:string,
    dailyPrice:number;
    modelYear:string,
    description:string,
    carImages:CarImages[]
}