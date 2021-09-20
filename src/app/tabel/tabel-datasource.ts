import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TabelItem {
  name: string;
  id: number;
  filo: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TabelItem[] = [
  {id: 1, name: 'Hydrogen', filo:'a'},
  {id: 2, name: 'Helium', filo:'a'},
  {id: 3, name: 'Lithium', filo:'a'},
  {id: 4, name: 'Beryllium', filo:'a'},
  {id: 5, name: 'Boron', filo:'a'},
  {id: 6, name: 'Carbon', filo:'a'},
  {id: 7, name: 'Nitrogen', filo:'a'},
  {id: 8, name: 'Oxygen', filo:'a'},
  {id: 9, name: 'Fluorine', filo:'a'},
  {id: 10, name: 'Neon', filo:'a'},
  {id: 11, name: 'Sodium', filo:'a'},
  {id: 12, name: 'Magnesium', filo:'a'},
  {id: 13, name: 'Aluminum', filo:'a'},
  {id: 14, name: 'Silicon', filo:'a'},
  {id: 15, name: 'Phosphorus', filo:'a'},
  {id: 16, name: 'Sulfur', filo:'a'},
  {id: 17, name: 'Chlorine', filo:'a'},
  {id: 18, name: 'Argon', filo:'a'},
  {id: 19, name: 'Potassium', filo:'a'},
  {id: 20, name: 'Calcium', filo:'a'},
];

/**
 * Data source for the Tabel view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TabelDataSource extends DataSource<TabelItem> {
  data: TabelItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TabelItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TabelItem[]): TabelItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TabelItem[]): TabelItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
