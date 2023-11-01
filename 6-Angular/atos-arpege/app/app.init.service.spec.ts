import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppInitService } from './app.init.service';

describe('FoService', () => {
  let service: AppInitService;
  let httpMock: HttpTestingController;

  // const spyDataService = jasmine.createSpyObj('spyDataService', ['getInfo']);
  // spyDataService.getInfo.and.returnValue( Observable.of('Hello') );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppInitService]
    });
    service = TestBed.get(AppInitService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
