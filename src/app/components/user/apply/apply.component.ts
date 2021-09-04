import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from './../../../services/application.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import multiStepForm from 'angular-multi-step-form';
import jwt_decode from "jwt-decode";

@Component({
  
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

token:any;
decoded:any;
updateId:number=0;
userID:any;
public loading:boolean=false;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup=new FormGroup({
    "birth":new FormControl(null,Validators.required),
    "id":new FormControl(null,Validators.required),
  });
  constructor(private _formBuilder: FormBuilder,public route:Router,public application:ApplicationService,private toastr: ToastrService) {
    try
    {
      this.token = localStorage.getItem("token");
     this.decoded = jwt_decode(this.token);
     this.userID=this.decoded.id;
     console.log(this.decoded)
    }
    catch
    {
      localStorage.clear();
      this.route.navigate(["/login"]);
    }
    let data=
    {
      "id":this.decoded.id,
      "token":this.token
    }
    this.loading=true;
    this.application.getApplication(data).subscribe((data)=>{

      console.log(data)
      if(data.status=="Not Found")
      {

      }
      else
      {
        this.updateId=data.id;
      this.firstFormGroup.controls["name"].setValue(data.name)
      this.firstFormGroup.controls["phone"].setValue(data.phone)
      this.firstFormGroup.controls["cardId"].setValue(data.nationalId)
      this.firstFormGroup.controls["address"].setValue(data.address)
      this.firstFormGroup.controls["date"].setValue(data.date)
      this.firstFormGroup.controls["gender"].setValue(data.gender=='Male'?0:1)
      

      this.secondFormGroup.controls["birth"].setValue({
        filename: data.birthDateURL.filename,
          filetype: data.birthDateURL.filetype,
          value: (<string>data.birthDateURL.value).split(',')[1]
      });

      this.secondFormGroup.controls["id"].setValue({
        filename: data.nationalIdURL.filename,
          filetype: data.nationalIdURL.filetype,
          value: (<string>data.nationalIdURL.value).split(',')[1]
      });
    }
      this.loading=false;
    });
  }
  
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      phone:["",[Validators.pattern(/^01[0125]{1}[0-9]{8}$/),Validators.required]],
      cardId:['', [Validators.required,Validators.pattern(/^[0-9]{14}$/)]],
      address:['', Validators.required],
      date:['', Validators.required],
      gender:['', Validators.required],
      userID:[this.userID, Validators.required],
    });

  }
  
  path(p)
   {
    return "data:image/jpeg;base64,"+p;
  }
  submit(){
      console.log(this.firstFormGroup.value);
      console.log(this.secondFormGroup.value);
      let gender="Male"
      
      if(this.firstFormGroup.controls["gender"].value=="1")
        gender="Female"
      let data=
      {
        
        "token":this.token,
        "name":this.firstFormGroup.controls["name"].value,
        "phone":this.firstFormGroup.controls["phone"].value,
        "nationalId":this.firstFormGroup.controls["cardId"].value,
        "address":this.firstFormGroup.controls["address"].value,
        "date":this.firstFormGroup.controls["date"].value,
        "gender":gender,
        "birthDateImage":this.secondFormGroup.value.birth.filename,
        "nationalIdImage":this.secondFormGroup.value.id.filename,
        "nationalIdURL":this.secondFormGroup.value.id,
        "birthDateURL":this.secondFormGroup.value.birth,
        "approved":0,
        "userID":this.firstFormGroup.controls["userID"].value
      }
      

      console.log(data)
      this.loading=true;
      if(this.updateId==0)
      {
      this.application.saveApplication(data).subscribe((data)=>{
        console.log(data)
        if(data.status=="success")
        {
          this.toastr.success(data.message)
        }
        else
        {
          this.toastr.error(data.message)
        }
        this.loading=false
      });
    }
    else
    {

      let data=
      {
        "id":this.updateId,
        "token":this.token,
        "name":this.firstFormGroup.controls["name"].value,
        "phone":this.firstFormGroup.controls["phone"].value,
        "nationalId":this.firstFormGroup.controls["cardId"].value,
        "address":this.firstFormGroup.controls["address"].value,
        "date":this.firstFormGroup.controls["date"].value,
        "gender":gender,
        "birthDateImage":this.secondFormGroup.value.birth.filename,
        "nationalIdImage":this.secondFormGroup.value.id.filename,
        "nationalIdURL":this.secondFormGroup.value.id,
        "birthDateURL":this.secondFormGroup.value.birth,
        "approved":0,
        "userID":this.firstFormGroup.controls["userID"].value
      }
      
      this.application.updateApplication(data).subscribe((data)=>{
        console.log(data)
        if(data.status=="success")
        {
          this.toastr.info(data.message)
        }
        else
        {
          this.toastr.error(data.message)
        }
        this.loading=false
      });
    }

  }

  onFileChangeBirth(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log(event.target.files)
      reader.readAsDataURL(file);
      reader.onload = () => {
        let data=
        {
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        }
        console.log(data)
        this.secondFormGroup.controls['birth'].setValue(data)
      };
    }
    
    console.log(this.secondFormGroup);
  
  }

  onFileChangeID(event) {
    let reader = new FileReader();
    console.log(event.target.files)
    
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.secondFormGroup.get('id').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }
    
    console.log(this.secondFormGroup);
  
  }
}
