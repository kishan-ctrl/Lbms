import { Component } from '@angular/core';
import { StorageService } from './auth/Services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vehicle';


isUserLoggedIn: boolean = StorageService.isUserLoggedIn();
isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();

constructor(private router: Router){ }

ngOnInit(){
  this.router.events.subscribe((event) => {
    if (event .constructor.name === "NavigationEnd") {
      this.isUserLoggedIn = StorageService.isUserLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    }
  })
}

logout(){
  StorageService.logout();
  this.router.navigateByUrl('/login');
}

}
