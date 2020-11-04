import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { CategoriasService } from './../categorias.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorias-cadastro',
  templateUrl: './categorias-cadastro.component.html',
  styleUrls: ['./categorias-cadastro.component.css']
})
export class CategoriasCadastroComponent implements OnInit {

  formulario: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private router: Router,
  ) { 


  }

  ngOnInit() {
    this.configurarFormulario();

    const idCategoria = this.route.snapshot.params['id'];

    if (idCategoria){
      this.carregarCategoria(idCategoria);
    }
  }

  carregarCategoria(id: number) {
    this.categoriasService.buscarPorId(id)
    .then(categoria => {
      this.formulario.patchValue(categoria);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({

      id: [],
      nome: [null, [Validators.required, Validators.minLength(5)]]
    });
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  salvar() {
    if (this.editando) {
      this.atualizarCategoria();
    } 
    else 
    {
      this.adicionarCategoria();
    }
  }

  adicionarCategoria() {
    this.categoriasService.adicionar(this.formulario.value)
    .then(categoriaAdicionada => {
      this.messageService.add({severity: 'success', detail: 'Categoria Adicionada com Sucesso!!!'});
   
      this.router.navigate(['/categorias']);
    }) .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCategoria() {
    this.categoriasService.atualizar(this.formulario.value)
    .then(categoria => {
      this.formulario.patchValue(categoria);
      this.messageService.add({severity: 'success', detail: 'Categoria Alterada com Sucesso!!!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
