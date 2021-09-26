import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TabelDataSource, TabelItem } from './tabel-datasource';
import { RotasService } from '../services/rotas.service';
import { TabelaRota } from '../models/tabelaRota.model';

@Component({
  selector: 'app-tabel',
  templateUrl: './tabel.component.html',
  styleUrls: ['./tabel.component.css']
})
export class TabelComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TabelItem>;
  dataSource: TabelDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'filo'];

  constructor(private service: RotasService) {
    this.dataSource = new TabelDataSource();
  }

  ngOnInit(): void {
    this.service.todas().subscribe((tabelaRota: TabelaRota[]) => {
      console.table(tabelaRota);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
