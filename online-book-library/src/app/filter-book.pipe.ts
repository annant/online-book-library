import { Pipe, PipeTransform } from '@angular/core';
import { FilterCriteria, Book, RangeType } from './app.model';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Pipe({
  name: 'filterBook',
  pure: false
})
export class FilterBookPipe implements PipeTransform {

  transform(books: Array<Book>, searchText: string, filterCriteria: FilterCriteria): Array<Book> {
    if(searchText) {
      books = books.filter(book => book.author.toLowerCase().includes(searchText.toLowerCase()) ||
        book.name.toLowerCase().includes(searchText.toLowerCase()) || 
        (!isNaN(+searchText) && book.pageCount === +searchText));
    }
    
    if(filterCriteria.authors?.length) {
      books = books.filter(book => filterCriteria.authors.includes(book.author.toLowerCase()));
    }
    
    if(filterCriteria.books?.length) {
      books = books.filter(book => filterCriteria.books.includes(book.name.toLowerCase()));
    }
    
    if(filterCriteria.publishDate) {
      books = books.filter(book => new Date(book.publishDate).getTime() === new Date(filterCriteria.publishDate).getTime());
    }
    if(filterCriteria.pageCount != null) {
      books = books.filter(book => this.checkForPageCountCriteria(book, filterCriteria));
    }
    return books;
  }

  checkForPageCountCriteria(book: Book, filterCriteria: FilterCriteria): boolean {
    switch(filterCriteria.pageCountRangeType) {
      case RangeType.equal:
        return book.pageCount === +filterCriteria.pageCount;
      case RangeType.greaterThan:
        return book.pageCount > +filterCriteria.pageCount;
      case RangeType.lessThan:
        return book.pageCount < +filterCriteria.pageCount;
    }
  }

}
