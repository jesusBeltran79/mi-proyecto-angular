import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-instruction-modal',
  templateUrl: './instruction-modal.component.html',
  standalone: false,
  styleUrls: ['./instruction-modal.component.css']
})
export class InstructionModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  onClose(): void {
    this.close.emit();
  }
}
