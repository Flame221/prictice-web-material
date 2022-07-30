import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmakedataComponent } from './dialogmakedata.component';

describe('DialogmakedataComponent', () => {
  let component: DialogmakedataComponent;
  let fixture: ComponentFixture<DialogmakedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmakedataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogmakedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
