import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { IsignupData } from 'src/app/shared/interfaces/signupData';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  signup() {
    const signupData: IsignupData = { ...this.signupForm.value };

    this.subscription = this.authService.signup(signupData).subscribe(
      () => {
        this.toastr.success('Now you can login)', 'Signup success!');
        this.signupForm.reset();
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 3000);
      },
      (error) => {
        this.toastr.error(error.error.message, error.name);
      }
    );
  }
}
