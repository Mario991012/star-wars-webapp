import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IFilterForm } from '../../../interfaces/filter-form.interface';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
})
export class FilterFormComponent implements OnInit {
  @Input() fields: IFilterForm[] = [];
  filterForm!: FormGroup;

  @Output() filterChanged = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const formControls = this.fields.reduce((controls, field) => {
      controls[field.formControlName] = [''];
      return controls;
    }, {} as { [key: string]: any });

    this.filterForm = this.fb.group(formControls);

    this.filterForm.valueChanges.subscribe((value) => {
      this.filterChanged.emit(value);
    });
  }
}
