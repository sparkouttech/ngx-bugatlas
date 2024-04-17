import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBugatlasComponent } from './ngx-bugatlas.component';

describe('NgxBugatlasComponent', () => {
  let component: NgxBugatlasComponent;
  let fixture: ComponentFixture<NgxBugatlasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxBugatlasComponent]
    });
    fixture = TestBed.createComponent(NgxBugatlasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
