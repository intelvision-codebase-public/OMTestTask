import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalFormComponent } from './modal-form.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [ModalFormComponent],
    declarations: [ModalFormComponent],
    providers: [],
})
export class ModalFormModule { }
