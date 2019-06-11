import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        InputTextModule,
        ButtonModule
    ],
    exports: [
        InputTextModule,
        ButtonModule
    ],
})
export class PrimeModule { }
