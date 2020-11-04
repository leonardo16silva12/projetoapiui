import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoFiltro, PedidosService } from '../pedidos.service';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pedidos-pesquisa',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.css']
})
export class PedidosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PedidoFiltro();
  pedidos = [];

  @ViewChild('tabela', {static: true}) grid;

  constructor(private pedidosService: PedidosService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pedidosService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pedidos = resultado.pedidos;
      });
      
    }

  aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event.first / event.rows;
      this.pesquisar(pagina);
  }

  confirmarExclusao(pedido: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir esse registro?',
      accept: () => {
        this.excluir(pedido);
      }
    });
  }

  excluir(pedido: any){
    this.pedidosService.excluir(pedido.id)
    .then(() => 
    {
      if (this.grid.first === 0){
        this.pesquisar();
      }
      else {
        this.grid.first = 0;
      }
      this.messageService.add({severity: 'success', summary:'Atenção', detail: 'Pedido Excluído com Sucesso'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}


