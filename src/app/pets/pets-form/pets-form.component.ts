import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { PetsService } from './../pets.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-pets-form',
  templateUrl: './pets-form.component.html',
  styleUrls: ['./pets-form.component.scss']
})
export class PetsFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  // public nascimentoFormatado = new Date();

  constructor(private fb: FormBuilder,
              private service: PetsService,
              private modal: AlertModalService,
              private location: Location,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap(id => this.service.loadById(id))
    //   )
    //   .subscribe(pet => this.updateForm(pet));

    const pet = this.route.snapshot.data['pet']
    const pipe = new DatePipe('pt');

    this.form = this.fb.group({
      id: [pet.id],
      nome: [pet.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      especie: [pet.especie, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      porte: [pet.porte, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      nascimento: [ pipe.transform(pet.nascimento, 'dd/MM/yyyy'), [Validators.required]],
      status: [pet.status]
    });

  }

  // updateForm(pet) {
  // this.form.patchValue({
  //   id: pet.id,
  //   nome: pet.nome,
  //   especie: pet.especie,
  //   porte: pet.porte,
  //   nascimento: pet.nascimento
  // });
  // }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log('submit');

      let msgSuccess = 'Pet cadastrado com sucesso';
      let msgError = 'Erro ao cadastrar o pet';

      if (this.form.value.id) {
        msgSuccess = 'Pet cadastrado com sucesso';
        msgError = 'Erro ao cadastrar o pet';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error =>  this.modal.showAlertDanger(msgError),
      );

     /*if (this.form.value.id) {
        this.service.update(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Pet atualizado com sucesso');
            this.location.back();
          },
          error => this.modal.showAlertDanger('Erro ao atualizar o pet'),
          () => console.log('update completo')
        )
      } else {
        this.service.create(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Pet cadastrado com sucesso');
            this.location.back();
          },
          error => this.modal.showAlertDanger('Erro ao cadastrar o pet'),
          () => console.log('request completo')
        );
      }*/

    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.location.back();
  }

}
