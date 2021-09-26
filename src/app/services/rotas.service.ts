import { Injectable } from '@angular/core';

import {  HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TabelaRota } from '../models/tabelaRota.model';

@Injectable({
  providedIn: 'root'
})
export class RotasService {
  private listaTabela: any[];
  private url = 'http://localhost:8080/api/acervoBiologico/list';

  constructor(private httpClient: HttpClient) {
      this.listaTabela = [];
   }

   get linhas(){
     return this.listaTabela;
   }

   todas(): Observable<TabelaRota[]>{
     return this.httpClient.get<TabelaRota[]>(this.url)
   }
}
