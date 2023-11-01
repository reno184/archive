import { TestBed } from '@angular/core/testing';

import { MapInteractiveService } from './map-interactive.service';

describe('MapInteractiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapInteractiveService = TestBed.get(MapInteractiveService);
    expect(service).toBeTruthy();
  });
});
