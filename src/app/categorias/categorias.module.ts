import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasPesquisaComponent } from './categorias-pesquisa/categorias-pesquisa.component';
import { RouterModule } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import { CategoriasCadastroComponent } from './categorias-cadastro/categorias-cadastro.component';




@NgModule({
  declarations: [CategoriasPesquisaComponent, CategoriasCadastroComponent],
  exports: [CategoriasPesquisaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule
  ]
})
export class CategoriasModule { }
