import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPollComponent } from './nav-poll.component';

describe('NavPollComponent', () => {
  let component: NavPollComponent;
  let fixture: ComponentFixture<NavPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavPollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
