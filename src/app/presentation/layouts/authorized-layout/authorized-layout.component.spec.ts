import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';
import { AuthorizedLayoutComponent } from './authorized-layout.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { By } from '@angular/platform-browser';

describe('AuthorizedLayoutComponent', () => {
  let component: AuthorizedLayoutComponent;
  let fixture: ComponentFixture<AuthorizedLayoutComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        AuthorizedLayoutComponent,
        NoopAnimationsModule,  
        RouterModule.forRoot([]),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedLayoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render SidebarComponent with correct routes', () => {
    const sidebarDebugElement = fixture.debugElement.query(By.directive(SidebarComponent));
    expect(sidebarDebugElement).toBeTruthy();
    
    const sidebarComponent = sidebarDebugElement.componentInstance as SidebarComponent;
    
    expect(sidebarComponent.routes).toEqual(component.routes);
  });

  it('should call goToRoute and navigate to the selected route', () => {
    const route = '/star-wars/film-list';
    spyOn(router, 'navigate');
    component.goToRoute(route);
    
    expect(component.routes.find(r => r.route === route)?.selected).toBeTrue();
    expect(router.navigate).toHaveBeenCalledWith([route]);
  });
});
