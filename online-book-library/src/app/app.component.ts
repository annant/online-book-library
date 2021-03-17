import { Component } from '@angular/core';
import { Book, FilterCriteria, RangeType } from './app.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
const books: Array<Book> = require('../assets/db/books-collection.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  filterCriteria: FilterCriteria;
  searchText: string;
  showFilterPanelInMobileView: boolean;
  
  ngOnInit() {
    this.setFilterCriteria();
  }

  setFilterCriteria() {
    const previousFilterState = JSON.parse(sessionStorage.getItem('filterCriteria'));
    if(previousFilterState) {
      this.searchText = previousFilterState.searchText;
      this.filterCriteria = {
        authors: previousFilterState.authors,
        books: previousFilterState.books,
        pageCount: previousFilterState.pageCount,
        pageCountRangeType: previousFilterState.pageCountRangeType || RangeType.equal,
        publishDate: previousFilterState.publishDate
      }
    } else {
      this.resetFilterCriteria();
    }
  }

  get bookList(): Array<Book> {
    return books;
  }

  get authors(): Array<string> {
    return Array.from(new Set(books.map(book => book.author)));
  }

  get rangeType() {
    return RangeType;
  }

  isAuthorSelected(author: string) {
    return this.filterCriteria.authors.includes(author.toLowerCase());
  }

  isBookSelected(book: Book) {
    return this.filterCriteria.books.includes(book.name.toLowerCase());
  }

  filterListByAuthorPreference(checkBoxEvent: MatCheckboxChange) {
    if(checkBoxEvent.checked) {      
      this.searchText='';
      this.filterCriteria.authors.push(checkBoxEvent.source.value.toLowerCase())
    } else {
      const index = this.filterCriteria.authors.indexOf(checkBoxEvent.source.value.toLowerCase());
      if(index > -1) {
        this.filterCriteria.authors.splice(index, 1);
      }
    }
    this.saveState();
  }

  filterListByBookPreference(checkBoxEvent: MatCheckboxChange) {
    if(checkBoxEvent.checked) {
      this.searchText='';
      this.filterCriteria.books.push(checkBoxEvent.source.value.toLowerCase())
    } else {
      const index = this.filterCriteria.books.indexOf(checkBoxEvent.source.value.toLowerCase());
      if(index > -1) {
        this.filterCriteria.books.splice(index, 1);
      }
    }
    this.saveState();
  }

  saveState() {
    sessionStorage.setItem('filterCriteria', JSON.stringify({...this.filterCriteria, searchText: this.searchText}));
  }

  selectRangeType(type: RangeType) {
    this.filterCriteria.pageCountRangeType = type;
    this.saveState();
  }

  resetFilterCriteria() {
    this.filterCriteria = {
      authors: [],
      books: [],
      pageCount: null,
      publishDate: null,
      pageCountRangeType: RangeType.equal
    };
  }
}
