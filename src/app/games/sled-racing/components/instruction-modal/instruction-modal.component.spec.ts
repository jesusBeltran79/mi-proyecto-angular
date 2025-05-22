// instruction-modal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-instruction-modal',
  templateUrl: './instruction-modal.component.html',
  styleUrls: ['./instruction-modal.component.css']
})
export class InstructionModalComponent {
  @Output() closed = new EventEmitter<void>();
  close() {
    this.closed.emit();
  }
}
