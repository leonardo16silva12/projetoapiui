import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pedido } from '../core/model';
import * as moment from 'moment';

export class PedidoFiltro {
  nome: string;
  datapedidode: Date;
  datapedidoate: Date;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  pedidosUrl = 'http://localhost:8080/pedidos';

  pesquisar(filtro: PedidoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro.datapedidode) {
      params = params.append('datapedidode', moment(filtro.datapedidode).format('YYYY/MM/DD'));
    }

    if (filtro.datapedidoate) {
      params = params.append('datapedidoate', moment(filtro.datapedidoate).format('YYYY/MM/DD'));
    }

    return this.http.get<any>(`${this.pedidosUrl}`, { params })
      .toPromise()
      .then(response => {
        const pedidos = response.content;

        const resultado = {
          pedidos,
          total: response.totalElements
        }
        return resultado;
      });
  }

  adicionar(pedido: Pedido): Promise<Pedido> {
    return this.http.post<Pedido>(this.pedidosUrl, pedido).toPromise();
  }

  atualizar(pedido: Pedido): Promise<Pedido> {
    return this.http.put<Pedido>(`${this.pedidosUrl}/${pedido.id}`, pedido)
    .toPromise()
    .then(response => {
      const pedidoAlterado = response;
      return pedidoAlterado;
    });
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.pedidosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  buscarPorId(id: number): Promise<Pedido> {
    return this.http.get<Pedido>(`${this.pedidosUrl}/${id} `)
    .toPromise()
    .then(response => {
      const pedido = response;
      return pedido;
    });
}

listarTodasPedidos(): Promise<Pedido[]> {
  return this.http.get<Pedido[]>(`${this.pedidosUrl}/todas`).toPromise();
}

private stringDatas(pedidos : Pedido[]) {
  for (const pedido of pedidos) {
    if(pedido.datapedido) {
      pedido.datapedido = moment(pedido.datapedido, 'YYYY-MM-DD').toDate();
    }
  }
}
}
