import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { APP_ROUTES } from './routes';
import { HomeComponent } from './home/home.component';
import { EpService } from './services/ep.service';
import { AuthguardService } from './services/authguard.service';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { SettingsComponent } from './home/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTES
  ],
  providers: [EpService, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
