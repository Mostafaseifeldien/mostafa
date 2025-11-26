import {
  Component,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { AccountService } from '../../_services/account.service';
import { Member } from '../../_models/member';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css',
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true; // Prompt the user with a confirmation dialog
    }
  }
  private memberService = inject(MembersService);
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  member?: Member;
  ngOnInit(): void {
    // this.getMembers();
    this.loadMember();
  }
  loadMember() {
    const user = this.accountService.currentUser();
    if (!user) return;
    this.memberService.getMember(user.username).subscribe({
      next: (s) => {
        this.member = s;
      },
    });
  }

  updateMember() {
    if (this.member) {
      this.memberService.UpdateProfile(this.editForm?.value).subscribe({
        next: () => {
          console.log(this.member);
          this.toastr.success('Profile updated successfully!');
          this.editForm?.reset(this.member);
        },
        error: (error) => {
          console.log(error);
          this.toastr.error('Error updating profile!');
        },
      });
    }

    // console.log(this.member);
    // this.toastr.success('Profile updated successfully!');
    // // Mark the form as pristine after successful update
    // // console.log(this.editForm);
    // this.editForm?.reset(this.member); // Reset the form with the updated member data
    // console.log(this.editForm);
  }
}
