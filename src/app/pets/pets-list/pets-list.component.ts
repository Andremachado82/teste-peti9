import { AlertModalService } from './../../shared/alert-modal.service';
import { PetsService } from './../pets.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pet } from '../pet';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss'],
  preserveWhitespaces: true
})
export class PetsListComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  pets$: Observable<Pet[]>;
  error$ = new Subject<boolean>();

  petSelected: Pet;

  constructor(private petService: PetsService,
              private alertService: AlertModalService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.pets$ = this.petService.list()
      .pipe(
        catchError(error => {
          console.log(error);
          this.handleError();
          return EMPTY;
        })
      );
  }

  handleError() {
    this.alertService
      .showAlertDanger('Erro ao carregar os pets. Tente novamente mais tarde.');
  }

  onEdit(pet) {

    this.router.navigate(['pets/:id', pet], {
      relativeTo: this.route
    });
  }

  onDelete(pet) {
    this.petSelected = pet;
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  onConfirmDelete() {
    this.petService.remove(this.petSelected.id)
      .subscribe(
        success => {
          this.onRefresh();
          this.deleteModalRef.hide();
        },
        error => {
          this.alertService
            .showAlertDanger('Erro ao remover pet. Tente novamente mais tarde.'),
            this.deleteModalRef.hide();
        }
      );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }
}
