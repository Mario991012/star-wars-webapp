import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * `FilterFormComponent` is a standalone Angular component that provides a dynamic filter form.
 * The form's structure is defined by the `fields` input, and it emits filter values whenever the form changes.
 * 
 * @remarks
 * The form is built dynamically based on the provided `fields` input. It listens for form value changes
 * and emits the current form values through the `filterChanged` output. The component automatically
 * cleans up the subscription when it is destroyed.
 *
 * @example
 * Example usage:
 * ```html
 * <app-filter-form [fields]="filterFields" (filterChanged)="onFilterChange($event)"></app-filter-form>
 * ```
 *
 * @example
 * Example of `filterFields` in a component:
 * ```typescript
 * filterFields: IFilterForm[] = [
 *   { formControlName: 'name', label: 'Name' },
 *   { formControlName: 'age', label: 'Age' }
 * ];
 * ```
 * 
 * @decorator `@Component`
 */
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
export class FilterFormComponent implements OnInit, OnDestroy {
  /**
   * Input that defines the form fields. Each field is represented by an object
   * implementing the `IFilterForm` interface, which provides the `formControlName`
   * and other metadata for each control.
   */
  @Input() fields: IFilterForm[] = [];

  /**
   * The reactive form group that holds the filter form controls.
   */
  filterForm!: FormGroup;

  /**
   * Output event that emits the current form values whenever a form control's value changes.
   */
  @Output() filterChanged = new EventEmitter<Record<string, any>>();

  /**
   * A subject used to manage the unsubscription from the form's value changes when the component is destroyed.
   */
  private destroy$ = new Subject<void>();

  /**
   * Initializes the `FilterFormComponent` with `FormBuilder` to create the reactive form.
   * 
   * @param fb - An instance of `FormBuilder` used to create the reactive form group.
   */
  constructor(private fb: FormBuilder) {}

  /**
   * It initializes the form based on the `fields` input and sets up a subscription
   * to listen for value changes in the form.
   */
  ngOnInit(): void {
    this.initializeForm();
    this.setupValueChangesSubscription();
  }

  /**
   * It emits a signal to complete the `destroy$` subject, cleaning up the subscription to the form's value changes.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initializes the form group by creating form controls based on the `fields` input.
   * Each control's initial value is set to an empty string.
   */
  private initializeForm(): void {
    const formControls = this.fields.reduce((controls, field) => {
      controls[field.formControlName] = [''];
      return controls;
    }, {} as Record<string, any>);

    this.filterForm = this.fb.group(formControls);
  }

  /**
   * Subscribes to the form's value changes and emits the current form values via the `filterChanged` output.
   * The subscription is automatically unsubscribed when the component is destroyed.
   */
  private setupValueChangesSubscription(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.filterChanged.emit(value));
  }
}
