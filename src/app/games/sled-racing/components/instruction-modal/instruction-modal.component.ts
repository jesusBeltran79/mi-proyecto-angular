import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-instruction-modal',
  templateUrl: './instruction-modal.component.html',
  standalone: false,
  styleUrls: ['./instruction-modal.component.css']
})
export class InstructionModalComponent {
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
