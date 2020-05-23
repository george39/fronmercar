import { Routes, RouterModule } from '@angular/router';
import { ArrozComponent } from '../../../components/abarrotes/arroz.component';
import { NavAbarrotesComponent } from '../../../components/shared/sidebar/nav-abarrotes/nav-abarrotes.component';
import { AceiteComponent } from '../../../components/abarrotes/aceite.component';






const abarrotesRoutes: Routes = [
    {
        path: 'abarrotes-movil',
        component: NavAbarrotesComponent,
        
        children: [
            {path: '', redirectTo: '', pathMatch: 'full'},
          
           {path: 'arroz-movil', component: ArrozComponent},
           {path: 'aceite-movil', component: AceiteComponent},
           

           // { path: 'abarrotes', component: MainComponent }
        ]
    }
];

export const ABARROTES_ROUTES = RouterModule.forChild(abarrotesRoutes);