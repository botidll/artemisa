
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Labs } from './pages/labs/labs';
import { LoginComponent } from './pages/Test/login.component';



export const routes: Routes = [
            {path: '',
              component: Home},
            {path: 'labs',
              component: Labs},
           { path: 'logincomponent',
              component: LoginComponent}

];
