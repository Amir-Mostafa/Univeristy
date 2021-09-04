import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private clint:HttpClient) { }
  signin(data):Observable<any>
  {
    //const options = {withCredentials: true, 'access-control-allow-origin': "http://localhost:4200/login", 'Content-Type': 'application/json'};
    //testinghub-exams.000webhostapp.com/public/api/user/login
    //https://routeegypt.herokuapp.com/signin
    console.log(data)
    return this.clint.post("https://localhost:44317/api/Authontecation/login", data);
  }
  signup(data):Observable<any>
  {
    return this.clint.post("https://localhost:44317/api/Authontecation/register",data);
  }
  AdminLogin()
  {
    try
    {
      let token = localStorage.getItem("token");
      let decoded:any = jwt_decode(token);
      
      
      if(decoded.type=="admin")
      return true;
      else
      return false;
    }
    catch
    {
      localStorage.clear();
      return false;
    }
    return !!localStorage.getItem("token");
  }
  User_login()
  {
    try
    {
      let token = localStorage.getItem("token");
      
      let decoded:any = jwt_decode(token);
      if(decoded.type=="user")
      return true;
      else
      return false;
    }
    catch
    {
      localStorage.clear();
      return false;
    }
    
  }
  logout()
  {
    localStorage.removeItem("token");
  }
}
