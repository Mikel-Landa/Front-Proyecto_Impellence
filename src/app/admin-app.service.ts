import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AdminAppService {
	logged: boolean;
	baseUrl: string;
	constructor(private router: Router, private http: HttpClient) {
		this.logged = false;
		this.baseUrl = 'http://localhost:3000/';
	}

	isLogged() {
		if (sessionStorage.getItem('user-token'))
			this.router.navigate([ '/logged', sessionStorage.getItem('user-token'), 'home' ]);
	}
	confirmLogged() {
		return this.logged;
	}
	login(values) {
		return this.http.post(this.baseUrl + 'users/login', values).toPromise();
	}
	register(values) {
		return this.http.post(this.baseUrl + 'users/register', values).toPromise();
	}
	tokenInHeaders() {
		let httpOptions = {
			headers: new HttpHeaders({
				token: sessionStorage.getItem('user-token')
			})
		};
		return httpOptions;
	}
	getUserStats() {
		return this.http.get(this.baseUrl + 'stats', this.tokenInHeaders()).toPromise();
	}
	getCompanyAverage() {
		return this.http.get(this.baseUrl + 'stats/company', this.tokenInHeaders()).toPromise();
	}
	updatePauses(numPauses, totalPauseT) {
		return this.http
			.put(
				this.baseUrl + 'events/update',
				{ numPauses: numPauses, totalPauseT: totalPauseT },
				this.tokenInHeaders()
			)
			.toPromise();
	}
	getPauses() {
		return this.http.get(this.baseUrl + 'events/day', this.tokenInHeaders()).toPromise();
	}
	updateUserPause(pBoolean) {
		if (pBoolean)
			return this.http.post(this.baseUrl + 'time/onPause', { onPause: 1 }, this.tokenInHeaders()).toPromise();
		return this.http.post(this.baseUrl + 'time/onPause', { onPause: 0 }, this.tokenInHeaders()).toPromise();
	}
	traerVacaciones() {
		return this.http.get(this.baseUrl + 'calendar', this.tokenInHeaders()).toPromise();
	}
}
