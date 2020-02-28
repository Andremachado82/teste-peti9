import { FormService } from './../../shared/services/form.service';
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
  statusOp: any[];

  constructor(private fb: FormBuilder,
              private service: PetsService,
              private modal: AlertModalService,
              private location: Location,
              private route: ActivatedRoute,
              private formService: FormService
  ) { }

  ngOnInit() {

    this.statusOp = this.formService.getStatus();

    const pet = this.route.snapshot.data['pet']
    const pipe = new DatePipe('pt');

    this.form = this.fb.group({
      id: [pet.id],
      nome: [pet.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      especie: [pet.especie, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      porte: [pet.porte, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      nascimento: [pipe.transform(pet.nascimento, 'dd/MM/yyyy'), [Validators.required]],
      idade: [pet.idade, [Validators.minLength(8)]],
      status: ['Ativo']
    });

  }

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
      if (this.form.value.status !== 'Ativo') {
        msgError = 'Pet encontra-se Inativo';
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => this.modal.showAlertDanger(msgError),
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.location.back();
  }

}
