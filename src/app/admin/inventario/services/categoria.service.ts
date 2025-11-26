import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development'; 

interface Categoria {
  id?: number,
  nombre: string;
  detalle?: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl = environment.urlServidor
  private http = inject(HttpClient)

  constructor() { }

  funListar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categoria?order=id:asc`)
  }

  funGuardar(registro: any){
    return this.http.post(`${this.baseUrl}/categoria`, registro)
  }

  funModificar(id: number, registro: any){
    return this.http.put(`${this.baseUrl}/categoria/${id}`, registro)
  }

  funEliminar(id: number){
    return this.http.delete(`${this.baseUrl}/categoria/${id}`)
  }
}