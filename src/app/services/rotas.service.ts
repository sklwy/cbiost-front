import { Injectable } from '@angular/core';

import {  HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TabelaRota } from '../models/tabelaRota.model';

@Injectable({
  providedIn: 'root'
})
export class RotasService {
  private listaTabela: any[];
  private url = 'http://cbiostapi-env.eba-5narnvu2.sa-east-1.elasticbeanstalk.com/v1/api/tombo/list';

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
