import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Cliente } from '../model/cliente';
import { AngularFirestore } from '@angular/fire/firestore';

//se ele é um serviço tenho q colocar o inject pra injetar em qualquer parte do app
@Injectable()//SEMPRE QUE FIZERMOS UM SERVIÇO TEMOS QUE COLOCAR O Injectable
//se eu n registrar n consigo inserir nas classes onde vou criar

export class ClienteService {//ISSO É UM SERVIÇO DE LISTAR OS CLIENTESS
    cliente: Cliente = new Cliente();

    // como eu vou me comunicar com o firestore eu preciso injetar
    //o serviço do firestore
    //tudo que eu usar de fora para dentro do app geralmente é um serviço
    //esse serviço tem q ser injetado para dentro do constructor
    //Dentro das chaves ({}) irá colocar tudo que for inicializado
    //antes de inicializar a pagina

    constructor(private firestore: AngularFirestore) {

    }
    //METODO DE RECEBER DE LISTAR OS CLIENTES
    listaDeClientes(): Observable<any> {//o tipo observable para ele aguardar o servidor
        //preciso de um serviço que fica lá aguardando a resposta do servidor entregar a lista de clientes

        //pra eu retornar um observable eu tenho q declarar
        // observable -> aguardar uma resposta do servidor
        return from(new Observable(observe => {
            //vamos agora se conectar no firebase
            //ele vai criar um observable apartir do que eu quiser aqui dentro

            //this.firestore.collection('cliente') -> Selecionar a coleão no firestore
            //estou chamando o meu firestore (collection o nome da coleção)
            //.snapshotChanges().subscribe -> tentar buscar no servidor
            //snapshot = vai selecionar os registros (tirar uma "foto" dos registros)
            //vai tentar chamar o servidor com o subscribe (subscribe pq o restante do metodo tbm é um observable)
            //response ->  dados baixados do servidor, os clientes
            this.firestore.collection('cliente').snapshotChanges().subscribe(response => {
                //tudo que vier de reposta do firebase será response

                let lista: Cliente[] = [];

                //dps que eu receber o response tenho que transformar ele em um array de clientes  
                response.map(obj => {
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

    cadastrar(cliente: any): Observable<any> {//função de espera para o servidor
        return from(new Observable(observe => {
            //cliente foi enviado no parametro e foi adicionado aqui em baixo

            //coleção cliente  //.add = vai cadastrar o cliente
            //mas para eu colocar o obj cliente aqui 
            //toda vez que eu usar a funçao esse clinete tem que ser
            //passado no parametro (lá em cima), ou seja o cliente que foi enviado
            //no parametro ele vai ser passado aqui dentr da funçao
            //e agora vou tentar adicionar (then)

            //add cria um novo documento
            this.firestore.collection('cliente').add(cliente).then(response => {
                //vai acessar a coleção cliente e vai tentar addd um cliente
                //resposta do servidor response

                //se for cadastrado com sucesso eu quero que a minha função do
                //observable me retorne cadastrado com sucesso
                observe.next("Cadastrado com sucesso!");

            }, (err) => {

                observe.error("Erro ao cadastrar!")
            })
        }));
    }
    //quero q retorne um observable de any (ou cliente)
    buscaPorId(id: any): Observable<any> {//ele vai sempre retornar um obj do tipo observanble
        return from(new Observable(observe => {
            //preciso acessar um documento (na coleção)
            //snapshot = como se fosse a foto dos registros atualsi
            //e vai trazer os dados do cliente com esse id
            //vou acessar a coleção cliente
            //porem agora vou fazer uma busca, com isso tenho que buscar um documento 
            //(coleção conjunto de documento) preciso daquele id pra acessar
            //por isso preciso passar no paramentro lá em cima
            //tentar enviar (subscribe e retorna um response)

            //.doc(id).snapshotChanges() => busca pelo id do documento
            this.firestore.collection('cliente').doc(id).snapshotChanges().subscribe(response => {
                //quando 

                console.log(response);

                let cliente: Cliente = new Cliente();
                cliente.id = response.payload.id;
                //pegando o id do response e to pegando os dados

                cliente.setData(response.payload.data());
                observe.next(cliente);

                //essa função vai ir no firebase e retornar o cliente
            }, (err) => {

                observe.error("Erro ao buscar o ID!");
            })



        }));

    }

    //TODOS ELES VÃO RETORNAR UM OBSERVABLE DO TIPO ANY

    //como eu vou selecionar um cliente especifico coloco o cliente : any
    atualizar(cliente: any) {//ATUALIZAR É Parecido com o cadastrar
        return from(new Observable(observe => {

            //.doc e .set para atualizar
            //.doc => para acessar o documento e
            //.set => para escrever no documento

            //como eu vou atualizar um cliente especifico eu tenho 
            //que declarar esse cliente lá no paramentro
            //dentro do .doc() eu coloco qual que eu quero atualizar
            //e eu vou atualizar o cliente .set(cliente)

            //o set é o seguinte ele sempre atualiza, se ele n encontrar o doc 
            //ele cria um novo, quando você passa o doc errado ele cria um cliente novo
            //pq ele n encontrou aquele cliente
            this.firestore.collection('cliente').doc(cliente.id).set(cliente).then(response => {
                observe.next("Atualizado com sucesso");

            }, (err) => {
                observe.error("Erro ao atualizar!");
            })
        }));

    }


    
    //any = pode ser de qualquer tipo
    //posso colocar cliente

    //excluir(cliente: any) => obj e classe]
    //any para poder reutilizar código
    excluir(cliente: any): Observable<any>{
        return from(new Observable(observe => { 


            //função igual a de cima
            //vai buscar na coleção pelo id e vai excluir
            this.firestore.collection('cliente').doc(cliente.id).delete().then(response => {
                observe.next("Excluido com sucesso");

            }, (err) => {
                observe.error("Erro ao excluir!");
            })

        }));
    }

}