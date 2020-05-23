import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SectionComponent } from './components/shared/section/section.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavAbarrotesComponent } from './components/shared/sidebar/nav-abarrotes/nav-abarrotes.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

import { AddComponent } from './admin/components/add/add.component';
import { AdminModule } from './admin/admin.module';
import { AbarrotesModule } from './admin/components/abarrotes/abarrotes.module';
import { ArrozComponent } from './components/abarrotes/arroz.component';
import { AceiteComponent } from './components/abarrotes/aceite.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    SectionComponent,
    SidebarComponent,
    HomeComponent,
    NavAbarrotesComponent,
    UserEditComponent,
    
    AddComponent,
    
    ArrozComponent,
    
    AceiteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AbarrotesModule,
    routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
