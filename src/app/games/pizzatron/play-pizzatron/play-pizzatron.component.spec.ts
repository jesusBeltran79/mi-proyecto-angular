import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayPizzatronComponent } from './play-pizzatron.component';

describe('PlayPizzatronComponent', () => {
  let component: PlayPizzatronComponent;
  let fixture: ComponentFixture<PlayPizzatronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayPizzatronComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayPizzatronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
