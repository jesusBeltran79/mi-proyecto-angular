import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPizzatronComponent } from './menu-pizzatron.component';

describe('MenuPizzatronComponent', () => {
  let component: MenuPizzatronComponent;
  let fixture: ComponentFixture<MenuPizzatronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuPizzatronComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPizzatronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
