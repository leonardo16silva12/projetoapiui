import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Produto } from '../core/model';

export class ProdutoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

  produtosUrl = 'http://localhost:8080/produtos';

  pesquisar(filtro: ProdutoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.produtosUrl}`, { params })
      .toPromise()
      .then(response => {
        const produtos = response.content;

        const resultado = {
          produtos,
          total: response.totalElements
        }
        return resultado;
      });
  }

  adicionar(produto: Produto): Promise<Produto> {
    return this.http.post<Produto>(this.produtosUrl, produto).toPromise();
  }

  atualizar(produto: Produto): Promise<Produto> {
    return this.http.put<Produto>(`${this.produtosUrl}/${produto.id}`, produto)
    .toPromise()
    .then(response => {
      const produtoAlterado = response;
      return produtoAlterado;
    });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.produtosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  buscarPorId(id: number): Promise<Produto> {
    return this.http.get<Produto>(`${this.produtosUrl}/${id} `)
    .toPromise()
    .then(response => {
      const produto = response;
      return produto;
    })
}

getProdutos(nome: string): Promise<any>  {
  return this.http.get(`${this.produtosUrl}/pro/${nome}`).toPromise();
}

}