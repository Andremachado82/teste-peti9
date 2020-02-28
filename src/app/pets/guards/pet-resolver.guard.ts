import { PetsService } from './../pets.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pet } from '../pet';

@Injectable({
  providedIn: 'root'
})
export class PetResolverGuard implements Resolve<Pet> {

  constructor(private service: PetsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pet> {

    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }

    return of({
      id: null,
      nome: null,
      especie: null,
      porte: null,
      nascimento: null,
      idade: null,
      status: null,

    });
  }


}
