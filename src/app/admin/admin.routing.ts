import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { SidebarComponent } from '../components/shared/sidebar/sidebar.component';
import { ProviderComponent } from './components/provider/provider.component';
import { PanelAdmonComponent } from './components/panel-admon/panel-admon.component';
import { ProductComponent } from './components/product/product.component';
import { AdminGuard } from '../services/admin.guard';



const adminRoutes: Routes = [
    {
        path: 'admon',
        component: MainComponent,
        canActivate: [AdminGuard],
        children: [
            {path: '', redirectTo: 'crear-proveedor', pathMatch: 'full'},
           //{path: 'panel', component: PanelAdmonComponent},
           {path: 'crear-proveedor', component: ProviderComponent},
           {path: 'crear-producto', component: ProductComponent}

           // { path: 'abarrotes', component: MainComponent }
        ]
    }
];

export const ADMIN_ROUTES = RouterModule.forChild(adminRoutes);