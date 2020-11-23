import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var UIkit: any;
import { requiredFileType } from '../requiredImageOnly'
import { ManageUserService } from '../manage-user.service'
import { User } from '../user-model';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  allUsersData: User[] = []
  submitted: boolean = false
  userForm: FormGroup;
  updateServiceButton = false;
  servicedata: {
    problem: string,
    method: string
  }[] = [];
  imageURL: string;
  file;
  submitService = false
  @ViewChild('userFormModal', { static: false }) userFormModal: ElementRef
  @ViewChild('switcher', { static: false }) switcher: ElementRef
  constructor(private fb: FormBuilder,
    private userService: ManageUserService) {
    this.userForm = this.fb.group({
      photo: ['', requiredFileType(["png", "jpeg", "jpg"])],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      problem: [''],
      method: ['']
    })
  }
  ngOnInit(): void {
    this.userService.getAllUser().subscribe(users => {
      this.allUsersData = users
      console.log(this.allUsersData)
    })

  }
  openUserModal() {
    this.servicedata = []
    this.userForm.reset();
    this.imageURL = ''
    localStorage.removeItem('userIdForUpdate');
    UIkit.modal(this.userFormModal.nativeElement).show();
    UIkit.switcher(this.switcher.nativeElement).show(0);
    this.submitted = false
  }

  showPreview(event) {
    this.imageURL = ''
    this.file = event.target.files[0];
    console.log('file', this.file)
    if (this.file) {
      var mimeType = event.target.files[0].type
      if (mimeType.match(/image\/*/) == null) {
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageURL = reader.result as string;
        }
        reader.readAsDataURL(this.file)
      }
    }

  }

  adduser() {
    this.userForm.get('problem').clearValidators()
    console.log(this.userForm.controls.problem.valid)
    this.submitted = true;
    const userData = this.userForm.value
    if (this.userForm.invalid) {
      return;
    }
    const user: User = {
      id: Math.floor(Date.now() / 1000).toString(),
      photo: this.imageURL,
      firstName: userData.firstname,
      lastName: userData.lastname,
      email: userData.email,
      mobile: userData.mobile,
      gender: userData.gender,
      service: this.servicedata

    }
    if (localStorage.getItem('userIdForUpdate')) {
      const id = localStorage.getItem('userIdForUpdate')
      const index = this.allUsersData.findIndex(user => user.id === id)
      this.allUsersData[index] = user
      this.userService.updateUser(user)
      UIkit.notification({
        message: 'User update successfully',
        status: 'success',
        pos: 'top-center'
      })
    }
    else {
      this.userService.addUser(user)
      console.log('Form validation', this.userForm.valid);
      UIkit.notification({
        message: 'User added successfully',
        status: 'success',
        pos: 'top-center'
      })
    }
    UIkit.modal(this.userFormModal.nativeElement).hide();
  }

  updateUser(user: User) {
    this.submitted = false;
    localStorage.setItem('userIdForUpdate', user.id)
    this.servicedata = user.service
    this.imageURL = user.photo
    UIkit.switcher(this.switcher.nativeElement).show(0);
    this.userForm.patchValue({
      // photo: user.photo,
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      mobile: user.mobile,
      gender: user.gender
    })
    UIkit.modal(this.userFormModal.nativeElement).show();
  }

  deleteUser(user: User) {
    const index = this.allUsersData.findIndex(users => users.id === user.id)
    this.allUsersData.splice(index, 1);
    //this.userService.removeUser(user);
  }


  addNewService() {
    this.submitService = true
    if (this.userForm.get('problem').valid && this.userForm.get('method').valid) {

      if (this.updateServiceButton) {
        const index: number = parseInt(localStorage.getItem('serviceindex'))
        this.servicedata[index].problem = this.userForm.get('problem').value
        this.servicedata[index].method = this.userForm.get('method').value
        UIkit.notification({
          message: 'Service has been updated',
          status: 'success',
          pos: 'top-center'
        })
      } else {
        console.log(this.userForm.get('problem').value)
        console.log(this.userForm.get('method').value)
        const data = {
          problem: this.userForm.get('problem').value,
          method: this.userForm.get('method').value
        }
        console.log(data)
        this.servicedata.push(data)
        console.log(this.servicedata)
        UIkit.notification({
          message: 'Service has been added',
          status: 'success',
          pos: 'top-center'
        })
      }
      this.submitService = false
      this.userForm.get('problem').setValue('')
      this.userForm.get('method').setValue('')
    }
  }

  deleteService(i: number) {
    this.servicedata.splice(i, 1)
    UIkit.notification({
      message: 'Service has been deleted',
      status: 'success',
      pos: 'top-center'
    })
  }
  updateService(data, index) {
    this.updateServiceButton = true;
    this.userForm.get('problem').setValue(data.problem)
    this.userForm.get('method').setValue(data.method)
    localStorage.setItem("serviceindex", index)
  }
}
