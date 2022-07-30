import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table';
import { DialogmakedataComponent } from './dialogmakedata/dialogmakedata.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import { ContacttableComponent } from './contacttable/contacttable.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild(ContacttableComponent, {static: true}) child!: ContacttableComponent;
  title = 'prictice-web-material';
  constructor(private dialog: MatDialog,) {}


  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogmakedataComponent, {
      width: '30%',
      
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save') {
        this.child.getAllContacts();
      }
    })
  }

  editContact(element: any){
    this.dialog.open(DialogmakedataComponent, {
      width: '30%',
      data: element,
    }).afterClosed().subscribe(result => {
      if (result === 'edit') {
        this.child.getAllContacts();
      }
    });
  }
  
  

}
