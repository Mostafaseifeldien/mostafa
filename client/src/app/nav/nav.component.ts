import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive,TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  // loggedIn = false;
  // haserror:string='';
  model: any = {};
  login() {
    // console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: (responses) => {
        console.log(responses);
        this.router.navigateByUrl('/members');
        // this.loggedIn = true;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error);
        // this.haserror = error.error;
        // this.loggedIn = false;
      },
    });
  }

  logout() {
    // this.loggedIn = false;
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
