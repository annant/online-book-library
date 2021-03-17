export interface Book {
    id: string;
    name: string;
    author: string;
    pageCount: number;
    publishDate: string;
}

export interface FilterCriteria {
    authors: Array<string>;
    books: Array<string>;
    publishDate: string;
    pageCount: number;
    pageCountRangeType: RangeType;
}

export enum RangeType {
    greaterThan,
    lessThan,
    equal
}