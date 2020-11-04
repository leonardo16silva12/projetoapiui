export class Cidade {
    id: number;
    nome: string;
    estado: string;
}

export class Cliente {
    id: number;
    nome: string;
    telefone: string;
    cidade_id = new Cidade();
}

export class Categoria {
    id: number;
    nome: string;
}

export class Produto {
    id: number;
    nome: string;
    preco: string;
    idcategoria = new Categoria();
}

export class Pedido {
    id: number;
    datapedido: Date;
    valorpedido: number;
    idcliente = new Cliente();
    itens = new Array<ItemPedido>();
}

export class ItemPedido {
    id: number;
    idproduto = new Produto();
    qtdeitem: number;
    valorunitario: number;
    totalitem: number;

    constructor(
        id?: number,
        idproduto?: Produto,
        qtdeitem?: number,
        valorunitario?: number,
        totalitem?: number) {
            this.id = id,
            this.idproduto = idproduto,
            this.qtdeitem = qtdeitem,
            this.valorunitario = valorunitario,
            this.totalitem = totalitem;
        }
        
}