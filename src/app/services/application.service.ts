import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private clint:HttpClient) { }
  saveApplication(data):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',"Bearer "+data.token); // may be localStorage/sessionStorage
    const headers = { headers: header };
    return this.clint.post("https://localhost:44317/api/application", data,headers);
  }
  getApplications(data):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',"Bearer "+data.token); // may be localStorage/sessionStorage
    const headers = { headers: header };
    return this.clint.get("https://localhost:44317/api/application",headers);
    // return this.clint.get("https://localhost:44317/api/application",headers)
    // .pipe(ap(data => {
      
    //   console.log("Here will be return response code Ex :200", data.status)
    //   return data.status
    //     }));
  }
  approve(data):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',"Bearer "+data.token); // may be localStorage/sessionStorage
    const headers = { headers: header };
    return this.clint.get(`https://localhost:44317/api/application/approve/${data.id}`,headers);
  }

  disApprove(data):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',"Bearer "+data.token); // may be localStorage/sessionStorage
    const headers = { headers: header };
    return this.clint.get(`https://localhost:44317/api/application/disApprove/${data.id}`,headers);
  }
  delete(data):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',"Bearer "+data.token); // may be localStorage/sessionStorage
    const headers = { headers: header };
    return this.clint.delete(`https://localhost:44317/api/application/${data.id}`,headers);
  }
  getDocuments(data):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',"Bearer "+data.token); // may be localStorage/sessionStorage
    const headers = { headers: header };
    return this.clint.get(`https://localhost:44317/api/application/documents/${data.id}`,headers);
  }

  getApplication(data):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',"Bearer "+data.token); // may be localStorage/sessionStorage
    const headers = { headers: header };
    return this.clint.get(`https://localhost:44317/api/application/user/${data.id}`,headers);
  }
  updateApplication(data):Observable<any>
  {
    const header = new HttpHeaders().set('Authorization',"Bearer "+data.token); // may be localStorage/sessionStorage
    const headers = { headers: header };
    return this.clint.put("https://localhost:44317/api/application", data,headers);
  }

}
