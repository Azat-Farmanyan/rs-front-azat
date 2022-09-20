import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  burgerIsOpen = false;
  canOpenBurger = false;
  screenWidth = 0;
  language = 'en';

  constructor(
    public authService: AuthService,
    public StorageService: StorageService,
    private toastr: ToastrService,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 930) {
      this.canOpenBurger = true;
    } else {
      this.canOpenBurger = false;
    }
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 900) {
      this.canOpenBurger = true;
    } else {
      this.canOpenBurger = false;
    }
  }

  isAuthenticated() {
    return !!this.StorageService.getUserData()?.token;
  }
  checkIsAuthinticated() {
    if (!this.isAuthenticated) {
      this.toastr.warning("You ca'nt see the boards, you have to login first!");
    }
  }
  switchLang(lang: string) {
    this.language = lang;
    this.translate.use(lang);
  }
}
