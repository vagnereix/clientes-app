import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  errors!: string[];
  cadastrando!: boolean;
  mensagemSucesso!: string;

  constructor(
    private router: Router,
    private service: AuthService) { }

  onSubmit(){
    // console.log(`User: ${this.username}, Pass: ${this.password}`);
    this.service.tentarLogar(this.username, this.password)
        .subscribe(response => {
          console.log(response)
          this.router.navigate(['/home']);
        }, errorResponse => {
          console.log(errorResponse)
          this.errors = ['Usuário e/ou senha incorreto(s).']
          this.mensagemSucesso = ""
        })
  }

  preparaCadastrar(event: any){
    event.preventDefault();
    this.cadastrando = true;
    this.mensagemSucesso = "";
    this.errors = []
    this.username = "";
    this.password = "";
  }

  cancelaCadastro(){
    this.cadastrando = false;
    this.errors = []
    this.username = "";
    this.password = "";
  }

  cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.service.salvar(usuario)
      .subscribe(response => {
        this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login."
        this.cancelaCadastro();
        this.username = "";
        this.password = "";
        this.errors = [];
      }, errorResponse => {
        this.errors = errorResponse.error.errors;
      })
  }

}
