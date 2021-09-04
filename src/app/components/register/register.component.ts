
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var particlesJS: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signUp=new FormGroup({
    "email":new FormControl(null,[Validators.required,Validators.email]),
    "name":new FormControl(null,Validators.required),
    "password":new FormControl(null,[Validators.required,Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}/)]),
    "type":new FormControl("user"),
  });
  public loading = false;
  constructor(private router:Router, private auth:AuthService,private toastr: ToastrService) {
    
   }
  signupData()
  {
    if(this.signUp.valid)
    {
      this.loading=true;
      console.log(this.signUp)
      let data={
        "UserName":this.signUp.controls["name"].value,
        "Email":this.signUp.controls["email"].value,
        "Password":this.signUp.controls["password"].value,
        "type":this.signUp.controls["type"].value,
      }
      this.auth.signup(data).subscribe((data)=>{
        console.log(data)
        if(data.status=="Success")
        {
          this.toastr.success("Registertion Successfully");
          this.router.navigate(["/login"]);
        }
        else
        {
          this.toastr.error(data.message);
          this.loading=false;
        }
      });
    }
  }

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/data/particles.json', function() { console.log('callback - particles.js config loaded'); });
  }

}
