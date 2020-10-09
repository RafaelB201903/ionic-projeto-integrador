export class Cliente{
id: string;
cidade: string;
cpf: string;
email: string;
endereco: string;
estado: string;
nome: string;
numero: string;
telefone: string;

//irá pegar um objeto no firebase 
                //qualquer dado
setData(objFirebase : any){
    //to pegando o dado cidade do objetofirebase que vem do firebase
    this.cidade = objFirebase.cidade;
    this.cpf = objFirebase.cpf;
    this.email = objFirebase.email;
    this.endereco = objFirebase.endereco;
    this.estado = objFirebase.estado;
    this.nome = objFirebase.nome;
    this.numero = objFirebase.numero;
    this.telefone = objFirebase.telefone;

}


}//os dados tem q refletir diretamente no que está lá

