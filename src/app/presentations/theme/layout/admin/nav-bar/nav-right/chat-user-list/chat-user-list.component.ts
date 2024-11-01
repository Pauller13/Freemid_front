// Angular Import
import { Component, EventEmitter, Output } from '@angular/core';

// project import
import { FriendsList } from 'src/app/data/fack-db/friends-list';
import { SharedModule } from 'src/app/presentations/theme/shared/shared.module';
import { FriendComponent } from './friend/friend.component';

@Component({
  standalone: true,
  imports: [SharedModule, FriendComponent],
  selector: 'app-chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss']
})
export class ChatUserListComponent {
  // public props
  @Output() ChatCollapse = new EventEmitter();
  @Output() ChatToggle = new EventEmitter();
  searchFriends!: string;
  // eslint-disable-next-line
  friendsList: any = FriendsList.friends;

  // public method
  ChatOn() {
    this.ChatToggle.emit();
  }
}
