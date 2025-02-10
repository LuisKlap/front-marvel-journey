import { Component } from '@angular/core';
import { TopMenuComponent } from '../../../shared/components/top-menu/top-menu.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  imports: [TopMenuComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {

}
