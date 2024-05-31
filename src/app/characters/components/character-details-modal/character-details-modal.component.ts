import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../../shared/models/marvel-api/core/marvel-api-character.model';

@Component({
  selector: 'marvel-character-details-modal',
  templateUrl: './character-details-modal.component.html',
  styleUrl: './character-details-modal.component.scss'
})
export class CharacterDetailsModalComponent {
  @Input() character!: Character;
  @Output() closeModal: EventEmitter<null> = new EventEmitter<null>();

  emitCloseModal() {
    this.closeModal.emit(null);
  }
}
