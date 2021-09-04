import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/Admin/admin/admin.component';
import { NavbarComponent } from './components/Admin/navbar/navbar.component';
import { SidebarComponent } from './components/Admin/sidebar/sidebar.component';
import { ContentComponent } from './components/Admin/content/content.component';
import { HomeComponent } from './components/Admin/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdmissionsComponent } from './components/Admin/admissions/admissions.component';
import { ApplyComponent } from './components/user/apply/apply.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { DocumentsComponent } from './components/Admin/documents/documents.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    HomeComponent,
    NotFoundComponent,
    AdmissionsComponent,
    ApplyComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    DocumentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    ,FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
