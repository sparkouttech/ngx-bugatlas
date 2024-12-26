// bugatlas.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { NgxBugatlasComponent } from './ngx-bugatlas.component';

describe('BugatlasComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxBugatlasComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NgxBugatlasComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});