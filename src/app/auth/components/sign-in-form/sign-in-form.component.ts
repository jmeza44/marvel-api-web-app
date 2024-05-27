import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignInUser } from '../../../shared/models/auth/sign-in-user.model';

@Component({
  selector: 'marvel-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  @Output() signIn = new EventEmitter<SignInUser>();

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: SignInUser = {
        usernameOrEmail: this.loginForm.get('email')!.value,
        password: this.loginForm.get('password')!.value,
      };
      this.signIn.emit(credentials);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
