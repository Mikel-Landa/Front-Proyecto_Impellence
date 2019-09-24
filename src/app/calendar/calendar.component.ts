import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AdminAppService } from '../admin-app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessServiceService } from '../business-service.service';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: [ './calendar.component.css' ]
})
export class CalendarComponent implements OnInit {
	day: any;
	month: any;
	baseUrl: string;
	arrMesAnterior: any;
	arrMesPosterior: any;
	arrVaciones: any;
	monthNumber: number;
	year: number;
	isCompany: boolean;
	displ: string;
	arrMonths: Array<string>;
	selectedMonth: number;
	currentRoute: string;
	disp: string;

	constructor(
		private http: HttpClient,
		private toastr: ToastrService,
		private adminService: AdminAppService,
		private router: Router,
		private businessService: BusinessServiceService
	) {
		this.disp = 'none';
		this.baseUrl = 'http://localhost:3000/calendar';
		this.arrMesAnterior = [];
		this.arrMesPosterior = [];
		this.arrVaciones = [];
		this.monthNumber = 0;
		this.year = 0;
		this.displ = 'none';
		this.arrMonths = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		this.selectedMonth = new Date().getMonth() + 1;
	}
	toggleMenu() {
		this.disp = this.disp == 'none' ? 'block' : 'none';
		// console.log(this.disp);
	}
	ngOnInit() {
		this.currentRoute = this.router.url.substring(0, this.router.url.length - 9);
		// console.log(this.currentRoute);
		// console.log(this.router.url);
		this.isCompany = this.router.url.includes('business');
		// console.log(this.isCompany);

		this.pintarCalendario();
		if (this.isCompany) {
			this.businessService
				.getAllVacaciones()
				.then((result: any) => {
					console.log(result);
					for (let row of result) {
						// console.log(row);
						this.arrVaciones.push({ day: row.day, month: row.month, year: row.year });
					}

					console.log(this.arrVaciones);
				})
				.catch((err) => {
					console.log(err);
					alert('EROOOOOOR');
				});
		}
		else {
			this.adminService
				.traerVacaciones()
				.then((result: any) => {
					for (let row of result) {
						this.arrVaciones.push({ day: row.day, month: row.month, year: row.year });
					}
					// console.log(this.arrVaciones);
				})
				.catch((err) => {
					console.log(err);
					alert('EROOOOOOR');
				});
		}
	}
	onDayClick(pDay) {
		let element = this.arrVaciones.filter((elm) => {
			if (elm.day == pDay && elm.month == this.monthNumber && elm.year == this.year) {
				return 1;
			}
			return 0;
		});
		console.log(element);
		if (!this.isCompany) this.toastr.success('¡Tienes vacaciones en enste día!');
		else if (element.length > 1) this.toastr.warning(element.length + ' empleados tiene vacaciones en este día');
		else if (element.length == 1) this.toastr.success(element.length + ' empleado tiene vacaciones en este día');
	}
	daysOfMonth(pMonth) {
		let arr = [];
		for (let i = 1; i <= new Date(new Date().getFullYear(), pMonth, 0).getDate(); i++) {
			arr.push(i);
		}
		return arr;
	}
	clickDate(values) {
		let httpOptions = {
			headers: new HttpHeaders({
				token: this.isCompany ? sessionStorage.getItem('business-token') : sessionStorage.getItem('user-token')
			})
		};
		let arrValues = values.vacacion.split('-');
		// console.log(arrValues);
		if (!this.isCompany) {
			this.http
				.post(this.baseUrl, { year: arrValues[0], month: arrValues[1], day: arrValues[2] }, httpOptions)
				.subscribe((result) => console.log(result));
		}
		else {
			this.http
				.post(
					this.baseUrl + '/company',
					{ year: arrValues[0], month: arrValues[1], day: arrValues[2] },
					httpOptions
				)
				.subscribe((result) => console.log(result));
		}
	}

	pintarCalendario(pMonth = new Date().getMonth() + 1, pYear = new Date().getFullYear()) {
		let days = [ 'Mon', 'Tue', 'Wed', 'Thu', ' Fri', 'Sat', 'Sun' ];

		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		const getMonthName = function(date) {
			return months[date];
		};
		// const getDayName = function(date) {
		// 	return days[date.getDay()];
		// };
		let year = new Date().getFullYear();
		let month = new Date().getMonth();
		let startDay = days.indexOf(new Date(year, month, 1).toDateString().split(' ')[0]);
		let endDay = days.indexOf(new Date(year, month, this.daysOfMonth(pMonth).length).toDateString().split(' ')[0]);

		if (startDay != 0) {
			for (let i = startDay; i > 0; i--) {
				this.arrMesAnterior.push(this.daysOfMonth(pMonth).length - i);
			}
		}
		else {
			this.arrMesAnterior = [];
		}
		if (endDay != 6) {
			for (let i = endDay; i < 6; i++) {
				this.arrMesPosterior.push(i + 1);
				// console.log(this.arrMesPosterior);
			}
		}
		else this.arrMesPosterior = [];
		// this.day = getDayName(now) + ', ' + now.getDate();
		this.month = getMonthName(pMonth - 1);
		this.monthNumber = pMonth;
		this.year = pYear;
	}
	pintarVacaciones(pDay) {
		let element = this.arrVaciones.filter((elm) => {
			if (elm.day == pDay && elm.month == this.monthNumber && elm.year == this.year) {
				// console.log(elm);
				return 1;
			}
			return 0;
		});
		return element.length;
	}
	onMonthClick() {
		this.displ = this.displ == 'block' ? 'none' : 'block';
	}
	manageSelect(pIndex) {
		this.arrMesAnterior = [];
		this.arrMesPosterior = [];
		this.arrVaciones = [];
		this.monthNumber = 0;
		this.year = 0;
		this.selectedMonth = pIndex + 1;
		this.pintarCalendario(pIndex + 1);
		if (this.isCompany) {
			this.businessService
				.getAllVacaciones()
				.then((result: any) => {
					for (let row of result) {
						this.arrVaciones.push({ day: row.day, month: row.month, year: row.year });
					}

					console.log(this.arrVaciones);
				})
				.catch((err) => {
					console.log(err);
					alert('EROOOOOOR');
				});
		}
		else {
			this.adminService
				.traerVacaciones()
				.then((result: any) => {
					for (let row of result) {
						this.arrVaciones.push({ day: row.day, month: row.month, year: row.year });
					}
					// console.log(this.arrVaciones);
				})
				.catch((err) => {
					console.log(err);
					alert('EROOOOOOR');
				});
		}
	}
	onClick() {
		if (this.isCompany) return sessionStorage.removeItem('business-token');
		sessionStorage.removeItem('user-token');
	}
}
