// Angular Import
import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from 'src/app/services/user/auth.service';
// bootstrap
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
    ])
  ]
})
export class NavRightComponent implements OnInit{
  // public props
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId!: number;
  userDetails!: {
    first_name: string;
    last_name: string;
    photo: string;
  };

  // constructor
  constructor(private authService: AuthService, private router: Router) {
    this.visibleUserList = false;
    this.chatMessage = false;
  }
  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetails();
  }

  // public method
  onChatToggle(friendID: number) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }
  onLogout() {
    this.authService.logout(); 
    this.router.navigate(['/auth/signin']); 
}
}
