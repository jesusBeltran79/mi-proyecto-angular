import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  standalone: false,
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {
  showInstructions = false;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onPlay(): void {
    this.router.navigate(['games/bean-counters/play']);
  }

  onInstructions(): void {
    this.showInstructions = true;
  }

  onCloseInstructions(): void {
    this.showInstructions = false;
  }

  onBack(): void {                     // Nuevo método
    window.location.href = '/';
  }
}
