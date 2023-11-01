import { TestBed } from '@angular/core/testing';
import { GeoElementService } from './geo-element.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

let service: GeoElementService;
let httpMock: HttpTestingController;

describe('GeoElementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeoElementService],
    });
    service = TestBed.get(GeoElementService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve Geo-element array from API via GET', () => {
    const dummy: any[] = ['test mock'];
    service.getAll().subscribe((datas: any[]) => {
      expect(datas.length).toBe(1);
      expect(datas).toEqual(dummy);
    });
    const request = httpMock.expectOne('api/geo-element');
    expect(request.request.method).toBe('GET');
  });
});
