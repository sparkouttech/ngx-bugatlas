import { TestBed } from '@angular/core/testing';

import { NgxBugatlasService } from './ngx-bugatlas.service';

describe('NgxBugatlasService', () => {
  let service: NgxBugatlasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxBugatlasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
