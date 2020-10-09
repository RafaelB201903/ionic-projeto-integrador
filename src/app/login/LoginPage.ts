import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, MenuController } from '@ionic/angular';
import { TemplateService } from '../services/template.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {
  //OnInit representa o ciclo de vida de um
  //componente


  //admin2@admin.com
  //123456

  formGroup : FormGroup; //variavel vai armazenar os dados do formulário

//tudo que vem de fora pra dentro do app tem q ser injetado no contrutor
  constructor(
    private formBuilder: FormBuilder,//É o nosso formulario de login (pode ser de cadastro)
    private auth: AngularFireAuth,// autenticador do firebase
    private navCtrl: NavController,//Serve para redirecionar a pagina
    private menuCtrl: MenuController,//Bloquear o menu
    private template: TemplateService //mostrar o carregamento


  ) {//Dentro das chaves vem tudo que é iniciado antes do app
      this.iniciarForm();//dentro do construtor
   }
  
  ngOnInit() {//carrega os componentes assim que a pagina for carregada
   this.menuCtrl.enable(false);
    //quando carregar essa pagina quero q o menu seja desativado
  }

  autenticar() {

    let user = this.formGroup.controls['username'].value;
    let pass = this.formGroup.controls['password'].value;
    
    
    this.template.loading.then(load=>{//autenticando 
      this.auth.signInWithEmailAndPassword(user,pass).then(data=>{//função q ira enviar os dados pro firebase e fará a validação
      
        load.dismiss();
    this.menuCtrl.enable(true);//habilita o menu (á esquerda)
    this.navCtrl.navigateRoot(['clientes']);   //se for iniciada essa linha sucesso, se n 
    }).catch(data=>{ //erro 
    load.dismiss();//encerrando carregamento (lá do template (2000 milisegundos))
    this.template.myAlert("Erro ao atenticar");
    });
    })
    } 

  

 



// o form build
iniciarForm(){//Essa função iniciarizará o formulario (sim o formulario precisar ser incializado)
    this.formGroup= this.formBuilder.group({
    username : ['',[Validators.email] ],//valida se os dados do username é um email
    password: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(16)]]
    })
    }   //maximo de caracteres 
        //minimo de caracteres



}