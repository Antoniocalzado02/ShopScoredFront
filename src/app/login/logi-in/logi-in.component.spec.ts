import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogiInComponent } from './logi-in.component';

describe('LogiInComponent', () => {
  let component: LogiInComponent;
  let fixture: ComponentFixture<LogiInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogiInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogiInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
