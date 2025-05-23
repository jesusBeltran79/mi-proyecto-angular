import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectFourResultComponent } from './connect-four-result.component';

describe('ConnectFourResultComponent', () => {
  let component: ConnectFourResultComponent;
  let fixture: ComponentFixture<ConnectFourResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectFourResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectFourResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
