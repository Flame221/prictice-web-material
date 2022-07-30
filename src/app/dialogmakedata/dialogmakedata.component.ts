import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialogmakedata',
  templateUrl: './dialogmakedata.component.html',
  styleUrls: ['./dialogmakedata.component.css']
})
export class DialogmakedataComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  productForm !: FormGroup;
  
  actionBtn : string = "Save";
  
  constructor(
    private formBuilder: FormBuilder,
    private api : ApiService,
    private dialogRef: MatDialogRef<DialogmakedataComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      fullName : ['', Validators.required],
      phoneNumber : ['', Validators.required],
      email : ['', Validators.required],
      favoriteFood : ['', Validators.required],
    })
    if (this.editData) {
      this.actionBtn = "Edit";
      this.productForm.controls['fullName'].setValue(this.editData.fullName);
      this.productForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.productForm.controls['email'].setValue(this.editData.email);
      this.productForm.controls['favoriteFood'].setValue(this.editData.favoriteFood);
    }
  }
  addContact(){
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postContact(this.productForm.value)
        .subscribe({
          next: (res) => {
            alert("Contact added successfully!");
            this.productForm.reset();
            this.dialogRef.close('save');
        },
        error: (err) => {
          alert(`Error while adding the contact: ${err.message}`);
        }});
      }
    }
    else {
      this.updateContact();
    }
  }
  updateContact() {
    if (this.productForm.valid){
      this.api.putContact(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Product edited successfully! " + res);
          this.productForm.reset();
          this.dialogRef.close('edit');
        },
        error: (err) => {
          alert("Product edit failed! " + err.message)
        }
      })
    }
  }
  onClose() {
    this.productForm.reset();
    this.dialogRef.close('save');
  }

}
