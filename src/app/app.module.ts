import { PedidosService } from './pedidos/pedidos.service';
import { ErrorHandlerService } from './core/error-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CidadesModule } from './cidades/cidades.module';
import { ClientesModule } from './clientes/clientes.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProdutosModule } from './produtos/produtos.module';
import { RouterModule, Routes } from '@angular/router';
import { CidadesPesquisaComponent } from './cidades/cidades-pesquisa/cidades-pesquisa.component';
import { CidadesService } from './cidades/cidades.service';
import { ClientesPesquisaComponent } from './clientes/clientes-pesquisa/clientes-pesquisa.component';
import { ClientesService } from './clientes/clientes.service';
import { HttpClientModule } from '@angular/common/http';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import { CidadesCadastroComponent } from './cidades/cidades-cadastro/cidades-cadastro.component';
import { ClientesCadastroComponent } from './clientes/clientes-cadastro/clientes-cadastro.component';
import { CategoriasCadastroComponent } from './categorias/categorias-cadastro/categorias-cadastro.component';
import { ProdutosCadastroComponent } from './produtos/produtos-cadastro/produtos-cadastro.component';
import { CategoriasPesquisaComponent } from './categorias/categorias-pesquisa/categorias-pesquisa.component';
import { CategoriasService } from './categorias/categorias.service';
import { ProdutosPesquisaComponent } from './produtos/produtos-pesquisa/produtos-pesquisa.component';
import { ProdutosService } from './produtos/produtos.service';
import { PedidosPesquisaComponent } from './pedidos/pedidos-pesquisa/pedidos-pesquisa.component';
import { PedidosModule } from './pedidos/pedidos.module';
import { PedidosCadastroComponent } from './pedidos/pedidos-cadastro/pedidos-cadastro.component';
import {ButtonModule} from 'primeng/button';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';


const routes: Routes = [
  {path: 'cidades', component: CidadesPesquisaComponent},
  {path: 'clientes', component: ClientesPesquisaComponent},
  {path: 'cidades/novo', component: CidadesCadastroComponent},
  {path: 'clientes/novo', component: ClientesCadastroComponent},
  {path: 'cidades/:id', component: CidadesCadastroComponent},
  {path: 'clientes/:id', component: ClientesCadastroComponent},
  {path: 'categorias', component: CategoriasPesquisaComponent},
  {path: 'produtos', component: ProdutosPesquisaComponent},
  {path: 'categorias/novo', component: CategoriasCadastroComponent},
  {path: 'produtos/novo', component: ProdutosCadastroComponent},
  {path: 'categorias/:id', component: CategoriasCadastroComponent},
  {path: 'produtos/:id', component: ProdutosCadastroComponent},
  {path: 'pedidos/novo', component: PedidosCadastroComponent},
  {path: 'pedidos', component: PedidosPesquisaComponent},
  

]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppRoutingModule,
    CoreModule, 
    CidadesModule,
    PedidosModule,
    ClientesModule,
    CategoriasModule,
    ProdutosModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    AutoCompleteModule,
    CalendarModule,
    PanelModule,
    TableModule,
    InputTextModule,
    DialogModule
   
  ],
  providers: [
     CidadesService,
     ClientesService,
     CategoriasService,
     ProdutosService,
     PedidosService,
     ConfirmationService,
     MessageService,
    ErrorHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
