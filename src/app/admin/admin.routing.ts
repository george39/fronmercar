import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { SidebarComponent } from '../components/shared/sidebar/sidebar.component';


const adminRoutes: Routes = [
    {
        path: 'administracion',
        component: MainComponent,
        children: [
            {path: '', redirectTo: 'abarrotes', pathMatch: 'full'},
            {path: 'panel', component: SidebarComponent}
           // { path: 'abarrotes', component: MainComponent }
        ]
    }
];

export const ADMIN_ROUTES = RouterModule.forChild(adminRoutes);