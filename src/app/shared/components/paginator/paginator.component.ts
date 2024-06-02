import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'marvel-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  // Minimum value is 1
  @Input() currentPage!: number;
  // The amount of items expected per page (this is static)
  @Input() pageSize!: number;
  // The amount of items in the current page (this is dynamic)
  @Input() totalItems!: number;
  @Input() showFirstLastButtons = true;
  @Input() showPrevNextButtons = true;

  @Output() pageChange = new EventEmitter<{ currentPage: number, pageSize: number; }>();

  constructor() {}

  getTotalPages(): number {
    return this.pageSize === 0 ? 1 : Math.ceil(this.totalItems / this.pageSize);
  }

  onPageChange(page: number) {
    this.pageChange.emit({ currentPage: page, pageSize: this.pageSize });
  }
}
