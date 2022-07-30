import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postContact(data : any){
    return this.http.post<any>("http://localhost:3000/contactsList", data);

  }

  getProduct(){
    return this.http.get<any>("http://localhost:3000/contactsList");
  }

  putContact(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/contactsList/"+id, data);
  }

  deleteContact(id : number){
    return this.http.delete<any>("http://localhost:3000/contactsList/" +id);
  }
}
