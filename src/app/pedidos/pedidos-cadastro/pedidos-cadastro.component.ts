import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ProdutosService } from '../../produtos/produtos.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../clientes/clientes.service';
import { Pedido } from 'src/app/core/model';
import { PedidosService } from '../pedidos.service';
import { ItemPedido } from '../../core/model';


@Component({
  selector: 'app-pedidos-cadastro',
  templateUrl: './pedidos-cadastro.component.html',
  styleUrls: ['./pedidos-cadastro.component.css']
})
export class PedidosCadastroComponent implements OnInit {


  produtos = [];
  formulario: FormGroup;
  exibirFormularioItem = false;
  clientes = [];
  results: string[];
  pedido = new Pedido();
  itempedido: ItemPedido;
  itemIndex: number;




  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const idPedido = this.route.snapshot.params['id'];

    if (idPedido){
      this.carregarPedido(idPedido);
    }
  }

  carregarProdutos(event) {
    const query = event.query;
    this.produtosService.getProdutos(query).then(produtos => {
      this.produtos = produtos;
    });
  }

  carregarClientes(event) {
    const query = event.query;
    this.clientesService.getClientes(query).then(clientes => {
      this.clientes = clientes;
    });
  }

  carregarPedido(id: number) {
    this.pedidosService.buscarPorId(id)
    .then(pedido => {
      this.pedido = pedido;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pedido.id);
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({

      id: [],
      nome: [null, [Validators.required, Validators.minLength(3)]],
      preco: [null, [Validators.required, Validators.minLength(2)]],
      categoria: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      })
    });
  }

  salvar(form: FormControl) {
    if(this.editando) {
      this.atualizarPedido(form);
    } else {
      this.adicionarPedido(form);
    }
  }

  adicionarPedido(form: FormControl){
    this.pedidosService.adicionar(this.pedido)
    .then(pedidoAdicionado => {  
      this.messageService.add({severity: 'success', detail: 'Pedido adicionado com sucesso'});
    
      this.router.navigate(['/pedidos']);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPedido(form: FormControl) {
    this.pedidosService.atualizar(this.pedido)
    .then(pedido => {
      this.pedido = pedido;
      this.messageService.add({severity: 'success', detail: 'Pedido alterado com sucesso'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

    /* Itens Pedido */
    prepararNovoItem() {
      this.exibirFormularioItem = true;
      this.itempedido = new ItemPedido();
      this.itemIndex = this.pedido.itens.length;
    }

    prepararEdicaoItem(itempedido: ItemPedido, index: number) {
      this.itempedido = this.clonarItem(itempedido);
      this.exibirFormularioItem = true;
      this.itemIndex = index;
    }
  
    confirmarItem(frm: FormControl) {
      console.log('Confirmou');
      this.pedido.itens[this.itemIndex] = this.clonarItem(this.itempedido);
      this.prepararNovoItem();
    }
  
    clonarItem(itemPedido: ItemPedido): ItemPedido {
    return new ItemPedido(itemPedido.id, itemPedido.idproduto, itemPedido.qtdeitem, itemPedido.valorunitario, itemPedido.totalitem);
    }
  
    closeForm() {
      this.exibirFormularioItem = false;
    }



}
