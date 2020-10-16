import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  //Cliente é uma lista de cliente
  lista : Cliente[] = [];//declarei que inciará vazio

  //tudo que eu usar de fora para dentro do CODIGO geralmente é um serviço
  //esse serviço tem q ser injetado dentro do constructor, ou seja dentro dos parenteses
  //Dentro das chaves ({}) irá colocar tudo que for inicializado antes de carregar a página
  // {} = antes de inicializar a pagina 
  constructor(private clienteServ : ClienteService) { }

  //ngOnInit() -> carrega os componentes assim que a página for carregada
  ngOnInit() {// os cliente precisam estar aqui antes da pagina carregar 
    this.clienteServ.listaDeClientes().subscribe(response=>{
   //this.clienteServ.listaDeClientes() -> chamei a lista de clientes 
   //o ListaDeClientes é um OBSERVABLE dessa forma retorna um subscribe
   //Esse é o comando que irá aguardar a resposta do servidor
      
    //se o servidor responder ele fazer isso aqui
    console.log(response);//isso serve para ver se o problema é aqui, se houver algum erro aparecera aq
    //solicitando uma resposta do servidor
    
    this.lista = response;
    console.log(this.lista);
  
  
  },err=>{
  //o lista de cliente retorna observable 
})
}

}
