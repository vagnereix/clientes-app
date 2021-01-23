import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../ServicoPrestado';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: ServicoPrestado;
  success: boolean = false;
  successUpdate: boolean = false;
  errors: string[] = [];
  

  constructor(
    private service: ServicoPrestadoService,
    private clienteService: ClientesService,
    private router: Router
  ) {
    this.servico = new ServicoPrestado();
   }

  ngOnInit(): void {
    this.clienteService
    .getClientes()
    .subscribe(response => this.clientes = response);
  }

  onSubmit(){
      this.service.salvar(this.servico)
      .subscribe(
        response => {
          this.success = true;
          this.servico = new ServicoPrestado();
        },
        errorResponse => {
          this.errors = errorResponse.error.errors;
          this.success = false;
        });
  }

  voltarParaLista(){
    this.router.navigate(['/servico-prestado/lista']);
  }

}
