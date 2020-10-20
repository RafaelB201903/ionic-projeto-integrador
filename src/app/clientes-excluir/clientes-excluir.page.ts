import { TemplateService } from './../services/template.service';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-clientes-excluir',
  templateUrl: './clientes-excluir.page.html',
  styleUrls: ['./clientes-excluir.page.scss'],
})
export class ClientesExcluirPage implements OnInit {


  cliente: Cliente = new Cliente();

  constructor(private clienteServ: ClienteService,
    private route: ActivatedRoute,//para capturar o id daquela rota lá n url
    private navCtrl: NavController,
    private template: TemplateService,
  ) { }

  ngOnInit() {
    //primeiro vou capturar com o route
    //this.route.paramMap.subscribe => vai tentar capturar alguma coisa
    //que sera a url lá de cima e no caso eu quero q capture o id da url
    this.route.paramMap.subscribe(url => {
      //variavel id que vai pegar o id da url
      let id = url.get('id');
      console.log(id);

      //uma vez que eu tenho o id vou fazer uma consulta
      //no servidor utilizando esse id
      //buscaPorId(id) => vou enviar o id
      this.clienteServ.buscaPorId(id).subscribe(response => {

        //para eu armazenar esse cliente primeiro tenho que
        //declarar ele como variavel
        this.cliente = response;//response vai ser o cliente
        //os dados que receber no response vou colocar no cliente
        console.log(this.cliente);

      })

    })

  }

  excluir() {
    //template de carregamento
    this.template.loading.then(load => {

      load.present();//abre janela no inicio do carregamento

      //quando eu chamo o formGroup.value eles chamam todos esses dados lá de cima
      this.clienteServ.excluir(this.cliente).subscribe(response => {



        load.dismiss();//janelinha de carregamento

        //fecha janelinha

        this.navCtrl.navigateForward(['/clientes']);
      }, erro => {


        load.dismiss();
        this.template.myAlert("Erro ao Excluir");
      })

    })
  }
}

