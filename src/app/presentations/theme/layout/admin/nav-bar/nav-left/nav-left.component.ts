// Angular Import
import { Component } from '@angular/core';
import { NavSearchComponent } from './nav-search/nav-search.component';

@Component({
  standalone: true,
  imports: [NavSearchComponent],
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent {}
