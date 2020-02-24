import { environment } from './../../environments/environment';
import { Pet } from './pet';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { tap, take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PetsService {

  private readonly API = `${environment.API}pets`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Pet[]>(this.API)
      .pipe(
        tap()
    );
  }

  loadById(id) {
    return this.http.get<Pet>(`${this.API}/${id}`)
      .pipe(take(1));
  }

  private create(pet) {
    console.log(pet)

    return this.http.post(this.API, pet)
      .pipe(take(1));
  }

  private update(pet) {
    return this.http.put(`${this.API}/${pet.id}`, pet)
    .pipe(take(1));
  }

  save(pet) {
    if (pet.id) {
      return this.update(pet);
    }
    return this.create(pet);

  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`)
    .pipe(take(1));
  }
}
