import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from './user.service';

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
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {
  userForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Username : new FormControl('', [Validators.required]),
    Password : new FormControl('', [Validators.required, PasswordValidator])
  });

  onSubmit() {
    this.userService.createUser(this.userForm.value).subscribe((data) => {
      console.log(data);
    });
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    // const user = new User();
    // user.Email = 'my@email.com';
    // user.Name = 'It\'s me';
    // user.Password = 'secret';
    // user.Username = 'secret too';
    // this.userForm.reset(user);
  }

  checkPasswordValidation() {
    return this.userForm.controls['Password'].errors &&
      this.userForm.controls['Password'].errors.PasswordStrength;
  }

  getPasswordValidationMessage() {
    return 'Password must contain atleast one Uppercase letter, Lowercase letter, Number and Special Character';
  }
}
