import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { LoggedComponent } from './loginP/logged/logged.component';
import { StatsComponent } from './loginP/stats/stats.component';
import { LogInComponent } from './loginEmp/log-in/log-in.component';
import { RegistroComponent } from './loginEmp/registro/registro.component';
import { EstatsComponent } from './loginEmp/estats/estats.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeEmpComponent } from './loginEmp/home-emp/home-emp.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'logged/:userId/home', component: LoggedComponent },
	{ path: 'logged/:userId/stats', component: StatsComponent },
	{ path: 'business/login', component: LogInComponent },
	{ path: 'business/register', component: RegistroComponent },
	{ path: 'business/logged/:businessId/stats', component: EstatsComponent },
	{ path: 'business/logged/:businessId/home', component: HomeEmpComponent },
	{ path: 'logged/:token/profile', component: ProfileComponent },
	{ path: 'business/logged/:businessId/calendar', component: CalendarComponent },
	{ path: 'logged/:businessId/calendar', component: CalendarComponent },
	{ path: '**', component: ErrorComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
