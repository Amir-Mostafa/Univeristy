import { ApplicationService } from './../../../services/application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.component.html',
  styleUrls: ['./admissions.component.scss']
})
export class AdmissionsComponent implements OnInit {

  public loading = false;
  notAllow:any[];
  Allow:any[];
  exam_id:any;
  token:any;
  decoded:any;
  constructor(private application:ApplicationService, private toastr: ToastrService,public route:Router,private active:ActivatedRoute) {
    try
    {
      this.token = localStorage.getItem("token");
     this.decoded = jwt_decode(this.token);
    }
    catch
    {
      localStorage.clear();
      this.route.navigate(["/login"]);
    }
    this.getData()

  }


  getData()
  {
   let data=
   {
     "token":this.token
   }
   this.loading=true;
   this.application.getApplications(data).subscribe((data)=>{      
     console.log(data)
     this.Allow=data.allowed;
     this.notAllow=data.notAllowed;
     this.loading=false
   });
  }

  ngOnInit(): void {
  }
  deleteUser(id)
  {
    let data=
    {
      "token":this.token,
      "id":id
    }
    this.loading=true
    this.application.delete(data).subscribe((data)=>{
      console.log(data);
      this.getData();
      this.loading=false
    });
  }
  approve(id)
  {
    let data=
    {
      "token":this.token,
      "id":id
    }
    this.loading=true
    this.application.approve(data).subscribe((data)=>{
      console.log(data);
      this.getData();
      this.loading=false
    });
  }
  disApprove(id)
  {
    let data=
    {
      "token":this.token,
      "id":id
    }
    this.loading=true
    this.application.disApprove(data).subscribe((data)=>{
      console.log(data);
      this.getData();
      this.loading=false
    });
  }

}
