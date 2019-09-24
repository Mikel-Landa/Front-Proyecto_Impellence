import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessServiceService } from 'src/app/business-service.service';
import { User } from 'src/app/models/usersModel';

@Component({
	selector: 'app-home-emp',
	templateUrl: './home-emp.component.html',
	styleUrls: [ './home-emp.component.css' ]
})
export class HomeEmpComponent implements OnInit {
	disp: string;
	currentRoute: string;
	numeroEmpleados: number;
	activeUsers: number;
	arrActive: any;
	arrInactive: any;
	arrAll: any;
	pintarArr: any;
	disp1: string;
	disp2: string;
	disp3: string;

	constructor(private businessService: BusinessServiceService, private router: ActivatedRoute) {
		this.disp = 'none';
		this.currentRoute = '/business/logged/';
		this.arrActive = [];
		this.arrInactive = [];
		this.arrAll = [];
		this.disp1 = 'none';
		this.disp2 = 'none';
		this.disp3 = 'none';
	}

	ngOnInit() {
		this.router.params.subscribe((param) => (this.currentRoute += param.businessId));

		this.businessService.getNumberEmployes().then((result) => {
			this.numeroEmpleados = result[0]['count(*)'];
		});
		this.businessService.getActiveUsers().then((result) => (this.activeUsers = result[0]['count(*)']));
		this.businessService
			.getFilterByActive(true)
			.then((result: any) => {
				// console.log(result);
				for (let i = 0; i < result.length; i++) {
					let user = result[i];
					this.arrActive.push(
						new User(user['username'], user['email'], this.lastSeen(user['pausa']), user['pausa'])
					);
					this.arrAll.push(
						new User(user['username'], user['email'], this.lastSeen(user['pausa']), user['pausa'])
					);
				}
				console.log(this.arrActive);
			})
			.catch((err) => console.log(err));
		this.businessService
			.getFilterByActive(false)
			.then((result: any) => {
				// console.log(result);
				for (let i = 0; i < result.length; i++) {
					let user = result[i];
					this.arrInactive.push(
						new User(user['username'], user['email'], this.lastSeen(user['pausa']), user['pausa'])
					);
					this.arrAll.push(
						new User(user['username'], user['email'], this.lastSeen(user['pausa']), user['pausa'])
					);
				}
				console.log(this.arrInactive);
			})
			.catch((err) => console.log(err));

		this.arrAll.sort(function(a, b) {
			return b.time - a.time;
		});
		console.log(this.arrAll);
	}
	toggleMenu() {
		this.disp = this.disp == 'none' ? 'block' : 'none';
		// console.log(this.disp);
	}
	onClick() {
		sessionStorage.removeItem('user-token');
	}
	lastSeen(pTime) {
		let day = new Date(pTime * 1000);
		return day.toDateString();
	}
	toggleInfo(disp) {
		switch (disp) {
			case 1:
				if (this.disp1 == 'block') this.disp1 = 'none';
				else this.disp1 = 'block';
				this.disp2 = 'none';
				this.disp3 = 'none';
				console.log(this.disp1);
				break;
			case 2:
				if (this.disp2 == 'block') this.disp2 = 'none';
				else this.disp2 = 'block';
				this.disp1 = 'none';
				this.disp3 = 'none';
				break;
			case 3:
				if (this.disp3 == 'block') this.disp3 = 'none';
				else this.disp3 = 'block';
				this.disp1 = 'none';
				this.disp2 = 'none';
				break;
		}
	}
}
