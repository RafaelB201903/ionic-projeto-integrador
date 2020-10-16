import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Cliente } from '../model/cliente';
import { AngularFirestore } from '@angular/fire/firestore';

//se ele é um serviço tenho q colocar o inject pra injetar em qualquer parte do app
@Injectable()//SEMPRE QUE FIZERMOS UM SERVIÇO TEMOS QUE COLOCAR O Injectable

export class ClienteService{//ISSO É UM SERVIÇO DE LISTAR OS CLIENTESS
    cliente : Cliente = new Cliente();

    // como eu vou me comunicar com o firestore eu preciso injetar
    //o serviço do firestore
    //tudo que eu usar de fora para dentro do app geralmente é um serviço
    //esse serviço tem q ser injetado para dentro do constructor
    //Dentro das chaves ({}) irá colocar tudo que for inicializado
    //antes de inicializar a pagina

    constructor(private firestore: AngularFirestore){

    }
    //METODO DE RECEBER DE LISTAR OS CLIENTES
    listaDeClientes() : Observable<any>{//o tipo observable para ele aguardar o servidor
    //preciso de um serviço que fica lá aguardando a resposta do servidor entregar a lista de clientes

    //pra eu retornar um observable eu tenho q declarar
    // observable -> aguardar uma resposta do servidor
    return from(new Observable(observe =>{
        //vamos agora se conectar no firebase
        //ele vai criar um observable apartir do que eu quiser aqui dentro
         
        //this.firestore.collection('cliente') -> Selecionar a coleão no firestore
        //estou chamando o meu firestore (collection o nome da coleção)
        //.snapshotChanges().subscribe -> tentar buscar no servidor
        //snapshot = vai selecionar os registros (tirar uma "foto" dos registros)
        //vai tentar chamar o servidor com o subscribe (subscribe pq o restante do metodo tbm é um observable)
        //response ->  dados baixados do servidor, os clientes
        this.firestore.collection('cliente').snapshotChanges().subscribe(response=>{
            //tudo que vier de reposta do firebase será response
            
        let lista: Cliente[] = [];
       
        //dps que eu receber o response tenho que transformar ele em um array de clientes  
            response.map(obj =>{
            //será repetido para cada registro, se eu recebi 10 clientes esse map vai repetir 10 vezes
            //cada registro do Firestore se chama obj
            //para cada obj desse eu tenho q transformar em cliente
            let cliente: Cliente = new Cliente();

            //para cada obj desse eu tenho q transformar em cliente
            //obj.payload.doc.data() -> Dados do cliente
            //e estou setando (inserindo) esses dados em cliente, ou seja estão indo para cliente
            cliente.setData(obj.payload.doc.data());
            //cada vez que ele repetir isso, ele irá criar um cliente novo
            
            //Se cada vez que eu to repetindo isso estou criando um cliente
            // onde eu irei armazenar esse cliente ? Ali em cima no array de cliente vazio


            //para passar o id (nao tem id no banco ou seja n recebe nenhum id)
            cliente.id = obj.payload.doc.id;//passando ID
            lista.push(cliente);//adicionando o cliente na lista //push é adicionar

        });
        //dps de fazer o mapeamento, eu quero que lá (lá no clientes.page.ts) ele me retorne a lista
        observe.next(lista);
        //o observe quer dizer que o que eu quero encontrar é a minha lista
        
        })

    }))
}




}