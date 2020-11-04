import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteFiltro, ClientesService } from '../clientes.service';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-clientes-pesquisa',
  templateUrl: './clientes-pesquisa.component.html',
  styleUrls: ['./clientes-pesquisa.component.css']
})
export class ClientesPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ClienteFiltro();
  clientes = [];

  @ViewChild('tabela', {static: true}) grid;
  constructor(
    private clientesService: ClientesService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.clientesService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.clientes = resultado.clientes;
      });
      
    }

  aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event.first / event.rows;
      this.pesquisar(pagina);
  }

  confirmarExclusao(cliente: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir esse registro?',
      accept: () => {
        this.excluir(cliente);
      }
    });
  }

  excluir(cliente: any){
    this.clientesService.excluir(cliente.id)
    .then(() => 
    {
      if (this.grid.first === 0){
        this.pesquisar();
      }
      else {
        this.grid.first = 0;
      }
      this.messageService.add({severity: 'success', summary:'Atenção', detail: 'Cliente Excluído com Sucesso'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}


