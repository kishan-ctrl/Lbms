import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcseComponent } from './fcse.component';

describe('FcseComponent', () => {
  let component: FcseComponent;
  let fixture: ComponentFixture<FcseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FcseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FcseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
