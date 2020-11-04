import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { PedidosPesquisaComponent } from './pedidos-pesquisa/pedidos-pesquisa.component';
import { PedidosCadastroComponent } from './pedidos-cadastro/pedidos-cadastro.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';




@NgModule({
  declarations: [PedidosPesquisaComponent, PedidosCadastroComponent],
  exports: [PedidosPesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    PanelModule,
    CalendarModule,
    AutoCompleteModule,
    DialogModule
  ]
})
export class PedidosModule { }
