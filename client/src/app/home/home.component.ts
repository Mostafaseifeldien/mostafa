import { Component, inject, OnInit } from '@angular/core';
import { RegisteerComponent } from '../registeer/registeer.component';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisteerComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  registerModel = false;
  // http = inject(HttpClient);
  // users: any;

  registerToggle() {
    this.registerModel = !this.registerModel;
  }
  // ngOnInit(): void {
  // this.getUsers();
  // }
  // getUsers() {
  //   this.http.get('https://localhost:5001/api/Users').subscribe({
  //     next: (response) => (this.users = response),
  //     error: (error) => console.log(error),
  //     complete: () => console.log('Request has completed'),
  //   });
  // }
  cancelRegisterMode(event: boolean) {
    this.registerModel = event;
  }
}
