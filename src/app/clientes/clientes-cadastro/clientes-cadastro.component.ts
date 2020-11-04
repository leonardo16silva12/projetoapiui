import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ClientesService } from './../Clientes.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CidadesService } from '../../cidades/cidades.service';

@Component({
  selector: 'app-clientes-cadastro',
  templateUrl: './clientes-cadastro.component.html',
  styleUrls: ['./clientes-cadastro.component.css']
})
export class ClientesCadastroComponent implements OnInit {

  clientes = [];
  cidades = [];
  formulario: FormGroup;

  constructor(
    private cidadesService: CidadesService,
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const idCliente = this.route.snapshot.params['id'];


    if (idCliente){
      this.carregarCliente(idCliente);
    }

    this.carregarCidades();
  }

  carregarCliente(id: number) {
    this.clientesService.buscarPorId(id)
    .then(cliente => {
      this.formulario.patchValue(cliente);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  
  configurarFormulario() {
    this.formulario = this.formBuilder.group({

      id: [],
      nome: [null, [Validators.required, Validators.minLength(5)]],
      telefone: [null, Validators.required],
      cidade: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      })
    });
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  salvar() {
    if (this.editando) {
      this.atualizarCliente();
    } 
    else 
    {
      this.adicionarCliente();
    }
  }

 adicionarCliente() {
    this.clientesService.adicionar(this.formulario.value)
      .then(clienteAdicionado => {
        this.messageService.add({ severity: 'success', detail: 'Cliente Adicionado com Sucesso!!!' });

        this.router.navigate(['/clientes']);
      }).catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCliente() {
    this.clientesService.atualizar(this.formulario.value)
    .then(cliente => {
      this.formulario.patchValue(cliente);
      this.messageService.add({severity: 'success', detail: 'Cliente Alterado com Sucesso!!!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades(){
    return this.cidadesService.listarTodasCidades()
    .then(cidades => {
      this.cidades = cidades
      .map(c => ({label: c.nome, value: c.id}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}


