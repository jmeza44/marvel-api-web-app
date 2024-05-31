import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../../shared/models/marvel-api/core/marvel-api-character.model';

@Component({
  selector: 'marvel-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  @Input() character!: Character;
  @Output() characterDetailsClicked: EventEmitter<Character> = new EventEmitter<Character>();

  emitCharacter() {
    this.characterDetailsClicked.emit(this.character);
  }
}
