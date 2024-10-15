// Angular Import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './presentations/theme/layout/admin/admin.component';
import { GuestComponent } from './presentations/theme/layout/guest/guest.component';
import { ConfigurationComponent } from './presentations/theme/layout/admin/configuration/configuration.component';
import { NavBarComponent } from './presentations/theme/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from './presentations/theme/layout/admin/navigation/navigation.component';
import { NavLeftComponent } from './presentations/theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './presentations/theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavSearchComponent } from './presentations/theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { ChatMsgComponent } from './presentations/theme/layout/admin/nav-bar/nav-right/chat-msg/chat-msg.component';
import { ChatUserListComponent } from './presentations/theme/layout/admin/nav-bar/nav-right/chat-user-list/chat-user-list.component';
import { FriendComponent } from './presentations/theme/layout/admin/nav-bar/nav-right/chat-user-list/friend/friend.component';
import { NavContentComponent } from './presentations/theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from './presentations/theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './presentations/theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './presentations/theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './presentations/theme/shared/shared.module';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './core/interceptors/auth.jwt.interceptor';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GuestComponent,
    ConfigurationComponent,
    NavBarComponent,
    NavigationComponent,
    NavLeftComponent,
    NavRightComponent,
    NavSearchComponent,
    ChatMsgComponent,
    ChatUserListComponent,
    FriendComponent,
    NavContentComponent,
    NavItemComponent,
    NavCollapseComponent,
    NavGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    ToastModule,
],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule {}
