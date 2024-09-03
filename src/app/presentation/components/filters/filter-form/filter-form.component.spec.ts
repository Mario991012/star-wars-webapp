import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterFormComponent } from './filter-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IFilterForm } from '../../../interfaces/filter-form.interface';
import { By } from '@angular/platform-browser';

describe('FilterFormComponent', () => {
  let component: FilterFormComponent;
  let fixture: ComponentFixture<FilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FilterFormComponent,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFormComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group with the provided fields', () => {
    const fields: IFilterForm[] = [
      { label: 'Name', formControlName: 'name' },
      { label: 'Age', formControlName: 'age' },
    ];

    component.fields = fields;
    fixture.detectChanges();

    expect(component.filterForm.contains('name')).toBeTrue();
    expect(component.filterForm.contains('age')).toBeTrue();
  });

  it('should emit filterChanged event when form value changes', () => {
    spyOn(component.filterChanged, 'emit');

    const fields: IFilterForm[] = [{ label: 'Name', formControlName: 'name' }];
    component.fields = fields;

    fixture.detectChanges();

    const inputDebugElement = fixture.debugElement.query(
      By.css(`#${fields[0].formControlName}`)
    );

    expect(inputDebugElement).toBeTruthy(
      'Expected input element to be in the DOM'
    );

    const inputElement = inputDebugElement.nativeElement;
    inputElement.value = 'John';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.filterChanged.emit).toHaveBeenCalledWith({ name: 'John' });
  });

  it('should render the correct number of input fields', () => {
    const fields: IFilterForm[] = [
      { label: 'Name', formControlName: 'name' },
      { label: 'Age', formControlName: 'age' },
      { label: 'Email', formControlName: 'email' },
    ];

    component.fields = fields;
    fixture.detectChanges();

    const inputElements = fixture.debugElement.queryAll(By.css('input'));
    expect(inputElements.length).toBe(fields.length);
  });
});
