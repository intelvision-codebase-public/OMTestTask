import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-modal-form',
    templateUrl: 'modal-form.component.html'
})

export class ModalFormComponent implements OnInit {

    @Input() myForm: FormGroup;
    constructor() { }

    ngOnInit() { }
}