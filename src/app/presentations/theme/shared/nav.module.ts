import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavCollapseComponent } from '../layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavContentComponent } from '../layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from '../layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from '../layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NgScrollbarModule } from 'ngx-scrollbar';



@NgModule({
  imports: [CommonModule, RouterModule, NgScrollbarModule],

  exports: [
    NavItemComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavContentComponent
  ],
  declarations: [
    NavItemComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavContentComponent
  ],
})
export class NavModule {}
