import { PetResolverGuard } from './guards/pet-resolver.guard';
import { PetsFormComponent } from './pets-form/pets-form.component';
import { PetsListComponent } from './pets-list/pets-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: PetsListComponent },
  {
    path: 'novo', component: PetsFormComponent,
    resolve: {
      pet: PetResolverGuard
    }
  },
  {
    path: 'editar/:id', component: PetsFormComponent,
    resolve: {
      pet: PetResolverGuard
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
