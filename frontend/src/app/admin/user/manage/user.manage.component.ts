import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material';

function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value) {
      const PATTERN_UPPERCASE = /[A-Z]/g;
      const PATTERN_LOWERCASE = /[a-z]/g;
      const PATTERN_NUMBER = /[0-9]/g;
      const PATTERN_SPECIAL = /\W/g;

      const test = PATTERN_UPPERCASE.test(control.value) &&
        PATTERN_LOWERCASE.test(control.value) &&
        PATTERN_NUMBER.test(control.value) &&
        PATTERN_SPECIAL.test(control.value);

      if (!test) {
        return { 'PasswordStrength': true };
      }
  }
  return null;
}

@Component({
  selector: 'user-manage',
  templateUrl: './user.manage.component.html',
  styleUrls: []
})
export class UserManageComponent implements OnInit {
  userForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Username : new FormControl('', [Validators.required])
  });

  id: number = null;

  changePassword: boolean = false;

  onSubmit() {
    if (this.id) {
      this.userService.editUser(this.userForm.getRawValue(), this.id).subscribe();
    } else {
      this.userService.createUser(this.userForm.value).subscribe();
    }
  }

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {
      this.userService.getUser(this.id).subscribe((data) => {
        this.userForm.reset(data);
      });
      this.userForm.controls['Username'].disable();
    } else {
      this.userForm.addControl('Password',
        new FormControl('', [Validators.required, PasswordValidator]));
    }
  }

  checkPasswordValidation() {
    return this.userForm.controls['Password'].errors &&
      this.userForm.controls['Password'].errors.PasswordStrength;
  }

  getPasswordValidationMessage() {
    return 'Password must contain atleast one Uppercase letter, Lowercase letter, Number and Special Character';
  }

  onChangePassowrd(cp: MatSlideToggleChange) {
    if (cp.checked) {
      if (!this.userForm.contains('Password')) {
        this.userForm.addControl('Password',
          new FormControl('', [Validators.required, PasswordValidator]));
      }
    } else {
      this.userForm.removeControl('Password');
    }
  }
}
