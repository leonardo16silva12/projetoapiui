import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesPesquisaComponent } from './clientes-pesquisa/clientes-pesquisa.component';
import { RouterModule } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import { ClientesCadastroComponent } from './clientes-cadastro/clientes-cadastro.component';
import { SharedModule } from './../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';




@NgModule({
  declarations: [ClientesPesquisaComponent, ClientesCadastroComponent],
  exports: [ClientesPesquisaComponent],
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
    DropdownModule
  ]
})
export class ClientesModule { }
