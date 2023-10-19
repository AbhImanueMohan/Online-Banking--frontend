import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes'
})
export class PipesPipe implements PipeTransform {

  transform(allTransaction:any[],searchTerm:string,propertyName:string): any[] {
    const result:any[]=[]
    //transformed output
    if(!allTransaction||searchTerm==''||propertyName==''){
      return allTransaction;
    }
    //if there is any value in search term
    allTransaction.forEach((item:any)=>{
      if(item[propertyName].toLowerCase().includes(searchTerm.toLowerCase())){
        result.push(item);
      }
    })
    return result;
  }

}
