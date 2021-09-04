import { DocumentsComponent } from './components/Admin/documents/documents.component';
import { UserGuard } from './guards/user.guard';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ApplyComponent } from './components/user/apply/apply.component';
import { AdmissionsComponent } from './components/Admin/admissions/admissions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/Admin/home/home.component';

import { AdminComponent } from './components/Admin/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
   {path:"",component:AdminComponent,children: [
    {path:"home",component:HomeComponent,canActivate:[AuthGuard]},
    {path:"admissions",component:AdmissionsComponent,canActivate:[AuthGuard]},
    {path:"documents/:id",component:DocumentsComponent,canActivate:[AuthGuard]},
  ],canActivate:[AuthGuard]},
  {path:"apply",component:ApplyComponent,canActivate:[UserGuard]},
  {path:"**",component:NotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
