import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';                               // ← Nuevo
import { ConnectFourResultComponent } from '../connect-four-result/connect-four-result.component';

type CellColor = '' | 'red' | 'yellow';

@Component({
  selector: 'app-connect-four',
  templateUrl: './connect-four.component.html',
  standalone: false,
  styleUrls: ['./connect-four.component.css']
})
export class ConnectFourComponent implements OnInit {
  board: CellColor[][] = [];
  currentPlayer: CellColor = 'red';
  finished = false;

  constructor(
    private dialog: MatDialog,
    private router: Router                                               // ← Inyectamos Router
  ) {}

  ngOnInit(): void {
    this.restart();
  }

  restart(): void {
    this.finished = false;
    this.board = Array.from({ length: 6 }, () => Array<CellColor>(7).fill(''));
    this.currentPlayer = 'red';
  }

  dropDisc(j: number): void {
    if (this.finished) return;
    for (let i = 5; i >= 0; i--) {
      if (this.board[i][j] === '') {
        this.board[i][j] = this.currentPlayer;
        if (this.checkWin(i, j)) {
          this.finished = true;
          this.openResultDialog(this.currentPlayer);
        } else {
          this.currentPlayer = this.currentPlayer === 'red' ? 'yellow' : 'red';
        }
        break;
      }
    }
  }

  private openResultDialog(winner: CellColor): void {
    const ref = this.dialog.open(ConnectFourResultComponent, {
      data: { winner },
      disableClose: true
    });
    ref.afterClosed().subscribe(result => {
      if (result === 'restart') {
        this.restart();
      } else if (result === 'menu') {
        this.router.navigate(['/']);                                     // ← Navega al catálogo
      }
    });
  }

  private checkWin(i: number, j: number): boolean {
    return (
      this.horizontalWon(i, j) ||
      this.verticalWon(i, j) ||
      this.diagonalLtrWon(i, j) ||
      this.diagonalRtlWon(i, j)
    );
  }

  private horizontalWon(i: number, j: number): boolean {
    let count = 1;
    for (let c = j - 1; c >= 0 && this.board[i][c] === this.currentPlayer; c--) count++;
    for (let c = j + 1; c < 7 && this.board[i][c] === this.currentPlayer; c++) count++;
    return count >= 4;
  }

  private verticalWon(i: number, j: number): boolean {
    let count = 1;
    for (let r = i + 1; r < 6 && this.board[r][j] === this.currentPlayer; r++) count++;
    return count >= 4;
  }

  private diagonalLtrWon(i: number, j: number): boolean {
    let count = 1;
    for (let r = i - 1, c = j - 1; r >= 0 && c >= 0 && this.board[r][c] === this.currentPlayer; r--, c--) count++;
    for (let r = i + 1, c = j + 1; r < 6 && c < 7 && this.board[r][c] === this.currentPlayer; r++, c++) count++;
    return count >= 4;
  }

  private diagonalRtlWon(i: number, j: number): boolean {
    let count = 1;
    for (let r = i - 1, c = j + 1; r >= 0 && c < 7 && this.board[r][c] === this.currentPlayer; r--, c++) count++;
    for (let r = i + 1, c = j - 1; r < 6 && c >= 0 && this.board[r][c] === this.currentPlayer; r++, c--) count++;
    return count >= 4;
  }
}
