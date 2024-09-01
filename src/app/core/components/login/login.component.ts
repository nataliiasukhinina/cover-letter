import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatchingFieldsValidator } from '../../../shared/validators/matching-fields.validator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatError, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatLabel, MatHint, MatError, MatProgressSpinnerModule, MatTooltipModule, MatDividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  loginForm!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z ]*$')],
        updateOn: 'submit'
      }],
      password: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      confirmPassword: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }]
    }, {
      validators: [MatchingFieldsValidator()]
    });
  }

  onFormSubmit(): void {
    if (!this.loading) {
      this.loading = true;
      this.loginForm.markAllAsTouched();
      if (this.loginForm.valid) {
        const username = this.loginForm.get('username')?.value;
        const password = this.loginForm.get('password')?.value;
        // this.authService.signIn(username, password).subscribe(
        //   (response) => {
        //   },
        //   (error) => {
        //     this.loading = false;
        //     console.log(error)
        //   },
        //   () => {
        //     this.loading = false;
        //     this.router.navigate(['/home']);
        //   }
        // );
      }

    }

  }

  hasError(control: string, errorCode: string): boolean {
    return !!(this.loginForm.get(control)?.touched && this.loginForm.get(control)?.hasError(errorCode));
  }


}
