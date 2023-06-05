import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticuloComponent } from './add-articulo.component';

describe('AddArticuloComponent', () => {
  let component: AddArticuloComponent;
  let fixture: ComponentFixture<AddArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
