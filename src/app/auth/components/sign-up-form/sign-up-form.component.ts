import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpUser } from '../../../shared/models/auth/sign-up-user.model';

@Component({
  selector: 'marvel-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
  @Output() signUp = new EventEmitter<SignUpUser>();

  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/)] // At least one uppercase letter and one number
      ],
      remember: [false],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const userData: SignUpUser = {
        email: this.signupForm.get('email')!.value,
        username: this.signupForm.get('username')!.value,
        firstName: this.signupForm.get('firstName')!.value,
        lastName: this.signupForm.get('lastName')!.value,
        password: this.signupForm.get('password')!.value,
      };
      this.signUp.emit(userData);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
