import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SectionComponent } from './components/shared/section/section.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavAbarrotesComponent } from './components/shared/sidebar/nav-abarrotes/nav-abarrotes.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ArrozComponent } from './admin/components/abarrotes/arroz.component';
import { AceiteComponent } from './admin/components/abarrotes/aceite.component';




const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'abarrotes', component: NavAbarrotesComponent},
    {path: 'actualizar-datos', component: UserEditComponent},
    {path: 'arroz', component: ArrozComponent},
    {path: 'aceite', component: AceiteComponent},
    {path: 'login', redirectTo: '/', pathMatch: 'full'},
    {path: '**', component: HomeComponent}
];




export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);