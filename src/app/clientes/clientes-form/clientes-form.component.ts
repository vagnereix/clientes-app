import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';

import { Cliente } from "../cliente";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  successUpdate: boolean = false;
  errors: string[] = [];
  id!: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
      this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params = this.activatedRoute.params;

    params.subscribe(urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getClienteByID(this.id)
            .subscribe(
              response => this.cliente = response,
              errorResponse => this.cliente = new Cliente()
            )
        }
    })
  }

  voltarParaListagem(){
    this.router.navigate(['/clientes-lista']);
  }

  onSubmit(){
    if(this.id){
      this.service.atualizar(this.cliente)
      .subscribe(
        responde => {
          this.successUpdate = true;
          this.errors = [];
        }, errorResponse => {
          this.successUpdate = false;
          this.errors = ['Atualização de cliente falhou!'];
        }
      )
    } else {
      this.service.salvar(this.cliente)
      .subscribe(
        response => {
        this.success = true;
        this.errors = [];
        this.cliente = response;
      }, errorResponse => {
        this.errors = errorResponse.error.errors;
        this.success = false;
        ;
      })  
    }  
  }
}

