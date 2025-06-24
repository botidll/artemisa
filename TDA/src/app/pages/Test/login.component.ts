import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    activeTab: 'login' | 'register' = 'login';

  setTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }

  getBackgroundStyle() {
  const loginImage = 'url(https://galeria.ipadavid.edu.pa/wp-content/uploads/2023/07/IMG_7810.jpg)';
  const registerImage = 'url(https://galeria.ipadavid.edu.pa/wp-content/uploads/2023/12/IMG_3109-1.jpg)';

  return {
    'background-image': this.activeTab === 'login' ? loginImage : registerImage
  };
}
}
