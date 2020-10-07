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

  formGroup : FormGroup; 

//tudo que vem de fora pra dentro do app tem q ser injetado no contrutor
  constructor(
    private formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private template: TemplateService //mostrar o carregamento


  ) {
      this.iniciarForm();//dentro do construtor
   }
  
  ngOnInit() {
   
    //quando carregar essa pagina quero q o menu seja desativado
  }

  autenticar() {

    let user = this.formGroup.controls['username'].value;
    let pass = this.formGroup.controls['password'].value;
    
    
    this.template.loading.then(load=>{//autenticando 
    this.auth.signInWithEmailAndPassword(user,pass).then(data=>{//função q ira enviar os dados pro firebase e fará a validação
    load.dismiss();
    this.menuCtrl.enable(true);
    this.navCtrl.navigateRoot(['clientes']);   //se for iniciada essa linha sucesso, se n 
    }).catch(data=>{ //erro 
    load.dismiss();//encerrando mensagem
    this.template.myAlert("Erro ao atenticar");
    });
    })
    } 

  

 



// o form build
iniciarForm(){
    this.formGroup= this.formBuilder.group({
    username : ['',[Validators.email] ],//valida se os dados do username é um email
    password: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(16)]]
    })
    }   //maximo de caracteres 
        //minimo de caracteres



}