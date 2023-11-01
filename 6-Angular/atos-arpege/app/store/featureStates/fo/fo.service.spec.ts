import { TestBed } from '@angular/core/testing';
import { FoService } from './fo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FoService', () => {
    let service: FoService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FoService],
        });
        service = TestBed.get(FoService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve FO from API via GET', () => {
        const dummy: any[] = [
            { FO_NAME: 'FO 1' },
            { FO_NAME: 'FO 2' }
        ];
        service.getAll().subscribe((datas: any[]) => {
            expect(datas.length).toBe(3);
            expect(datas).toEqual(dummy);
        });
        const request = httpMock.expectOne('api/fo');
        expect(request.request.method).toBe('GET');
    });
});
