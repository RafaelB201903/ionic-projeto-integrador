import { TemplateService } from './../services/template.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-clientes-atualizar',
  templateUrl: './clientes-atualizar.page.html',
  styleUrls: ['./clientes-atualizar.page.scss'],
})
export class ClientesAtualizarPage implements OnInit {

  formGroup : FormGroup;
  cliente : Cliente = new Cliente();

  constructor(private clienteServ : ClienteService,
    private route: ActivatedRoute,//para capturar o id daquela rota lá n url
    private navCtrl : NavController,
    private formBuilder : FormBuilder,
    private template : TemplateService) {
      this.iniciarForm();
     }

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
      this.clienteServ.buscaPorId(id).subscribe(response=>{
        
        //para eu armazenar esse cliente primeiro tenho que
        //declarar ele como variavel
        this.cliente = response;//response vai ser o cliente
        //os dados que receber no response vou colocar no cliente
        console.log(this.cliente);

        //acima ele irá buscar o id no servidor, quando terminar eu irei atualizar
        
        
        this.iniciarForm();
        //acima nós ja inicializamos o formulario porém,
        //o servidor trouxe as informações dps de inicializar
        //portant irei inicializar novamente com as informações do banco
      })

    })

  }

  atualizar() {
    //template de carregamento
    this.template.loading.then(load=>{

      load.present();//abre janela no inicio do carregamento

      //quando eu chamo o formGroup.value eles chamam todos esses dados lá de cima
      this.clienteServ.atualizar(this.formGroup.value).subscribe(response => {
        
        console.log("Atualizado com sucesso");

        load.dismiss();//janelinha de carregamento
        this.template.myAlert(response);//response lá do service
        //

        
      },erro => {
        console.log("Erro")

        load.dismiss();
        this.template.myAlert("Erro ao Atualizar");
      })

    })
  }

  iniciarForm() {
    this.formGroup = this.formBuilder.group({
      //aqui dentr vou colocar os campos do formulario
      // campos que preciso no cadastro, id gerado de forma automatica
      id :[this.cliente.id],
      nome: [this.cliente.nome],
      cpf: [this.cliente.cpf],
      endereco: [this.cliente.endereco],
      numero: [this.cliente.numero],
      cidade: [this.cliente.cidade],
      estado: [this.cliente.estado],
      email: [this.cliente.email],
      telefone: [this.cliente.telefone],
    })
  }
}