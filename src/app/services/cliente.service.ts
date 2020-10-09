import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Cliente } from '../model/cliente';
import { AngularFirestore } from '@angular/fire/firestore';
//se ele é um serviço tenho q colocar o inject pra injetar em qualquer parte do app

@Injectable()

export class ClienteService{
    cliente : Cliente = new Cliente();

    constructor(private firestore: AngularFirestore){

    }

    listaDeClientes() : Observable<any>{//o tipo observable para ele aguardar o servidor

    //pra eu retornar um observable eu tenho q declarar
    // observalbe -> aguardar uma resposta do servidor
    return from(new Observable(observe =>{
        //vamos agora se conectar no firebase
        
        
        this.firestore.collection('cliente').snapshotChanges().subscribe(response=>{
            
        let lista: Cliente[] = [];
        //transformar response em array de clientes
            response.map(obj =>{
            //será repetido para cada registro, se eu receber esse map vai repetir 10 vezes
            let cliente: Cliente = new Cliente();

            cliente.setData(obj.payload.doc.data());
            //para passar o id (nao tem id no banco ou seja n recebe nenhum id)
            cliente.id = obj.payload.doc.id;//passando ID
            lista.push(cliente);//adicionadno o cliente na lista //push é adicionar

        });
        observe.next(lista);//dps de fazer o mapeamento ele irá retornar a lista
            //o observer quer dizer o que eu quero retornar é a lista
        })

    }))
}




}