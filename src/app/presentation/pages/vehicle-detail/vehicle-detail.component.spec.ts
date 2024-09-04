import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { VehicleService } from '../../../data/graphql/services/vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { IVehicle } from '../../../data/graphql/interfaces/vehicle.interface';
import { By } from '@angular/platform-browser';

describe('VehicleDetailComponent', () => {
  let component: VehicleDetailComponent;
  let fixture: ComponentFixture<VehicleDetailComponent>;
  let vehicleServiceSpy: jasmine.SpyObj<VehicleService>;
  let activatedRouteSpy: any;

  beforeEach(async () => {
    const vehicleServiceMock = jasmine.createSpyObj('VehicleService', ['getVehicleById']);
    const activatedRouteMock = {
      paramMap: of({ get: () => '1' }) // Mocking route param 'id'
    };

    await TestBed.configureTestingModule({
      imports: [VehicleDetailComponent],
      providers: [
        { provide: VehicleService, useValue: vehicleServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleDetailComponent);
    component = fixture.componentInstance;
    vehicleServiceSpy = TestBed.inject(VehicleService) as jasmine.SpyObj<VehicleService>;
    activatedRouteSpy = TestBed.inject(ActivatedRoute);
  });

  const mockVehicle: IVehicle = {
    cargoCapacity: 110,
    consumables: '1 week',
    costInCredits: 150000,
    crew: '1',
    id: 'v1',
    model: 'T-65B',
    name: 'X-Wing',
    maxAtmospheringSpeed: 1050,
    passengers: '0',
    vehicleClass: 'Starfighter',
    manufacturers: ['Incom Corporation'],
    filmConnection: {
      films: [
        {
          created: '2024-01-01',
          director: 'George Lucas',
          edited: '2024-02-01',
          producers: ['Gary Kurtz', 'George Lucas'],
          releaseDate: '1977-05-25',
          title: 'A New Hope',
          episodeID: 4,
          id: 'f1',
          openingCrawl: 'It is a period of civil war...',
          characterConnection: {
            characters: [
              {
                name: 'Luke Skywalker',
                birthYear: '19BBY',
                eyeColor: 'Blue',
                gender: 'Male',
                height: 172,
                hairColor: 'Blond',
                skinColor: 'Fair',
                homeworld: { name: 'Tatooine' },
                starshipConnection: {
                  starships: [
                    {
                      name: 'X-Wing',
                      crew: '1',
                      passengers: '0',
                      consumables: '1 week',
                    },
                  ],
                },
              },
            ],
          },
          planetConnection: {
            planets: [
              { name: 'Tatooine' },
              { name: 'Yavin IV' },
            ],
          },
        },
      ],
    },
    pilotConnection: {
      pilots: [
        {
          name: 'Luke Skywalker',
        },
      ],
    },
  };

  const errorResponse = 'Error fetching vehicle data';

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getVehicleData with the correct id on init', fakeAsync(() => {
    vehicleServiceSpy.getVehicleById.and.returnValue(of(mockVehicle));

    fixture.detectChanges(); 
    tick();

    expect(vehicleServiceSpy.getVehicleById).toHaveBeenCalledWith('1');
    expect(component.loading).toBe(false);
    expect(component.vehicle$).toBeTruthy();
  }));

  it('should handle service error', fakeAsync(() => {
    vehicleServiceSpy.getVehicleById.and.returnValue(throwError(errorResponse));

    fixture.detectChanges();
    tick();

    expect(vehicleServiceSpy.getVehicleById).toHaveBeenCalled();
    expect(component.loading).toBe(false);
  }));

  it('should display vehicle details in the template', fakeAsync(() => {
    vehicleServiceSpy.getVehicleById.and.returnValue(of(mockVehicle));

    fixture.detectChanges();
    tick(); 

    fixture.detectChanges(); 

    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(titleElement.textContent).toContain('vehicle: X-Wing');
  }));
});
