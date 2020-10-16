export class Cliente{
id: string;// string por causa do fire base
cidade: string;
cpf: string;
email: string;
endereco: string;
estado: string;
nome: string;
numero: string;
telefone: string;

//irá pegar um objeto no firebase 
                

 //set irá pegar um objeto do firebase e para não se 
 //preocupar com que tipo de dados iremos pegar iremos declara 
 //como any               
setData(objFirebase : any){// any = qualquer dado
    //nome do dado e tipo da funçao
    //to pegando o dado cidade do objetofirebase que vem do firebase e atribuindo na minha classe
    //lá em cima
    this.cidade = objFirebase.cidade;
    this.cpf = objFirebase.cpf;
    this.email = objFirebase.email;
    this.endereco = objFirebase.endereco;
    this.estado = objFirebase.estado;
    this.nome = objFirebase.nome;
    this.numero = objFirebase.numero;
    this.telefone = objFirebase.telefone;
//essa variavel
}


}//os dados tem q refletir diretamente no que está lá

