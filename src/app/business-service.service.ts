import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class BusinessServiceService {
	baseUrl: string;
	statsUrl: string;
	constructor(private http: HttpClient, private router: Router) {
		this.baseUrl = 'http://localhost:3000/business/';
		this.statsUrl = 'http://localhost:3000/stats/';
	}

	register(values) {
		return this.http.post(this.baseUrl + 'register', values).toPromise();
	}
	login(values) {
		return this.http.post(this.baseUrl + 'login', values).toPromise();
	}
	isLogged() {
		if (sessionStorage.getItem('business-token'))
			this.router.navigate([ 'business/logged', sessionStorage.getItem('business-token'), 'home' ]);
	}
	tokenInHeaders() {
		let httpOptions = {
			headers: new HttpHeaders({
				token: sessionStorage.getItem('business-token')
			})
		};
		return httpOptions;
	}
	getEmployeesStats() {
		return this.http.get(this.statsUrl + 'business', this.tokenInHeaders()).toPromise();
	}
	getNumberEmployes() {
		return this.http.get(this.statsUrl + 'numberEmployees', this.tokenInHeaders()).toPromise();
	}
	getAllStatsMonth(pMonth) {
		return this.http.post(this.statsUrl + 'month', { month: pMonth }, this.tokenInHeaders()).toPromise();
	}
	getActiveUsers() {
		return this.http.get(this.statsUrl + 'active', this.tokenInHeaders()).toPromise();
	}
	getFilterByActive(pActive) {
		if (pActive) return this.http.post(this.statsUrl + 'active', { active: 0 }, this.tokenInHeaders()).toPromise();
		return this.http.post(this.statsUrl + 'active', { active: 1 }, this.tokenInHeaders()).toPromise();
	}
	getAllVacaciones() {
		return this.http.get('http://localhost:3000/calendar/all', this.tokenInHeaders()).toPromise();
	}
}
