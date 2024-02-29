import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Input() paginationTable: number[] | null | undefined;
  @Output() pageChange = new EventEmitter<number>();

  constructor() { 
    
  }

  onPageChange(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.pageChange.emit(pageNumber);
    }
  }

  onNext() {
    this.onPageChange(this.currentPage + 1);    
  }

  onPrevious() {
    this.onPageChange(this.currentPage - 1);
  }

  isActivePage(page: number): boolean {
    return this.currentPage === page;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }
}
