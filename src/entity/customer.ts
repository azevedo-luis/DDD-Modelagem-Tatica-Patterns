class Customer{
    _id: string; 
    _name: string;
    _address: string;
    _active: boolean = true;

    constructor(id: string, name: string, address: string){
        this._id = id;
        this._name = name;
        this._address = address;
    }

    set name(name:string){
        this._name = name;
    }

    changeName(name: string){ // Aqui poderia ter uma regra de negócio, por exemplo, que ao informar o nome
        // é obrigado também informar o sobrenome. 
        this._name = name;
    }

    activate(){
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }
}