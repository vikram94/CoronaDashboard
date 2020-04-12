import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

const MODULES = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
];

const DIRECTIVES = [
];

const COMPONENTS = [
  HeaderComponent
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
