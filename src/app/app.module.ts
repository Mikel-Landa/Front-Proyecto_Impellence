import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { LoggedComponent } from './loginP/logged/logged.component';
import { StatsComponent } from './loginP/stats/stats.component';
import { RegistroComponent } from './loginEmp/registro/registro.component';
import { EstatsComponent } from './loginEmp/estats/estats.component';
import { LogInComponent } from './loginEmp/log-in/log-in.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeEmpComponent } from './loginEmp/home-emp/home-emp.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		ContactComponent,
		RegisterComponent,
		ErrorComponent,
		LoggedComponent,
		StatsComponent,
		RegistroComponent,
		EstatsComponent,
		LogInComponent,
		ProfileComponent,
		HomeEmpComponent,
		CalendarComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ChartsModule,
		FormsModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot()
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
