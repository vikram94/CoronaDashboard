import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `
    <div class="input-container">
      <fa-icon class="prefixIcon" *ngIf="prefixIcon" [icon]="prefixIcon">
      </fa-icon>
      <input
        [ngClass]="{ error: control.dirty && control.invalid }"
        [formControl]="control"
        [name]="name"
        [type]="type"
        [placeholder]="placeholder"
      />
    </div>
  `,
  styleUrls: ['./app-input.component.scss']
})
export class AppInputComponent implements OnInit {

  constructor() { }
  @Input()
  control: FormControl;
  @Input()
  name: string;
  @Input()
  type: string;
  @Input()
  placeholder: string;
  @Input()
  prefixIcon: string;
  ngOnInit(): void {
  }

}
