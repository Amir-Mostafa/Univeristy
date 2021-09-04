import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var particlesJS: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {


  public loading = false;
  
  signin=new FormGroup({
    
    "userName":new FormControl(null,Validators.required),
    "password":new FormControl(null,Validators.required)
  });

  constructor(private auth:AuthService,private router:Router,private toastr: ToastrService
    ) { 
    
    

  }
  formData()
  {
    if(this.signin.valid)
    {
      
      this.loading=true;
      let data=
      {
        "userName":this.signin.controls["userName"].value,
        "Password":this.signin.controls["password"].value
      }
      this.auth.signin(data).subscribe((data)=>{
        console.log(data);
        if(data.token!=null)
        {
          localStorage.setItem("token",data.token);
          localStorage.setItem("type",data.type);
          
          if(this.auth.AdminLogin())
          {
         this.toastr.success('Login Successfully');
          this.router.navigate(["/home"]);
          }
          else if(this.auth.User_login())
          {
            this.toastr.success('Login Successfully');
            this.router.navigate(["/apply"]);
          }
          else
          {
            
          }
        
        }
        else
        {
          // this.loading=true;
          // if(data.error!=null)
          // this.toastr.error(data.error);
          // if(data.email!=null)
          this.toastr.error(data.message);
         
           this.loading=false;
        }
        
      });
    }
    else 
    {
      console.log("error");
    }
  }
  ngOnInit(): void {
    // particlesJS.load('particles-js', 'assets/data/particles.json', function() { console.log('callback - particles.js config loaded'); });
    particlesJS.load('particles-js', 'assets/data/particles.json', function() { console.log('callback - particles.js config loaded'); });
  }

}
