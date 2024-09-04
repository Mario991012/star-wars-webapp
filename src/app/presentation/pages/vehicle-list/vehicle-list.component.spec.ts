import { TestBed, ComponentFixture } from '@angular/core/testing';
import { VehicleListComponent } from './vehicle-list.component';
import { VehicleService } from '../../../data/graphql/services/vehicle.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FilterFormComponent } from '../../components/filters/filter-form/filter-form.component';
import { VehicleCardComponent } from '../../components/cards/vehicle-card/vehicle-card.component';
import { IAllVehiclesData } from '../../../data/graphql/interfaces/vehicle.interface';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let vehicleServiceSpy: jasmine.SpyObj<VehicleService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockData: IAllVehiclesData = {
    data: {
      allVehicles: {
        totalCount: 2,
        vehicles: [
          {
            cargoCapacity: 50000,
            consumables: '2 months',
            costInCredits: 150000,
            crew: '2',
            id: '1',
            model: 'T-65 X-wing starfighter',
            name: 'X-Wing',
            maxAtmospheringSpeed: 1050,
            passengers: '0',
            vehicleClass: 'Starfighter',
            manufacturers: ['Incom Corporation'],
            filmConnection: {
              films: [
                {
                  created: '1977-05-25',
                  director: 'George Lucas',
                  edited: '1977-06-01',
                  producers: ['Gary Kurtz', 'George Lucas'],
                  releaseDate: '1977-05-25',
                  title: 'Star Wars: Episode IV - A New Hope',
                  episodeID: 4,
                  id: 'SW-1',
                  openingCrawl: 'It is a period of civil war...',
                  characterConnection: {
                    characters: [
                      {
                        birthYear: '19BBY',
                        eyeColor: 'Blue',
                        gender: 'Male',
                        hairColor: 'Blond',
                        height: 172,
                        name: 'Luke Skywalker',
                        skinColor: 'Fair',
                        starshipConnection: {
                          starships: [
                            {
                              consumables: '1 week',
                              crew: '1',
                              name: 'X-Wing',
                              passengers: '0'
                            }
                          ]
                        }
                      }
                    ]
                  },
                  planetConnection: {
                    planets: [
                      {
                        name: 'Tatooine'
                      }
                    ]
                  }
                }
              ]
            },
            pilotConnection: {
              pilots: [
                {
                  name: 'Luke Skywalker'
                }
              ]
            }
          },
          {
            cargoCapacity: 100000,
            consumables: '1 year',
            costInCredits: 350000,
            crew: '4',
            id: '2',
            model: 'YT-1300 light freighter',
            name: 'Millennium Falcon',
            maxAtmospheringSpeed: 1200,
            passengers: '6',
            vehicleClass: 'Light Freighter',
            manufacturers: ['Corellian Engineering Corporation'],
            filmConnection: {
              films: [
                {
                  created: '1980-05-21',
                  director: 'Irvin Kershner',
                  edited: '1980-06-01',
                  producers: ['Gary Kurtz'],
                  releaseDate: '1980-05-21',
                  title: 'Star Wars: Episode V - The Empire Strikes Back',
                  episodeID: 5,
                  id: 'SW-2',
                  openingCrawl: 'It is a dark time for the Rebellion...',
                  characterConnection: {
                    characters: [
                      {
                        birthYear: '29BBY',
                        eyeColor: 'Brown',
                        gender: 'Male',
                        hairColor: 'Brown',
                        height: 180,
                        name: 'Han Solo',
                        skinColor: 'Light',
                        starshipConnection: {
                          starships: [
                            {
                              consumables: '2 months',
                              crew: '4',
                              name: 'Millennium Falcon',
                              passengers: '6'
                            }
                          ]
                        }
                      }
                    ]
                  },
                  planetConnection: {
                    planets: [
                      {
                        name: 'Hoth'
                      }
                    ]
                  }
                }
              ]
            },
            pilotConnection: {
              pilots: [
                {
                  name: 'Han Solo'
                },
                {
                  name: 'Chewbacca'
                }
              ]
            }
          }
        ]
      }
    }
  };

  beforeEach(() => {
    const vehicleServiceMock = jasmine.createSpyObj('VehicleService', ['getAllVehiclesMetadata']);
    vehicleServiceMock.getAllVehiclesMetadata.and.returnValue(of([]));

    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FilterFormComponent,
        VehicleCardComponent,
        VehicleListComponent,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: VehicleService, useValue: vehicleServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;
    vehicleServiceSpy = TestBed.inject(VehicleService) as jasmine.SpyObj<VehicleService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getVehiclesMetadata on init', () => {
    const spy = spyOn<any>(component, 'getVehiclesMetadata');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should fetch vehicles and handle success', () => {
    vehicleServiceSpy.getAllVehiclesMetadata.and.returnValue(of(mockData.data.allVehicles.vehicles));

    component.ngOnInit();

    component.vehicles$.subscribe((vehicles) => {
      expect(vehicles).toEqual(mockData.data.allVehicles.vehicles);
    });
  });

  it('should navigate to vehicle details on goToDetails', () => {
    const vehicle = mockData.data.allVehicles.vehicles[0];

    component.goToDetails(vehicle);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/star-wars/vehicles/details/', vehicle.id]);
  });

  it('should filter vehicles based on the provided filters', () => {
    vehicleServiceSpy.getAllVehiclesMetadata.and.returnValue(of(mockData.data.allVehicles.vehicles));
    component.ngOnInit();

    const filters = { name: 'X-Wing', vehicleClass: 'Starfighter', model: '', manufacturers: '' };

    component.onFilterChanged(filters);

    component.filteredVehicles$.subscribe((filteredVehicles) => {
      expect(filteredVehicles.length).toBe(1);
      expect(filteredVehicles[0].name).toBe('X-Wing');
    });
  });

  it('should complete destroy$ subject on ngOnDestroy', () => {
    const spy = spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should render vehicle cards when vehicles are present', () => {
    vehicleServiceSpy.getAllVehiclesMetadata.and.returnValue(of(mockData.data.allVehicles.vehicles));

    fixture.detectChanges();

    const vehicleCards = fixture.nativeElement.querySelectorAll('app-vehicle-card');
    expect(vehicleCards.length).toBe(2);
  });
});
