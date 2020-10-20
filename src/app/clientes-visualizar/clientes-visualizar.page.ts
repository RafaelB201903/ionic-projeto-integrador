import { NavController } from '@ionic/angular';
import { Cliente } from './../model/cliente';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-clientes-visualizar',
  templateUrl: './clientes-visualizar.page.html',
  styleUrls: ['./clientes-visualizar.page.scss'],
})
export class ClientesVisualizarPage implements OnInit {

  cliente : Cliente = new Cliente();

  constructor(private ClienteServ : ClienteService,
    private route: ActivatedRoute,//para capturar o id daquela rota lá n url
    private navCtrl : NavController) { }

  ngOnInit() {
    //primeiro vou capturar com o route
    //this.route.paramMap.subscribe => vai tentar capturar alguma coisa
    //que sera a url lá de cima e no caso eu quero q capture o id da url
    this.route.paramMap.subscribe(url=>{
      //variavel id que vai pegar o id da url
      let id = url.get('id');
      console.log(id);

      //uma vez que eu tenho o id vou fazer uma consulta
      //no servidor utilizando esse id
      //buscaPorId(id) => vou enviar o id
      this.ClienteServ.buscaPorId(id).subscribe(response=>{
        
        //para eu armazenar esse cliente primeiro tenho que
        //declarar ele como variavel
        this.cliente = response;//response vai ser o cliente
        //os dados que receber no response vou colocar no cliente
        console.log(this.cliente);
      
      })

    })

  }//ESSE CODIGO VAI LA N BANCO E PEGA O ID

  atualizar(){
    this.navCtrl.navigateForward(['/clientes-atualizar',this.cliente.id])

  }

  excluir(){
    this.navCtrl.navigateForward(['/clientes-excluir',this.cliente.id])

  }

}
