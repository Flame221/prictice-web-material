import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '.././services/api.service';
import { DialogmakedataComponent } from '../dialogmakedata/dialogmakedata.component';
@Component({
  selector: 'app-contacttable',
  templateUrl: './contacttable.component.html',
  styleUrls: ['./contacttable.component.css']
})
export class ContacttableComponent implements OnInit {
  @Output() editContactEvent = new EventEmitter();
  displayedColumns: string[] = ['fullName', 'phoneNumber', 'email', 'favoriteFood', 'actions'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private api: ApiService) { }
  getAllContacts() {
    this.api.getProduct()
    .subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        console.log(result);
      },
      error: (err) => {
        alert(`Error while getting contacts: ${err}`);
      },
    })
  }
  ngOnInit(): void {
    this.getAllContacts(); 
  }

  editContact(element: any){
    this.editContactEvent.emit(element);
  }
  deleteContact(id: number){
    this.api.deleteContact(id).subscribe({
      next: (result) => {
        alert(`Successfully deleted contact: ${result}`);
        this.getAllContacts();
      },
      error: (err) => {
        alert(`Error while deleting contact: ${err}`);
      },
    });
  }

}
