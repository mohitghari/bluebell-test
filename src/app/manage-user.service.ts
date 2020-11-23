import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user-model'
@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  allusers: User[] = [{
    id: 'bjdsbjbjsd',
    photo: 'https://www.google.co.in/imgres?imgurl=https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FI%2F41JINRlOkpL.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.in%2FIndigo-Creatives-Indian-Flag-Offices%2Fdp%2FB00TPJ788Y&tbnid=8HNVPpyAr3mXtM&vet=12ahUKEwiO4qriwJjtAhWjg0sFHVulDqIQMygBegUIARDeAQ..i&docid=0RckqMWyZ8JWzM&w=500&h=357&q=ndian%20flag&hl=en&authuser=0&ved=2ahUKEwiO4qriwJjtAhWjg0sFHVulDqIQMygBegUIARDeAQ',
    firstName: 'abc',
    lastName: 'xyz',
    email: 'a@a.com',
    mobile: 1234567890,
    gender: 'male',
    service: [
      {
        problem: 'this is my own problem',
        method: 'my own method'
      }
    ]
  },
  {
    id: 'bjdsbjbjsd',
    photo: 'https://www.google.co.in/imgres?imgurl=https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FI%2F41JINRlOkpL.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.in%2FIndigo-Creatives-Indian-Flag-Offices%2Fdp%2FB00TPJ788Y&tbnid=8HNVPpyAr3mXtM&vet=12ahUKEwiO4qriwJjtAhWjg0sFHVulDqIQMygBegUIARDeAQ..i&docid=0RckqMWyZ8JWzM&w=500&h=357&q=ndian%20flag&hl=en&authuser=0&ved=2ahUKEwiO4qriwJjtAhWjg0sFHVulDqIQMygBegUIARDeAQ',
    firstName: 'abc',
    lastName: 'xyz',
    email: 'a@a.com',
    mobile: 1234567890,
    gender: 'male',
    service: [
      {
        problem: 'this is my own problem',
        method: 'my own method'
      }
    ]
  }]

  constructor() { }

  addUser(user: User) {
    this.allusers.push(user)
    console.log(this.allusers)
  }

  updateUser(user: User) {
    const id = localStorage.getItem('userIdForUpdate')
    const index = this.allusers.findIndex(user => user.id === id)
    this.allusers[index] = user
    localStorage.removeItem('userIdForUpdate')
    console.log('all users', this.allusers)

  }

  removeUser(user: User) {
    const index = this.allusers.findIndex(users => users.id === user.id)
    this.allusers.splice(index, 1)
    console.log(this.allusers)
  }

  getAllUser(): Observable<User[]> {
    return of(this.allusers)
  }
}
