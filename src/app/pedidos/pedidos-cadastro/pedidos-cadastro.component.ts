import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ProdutosService } from '../../produtos/produtos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  pedido = new Pedido();
  exibirFormularioItem = false;
  clientes = [];
  produtos = [];
  itempedido: ItemPedido;
  itemIndex: number;
  pedidoTotal = 0;

  constructor(
    private route: ActivatedRoute,
    private pedidosService: PedidosService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private clientesService: ClientesService,
    private produtosService: ProdutosService,
  ) { }

  ngOnInit() {
    const idPedido = this.route.snapshot.params['id'];

    if (idPedido) {
      this.carregarPedido(idPedido);
    }
  }

  carregarPedido(id: number) {
    this.pedidosService.buscarPorId(id)
      .then(pedido => {
        this.pedido = pedido;
      });
  }

  get editando() {
    return Boolean(this.pedido.id);
  }

  carregarClientes(event) {
    const query = event.query;
    this.clientesService.getClientes(query).then(clientes => {
      this.clientes = clientes;
    });
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPedido(form);
    } else {
      this.adicionarPedido(form);
    }
  }

  adicionarPedido(form: FormControl) {
    this.pedidosService.adicionar(this.pedido)
      .then(pedidoAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Pedido adicionado com sucesso' });

        this.router.navigate(['/pedidos']);
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }

  atualizarPedido(form: FormControl) {
    this.pedidosService.atualizar(this.pedido)
      .then(pedido => {
        this.pedido = pedido;
        this.messageService.add({ severity: 'success', detail: 'Pedido alterado com sucesso' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // Itens do Pedido
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
    this.pedido.itens[this.itemIndex] = this.clonarItem(this.itempedido);
    this.calcularTotalPedido();
    this.prepararNovoItem();
  }

  clonarItem(itemPedido: ItemPedido): ItemPedido {
    return new ItemPedido(itemPedido.id, itemPedido.produto, itemPedido.qtdeitem, itemPedido.valorunitario, itemPedido.totalitem);
  }

  closeForm() {
    this.exibirFormularioItem = false;
  }

  carregarProdutos(event) {
    const query = event.query;
    this.produtosService.getProdutos(query).then(produtos => {
      this.produtos = produtos;
    });
  }

  atribuirValorUnitario() {
    this.itempedido.valorunitario = this.itempedido.produto.preco;
  }

  calcularTotalPedido() {
    this.pedidoTotal = 0;
    for (let i = 0; i < this.pedido.itens.length; i++) {
      this.pedidoTotal += this.pedido.itens[i].totalitem;
    }
    this.pedido.valorpedido = this.pedidoTotal;
  }

  removerItem(index: number) {
    this.pedido.itens.splice(index, 1);
    this.calcularTotalPedido();
  }

  calculaTotalItem() {
    this.itempedido.totalitem = this.itempedido.qtdeitem * this.itempedido.valorunitario;
  }

}