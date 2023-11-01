import { TestBed } from '@angular/core/testing';
import { SetupFormService } from './setup-form.service';
import { FormBuilder } from '@angular/forms';

describe('SetupFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FormBuilder]
    })
  );

  it('should be created', () => {
    const service: SetupFormService = TestBed.get(SetupFormService);
    expect(service).toBeTruthy();
  });
});
