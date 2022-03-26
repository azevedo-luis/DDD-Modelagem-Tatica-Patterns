class Customer{
    _id: string; 
    _name: string = "";
    _address: string = "";
    _active: boolean = true;

    constructor(id: string){ //, name: string, address: string){
        this._id = id;
        // this._name = name;
        // this._address = address;
    }

    set name(name:string){
        this._name = name;
    }

    changeName(name: string){ // Aqui poderia ter uma regra de negócio, por exemplo, que ao informar o nome
        // é obrigado também informar o sobrenome. Uma regra de negócio explicita.
        this._name = name;
    }

    activate(){
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }
}



let customer = new Customer("123");
/* Isso aqui é errado, porque está definido apenas o ID. Eu preciso garantir que toda 
vez que consultar os dados da entidade eles estão consistentes. Existe um cliente sem 
nome na regra de negócio? Portanto essa classe entidade inconsistente. Uma vez que ela não 
está consistente, ela não consegue validar regras de negócio, porque ela não serve para nada, 
é um objeto incompleto. Em DDD eu preciso confiar 100 da vezes que os campos obrigatórios 
estão preenchidos corretamente. 

Vamos imaginar que esses dados vieram do banco de dados e ele não tem endereço, tudo bem, 
não tem problema se a regra de negócio permite. Mas, uma vez que eu setei esse endereço, 
no programa inteiro esse endereço preciso existir, se ela está persistido no banco de dados 
ou não é um outro problema. Nesse momento é preciso esquecer de banco de dados, inclusive do ID, 
porque esse ID identifica a entidade no meu sistema e não no banco de dados. 
*/