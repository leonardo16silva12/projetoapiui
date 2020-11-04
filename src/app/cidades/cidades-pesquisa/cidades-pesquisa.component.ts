import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CidadeFiltro, CidadesService } from '../cidades.service';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cidades-pesquisa',
  templateUrl: './cidades-pesquisa.component.html',
  styleUrls: ['./cidades-pesquisa.component.css']
})
export class CidadesPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new CidadeFiltro();
  cidades = [];

  @ViewChild('tabela', {static: true}) grid;

  constructor(private cidadesService: CidadesService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.cidadesService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.cidades = resultado.cidades;
      });
      
    }

  aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event.first / event.rows;
      this.pesquisar(pagina);
  }

  confirmarExclusao(cidade: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir esse registro?',
      accept: () => {
        this.excluir(cidade);
      }
    });
  }

  excluir(cidade: any){
    this.cidadesService.excluir(cidade.id)
    .then(() => 
    {
      if (this.grid.first === 0){
        this.pesquisar();
      }
      else {
        this.grid.first = 0;
      }
      this.messageService.add({severity: 'success', summary:'Atenção', detail: 'Cidade Excluída com Sucesso'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}


