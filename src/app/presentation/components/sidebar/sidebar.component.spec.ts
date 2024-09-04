import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouteData } from '../../interfaces/route-data.interface';
import { LoginService } from '../../../data/auth/services/login/login.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let router: Router;
  let loginService: jasmine.SpyObj<LoginService>;

  const mockRoutes: RouteData[] = [
    { route: '/films', title: 'Films', icon: 'movie', selected: false },
    { route: '/people', title: 'People', icon: 'people', selected: false },
  ];

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['clearToken']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule.forRoot([]),
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        NoopAnimationsModule, 
        SidebarComponent,
      ],
      providers: [{ provide: LoginService, useValue: loginServiceSpy }],
    }).compileComponents();

    router = TestBed.inject(Router);
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    component.routes = mockRoutes;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the selected route when returnRoute is called', () => {
    spyOn(component.selectedRouteEmitter, 'emit');
    const route: RouteData = mockRoutes[0];

    component.returnRoute(route);

    expect(component.selectedRouteEmitter.emit).toHaveBeenCalledWith(route.route);
  });

  it('should call logout and navigate to login', () => {
    spyOn(router, 'navigate');
    component.logout();

    expect(loginService.clearToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should highlight the selected route', () => {
    const route: RouteData = mockRoutes[1];
    component.returnRoute(route);
    fixture.detectChanges();

    expect(component.routes[1].selected).toBeTrue();
    expect(fixture.nativeElement.querySelector('.selected').textContent).toContain('People');
  });

  it('should display routes correctly', () => {
    const compiled = fixture.nativeElement;
    const items = compiled.querySelectorAll('mat-list-item');

    expect(items.length).toBe(mockRoutes.length + 1);  // +1 for the logout button
    expect(items[0].textContent).toContain('Films');
    expect(items[1].textContent).toContain('People');
  });
});
