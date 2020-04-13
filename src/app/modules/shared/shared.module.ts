import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {ChartsModule} from 'ng2-charts';
import { AppInputComponent } from './app-components/app-input/app-input.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const MODULES = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  ChartsModule,
  FontAwesomeModule,
  HttpClientModule,
];

const DIRECTIVES = [
];

const COMPONENTS = [
  HeaderComponent,
  AppInputComponent
];

@NgModule({
  declarations: [
    ...DIRECTIVES,
    ...COMPONENTS,
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES,
    ...DIRECTIVES,
    ...COMPONENTS
  ]
})
export class SharedModule {
}
