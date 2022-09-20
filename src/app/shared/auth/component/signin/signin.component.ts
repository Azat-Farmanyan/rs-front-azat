import {
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { IsigninData } from 'src/app/shared/interfaces/signinData';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  signinForm: FormGroup;
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
    this.signinForm = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  login() {
    if (this.signinForm.valid) {
      const loginData: IsigninData = { ...this.signinForm.value };
      this.authService.signin(loginData).subscribe(
        () => {
          this.toastr.success('Login success!');
          this.router.navigate(['/boards']);
          this.signinForm.reset();
        },
        (error) => {
          this.toastr.error(error.error.message, error.name);
        }
      );
    }
  }
}
