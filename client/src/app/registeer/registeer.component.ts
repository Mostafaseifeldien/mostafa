import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registeer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registeer.component.html',
  styleUrl: './registeer.component.css',
})
export class RegisteerComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  // errors: string[] = [];
  errors: any;
  // @Input() usersFromHomeComponent: any;
  // usersFromHomeComponent = input.required<any>();
  cancelRegister = output<boolean>();
  // @Output() cancelRegister = new EventEmitter();
  model: any = {};
  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => {
        console.log(error);
        // this.errors = error.error.errors;
        // console.log(this.errors.Password);
        // if (this.errors.UserName) {
        //   this.toastr.error(this.errors.UserName);
        // }
        // if (this.errors.Password) {
        //   this.toastr.error(this.errors.Password);
        // }
        // console.log(error);
        if (error.length > 0) {
          for (const key in error) {
            this.toastr.error(error[key]);
          }
        }
      },
    });
    console.log(this.model);
  }
  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
