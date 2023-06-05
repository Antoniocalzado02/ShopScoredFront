import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticuloComponent } from './edit-articulo.component';

describe('EditArticuloComponent', () => {
  let component: EditArticuloComponent;
  let fixture: ComponentFixture<EditArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
