import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { SidebarComponent } from '../components/shared/sidebar/sidebar.component';
import { ProviderComponent } from './components/provider/provider.component';
import { PanelAdmonComponent } from './components/panel-admon/panel-admon.component';
import { ProductComponent } from './components/product/product.component';
import { AdminGuard } from '../services/admin.guard';
import { ListProviderComponent } from './components/provider/list-provider.component';
import { EditProviderComponent } from './components/provider/edit-provider.component';
import { ListProductComponent } from './components/product/list-product.component';
import { EditProductComponent } from './components/product/edit-product.component';
import { DetailProductComponent } from './components/product/detail-product.component';
import { ArrozComponent } from './components/abarrotes/arroz/arroz.component';
import { AddAceiteComponent } from './components/abarrotes/add-aceite.component';
import { EditArrozComponent } from './components/abarrotes/arroz/edit-arroz.component';
import { VentasComponent } from './components/main/ventas.component';
import { ConsultaVentasComponent } from './components/main/consulta-ventas.component';



const adminRoutes: Routes = [
    {
        path: 'admon',
        component: MainComponent,
        canActivate: [AdminGuard],
        children: [
            {path: '', redirectTo: 'ventas', pathMatch: 'full'},
           // {path: 'panel', component: PanelAdmonComponent},
           {path: 'crear-proveedor', component: ProviderComponent},
           {path: 'listar-proveedores', component: ListProviderComponent},
           {path: 'editar-proveedor/:id', component: EditProviderComponent},
           {path: 'crear-producto', component: ProductComponent},
           {path: 'listar-productos', component: ListProductComponent},
           {path: 'editar-producto/:id', component: EditProductComponent},
           {path: 'detalles-producto/:id', component: DetailProductComponent},
           {path: 'crear-arroz', component: ArrozComponent},
           {path: 'editar-arroz', component: EditArrozComponent},
           {path: 'crear-aceite', component: AddAceiteComponent},
           {path: 'ventas', component: VentasComponent},
           {path: 'consulta-ventas', component: ConsultaVentasComponent},

           // { path: 'abarrotes', component: MainComponent }
        ]
    }
];

export const ADMIN_ROUTES = RouterModule.forChild(adminRoutes);