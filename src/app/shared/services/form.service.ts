
export class FormService {
  constructor() { }


  getStatus() {
    return [
      { valor: 'Ativo', desc: 'Ativo' },
      { valor: 'Inativo', desc: 'Inativo' }
    ];
  }

}
