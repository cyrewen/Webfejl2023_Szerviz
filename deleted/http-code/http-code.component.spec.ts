import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpCodeComponent } from './http-code.component';

describe('HttpCodeComponent', () => {
  let component: HttpCodeComponent;
  let fixture: ComponentFixture<HttpCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
