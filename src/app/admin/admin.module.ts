import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ADMIN_ROUTES } from './admin.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { ArrozComponent } from './components/abarrotes/arroz/arroz.component';
import { ProviderComponent } from './components/provider/provider.component';
import { PanelAdmonComponent } from './components/panel-admon/panel-admon.component';
import { ProductComponent } from './components/product/product.component';
import { AdminGuard } from '../services/admin.guard';
import { ListProviderComponent } from './components/provider/list-provider.component';
import { EditProviderComponent } from './components/provider/edit-provider.component';
import { ListProductComponent } from './components/product/list-product.component';
import { EditProductComponent } from './components/product/edit-product.component';
import { DetailProductComponent } from './components/product/detail-product.component';
import { AddAceiteComponent } from './components/abarrotes/add-aceite.component';
import { EditArrozComponent } from './components/abarrotes/arroz/edit-arroz.component';
import { VentasComponent } from './components/main/ventas.component';
import { ProductPipe } from './pipes/product.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SumarPipe } from './pipes/sumar.pipe';
import { ConsultaVentasComponent } from './components/main/consulta-ventas.component';





@NgModule({
  declarations: [
    MainComponent,
    ArrozComponent,
    ProviderComponent,
    PanelAdmonComponent,
    ProductComponent,
    ListProviderComponent,
    EditProviderComponent,
    ListProductComponent,
    EditProductComponent,
    DetailProductComponent,
    AddAceiteComponent,
    EditArrozComponent,
    VentasComponent,
    ProductPipe,
    SearchPipe,
    SumarPipe,
    ConsultaVentasComponent
  ],
  imports: [
    CommonModule,
    ADMIN_ROUTES,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    MainComponent
  ],
  providers: [AdminGuard]
})
export class AdminModule { }
