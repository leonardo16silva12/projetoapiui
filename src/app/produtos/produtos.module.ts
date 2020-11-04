import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';
import { RouterModule } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import { ProdutosCadastroComponent } from './produtos-cadastro/produtos-cadastro.component';
import { DropdownModule } from 'primeng/dropdown';




@NgModule({
  declarations: [ProdutosPesquisaComponent, ProdutosCadastroComponent],
  exports: [ProdutosPesquisaComponent],
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
export class ProdutosModule { }
