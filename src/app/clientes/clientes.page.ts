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


  constructor(private clienteServ : ClienteService) { }

  ngOnInit() {// os cliente precisam estar aqui antes da pagina aparecer 
    this.clienteServ.listaDeClientes().subscribe(response=>{
    //se o servidor responder ele fazer isso aqui
    console.log(response);//isso serve para ver se o problema é aqui, se houver algum erro aparecera aq
    this.lista = response;
    console.log(this.lista);
  
  
  },err=>{
  //o lista de cliente retorna observable 
})
}

}
