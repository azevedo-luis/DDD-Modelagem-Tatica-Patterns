// Essa classe é anemica porque ela só armazena dados, ela não tem métodos. Ela está mais para um DTO do que para uma classe. 
// Normalmente se cria esses getters e setters por conta de ORM. 

// Uma entidade de fato tem um id único, carrega valores que alteram com o tempo, ela tem comportamento e ela contém regras de negócio. 
// E essas regras de negócio é que fazem o DDD ser o DDD. As regras de negócio são formas de mudar o comportamento da entidade, aplicando
// validações, formúlas, qualquer coisa que satisfaça o que o sistema está pedindo. 


class Customer{
    _id: string; // isso é chamado de entidade porque tem um id, ele é único e distingue um de outro objeto. Esse atributo não muda, 
                 // os demais mudam com o tempo. 
    _name: string;
    _address: string;

    constructor(id: string, name: string, address: string){
        this._id = id;
        this._name = name;
        this._address = address;
    }

    get id(): string{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get address():string{
        return this._name;
    }

    set name(name:string){
        this._name = name;
    }

    set address(address: string){
        this._address = address
    }
}