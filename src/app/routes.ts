import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './services/authguard.service';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { SettingsComponent } from './home/settings/settings.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthguardService],
  children: [
          { path: '', component: DashboardComponent },
          { path: 'settings', component: SettingsComponent }
  ] },
  { path: 'login', component: LoginComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes);