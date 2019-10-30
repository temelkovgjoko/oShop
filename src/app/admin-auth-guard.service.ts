import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators'
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(private auth: AuthService, private userService: UserService) { }

  // canActivate(): Observable<boolean> {
  //   return this.auth.user$.pipe(
  //     switchMap(user => {
  //       return this.userService.get(user.uid)
  //     }),
  //     map(appUser=> appUser.isAdmin)

  //   )
  // }
}
