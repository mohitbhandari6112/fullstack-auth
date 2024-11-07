import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageroleformComponent } from './manageroleform.component';

describe('ManageroleformComponent', () => {
  let component: ManageroleformComponent;
  let fixture: ComponentFixture<ManageroleformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageroleformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageroleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
