import { Component } from '@angular/core';
import { Router }    from '@angular/router';

@Component({
  selector: 'app-menu-pizzatron',
  templateUrl: './menu-pizzatron.component.html',
  standalone: false,
  styleUrls: ['./menu-pizzatron.component.css']
})
export class MenuPizzatronComponent {
  constructor(private router: Router) {}

  start() { this.router.navigate(['games/pizzatron/play']); }
  back()  { this.router.navigate(['/']); }
}
