import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${environment.baseUrl}/heroes`);
  }

  getHeroePorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${environment.baseUrl}/heroes/${id}`);
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${environment.baseUrl}/heroes?q=${termino}`);
  }

  guardarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${environment.baseUrl}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(
      `${environment.baseUrl}/heroes/${heroe.id}`,
      heroe
    );
  }

  borrarHeroe(id: string): Observable<Heroe> {
    return this.http.delete<Heroe>(`${environment.baseUrl}/heroes/${id}`);
  }
}
