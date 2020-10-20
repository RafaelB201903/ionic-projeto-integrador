import { TemplateService } from './../services/template.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';



@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.page.html',
  styleUrls: ['./cliente-novo.page.scss'],
})
export class ClienteNovoPage implements OnInit {

  //como é um formulario tenho na minha cabeça que tenho q usar
  //o form group
  formGroup: FormGroup;
  //tenho q declarar também no modulo da pagina
  //temos que declarar no modulo da pagina n esqueça
  //qnd coloco aq o form grupo tenho q colocar no construtor
  //toda vez temos que iniciar o formulario (iniciaremos
  //dentro das chaves pois ele é um metodo)

  constructor(private formBuilder: FormBuilder,// do formgroup
    private template: TemplateService,
    private clienteServ : ClienteService) //mensagem do usuario
    { //tenho que chamar o formulario aq
      this.iniciarForm();
    }

    //() => classe // {} => metodo

  ngOnInit() {
  }

  //quando trabalhamos com formgroup temos que iniciar o formulario
  
  iniciarForm() {
    this.formGroup = this.formBuilder.group({
      //aqui dentr vou colocar os campos do formulario
      // campos que preciso no cadastro, id gerado de forma automatica
      nome: [],
      cpf: [],
      endereco: [],
      numero: [],
      cidade: [],
      estado: [],
      email: [],
      telefone: [],
    })//NAO ESTOU FAZENDO VALIDAÇÃO OU SEJA SE ESQUECERMOS UM 
    //REGISTRO ELE N DARÁ ERRO (O FIREBASE)
  }



  cadastrar() {
    //template de carregamento
    this.template.loading.then(load=>{

      load.present();//abre janela no inicio do carregamento

      //quando eu chamo o formGroup.value eles chamam todos esses dados lá de cima
      this.clienteServ.cadastrar(this.formGroup.value).subscribe(response => {
        
        console.log("Cadastrado com sucesso");

        load.dismiss();//janelinha de carregamento
        this.template.myAlert(response);//response lá do service
        //

        
      },erro => {
        console.log("Erro")

        load.dismiss();
        this.template.myAlert("Erro ao Cadastrar");
      })

    })
  }
}
