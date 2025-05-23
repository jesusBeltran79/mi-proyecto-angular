import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConnectFourResultData {
  winner: 'red' | 'yellow';
}

@Component({
  selector: 'app-connect-four-result',
  templateUrl: './connect-four-result.component.html',
  standalone: false,
  styleUrls: ['./connect-four-result.component.css']  // ← apuntamos al .css
})
export class ConnectFourResultComponent {
  constructor(
    public dialogRef: MatDialogRef<ConnectFourResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConnectFourResultData
  ) {}

  onRestart(): void {
    this.dialogRef.close('restart');
  }

  onMenu(): void {
    this.dialogRef.close('menu');
  }
}
