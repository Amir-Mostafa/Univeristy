import { logging } from 'protractor';
import { ApplicationService } from './../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  token:any;
  decoded:any;
  birth:any;
  nationalId:any;
  loading:boolean=false;
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

    let data=
    {
      "id":this.active.snapshot.paramMap.get("id"),
      "token":this.token
    }
    this.loading=true;
    this.application.getDocuments(data).subscribe((data)=>{
      console.log(data);
      this.loading=false
      this.birth=data[0];
      this.nationalId=data[1];
    })
  }

  ngOnInit(): void {
  }

}
