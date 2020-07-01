import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../../services/venta.service';
import { Venta } from '../../../models/venta';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-consulta-ventas',
  templateUrl: './consulta-ventas.component.html',
  styleUrls: ['./consulta-ventas.component.css']
})
export class ConsultaVentasComponent implements OnInit {

  public title: string;
  public venta: Venta;
  public token;
  public fecha;
  public fecha2;

  public a = document.getElementById('start');
  

  constructor(
    private consultaVenstasService: VentaService,
    private userserVice: UserService
  ) {
    this.token = userserVice.getToken();
    this.title = 'Consultar las ventas por fecha';
   }

  ngOnInit(): void {
    this.getVentas();
  }


  


  getVentas() {
    this.consultaVenstasService.getVentas(this.token).subscribe(
      response => {
        this.venta = response.venta;
        console.log('ventas', this.fecha);
      },
      error => {
        console.log(error as any);
      }
    );
  }

}
