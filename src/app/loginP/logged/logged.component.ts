import { Component, OnInit } from '@angular/core';
import { AdminAppService } from '../../admin-app.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-logged',
	templateUrl: './logged.component.html',
	styleUrls: [ './logged.component.css' ]
})
export class LoggedComponent implements OnInit {
	currentRoute: string;
	disp: string;
	interval: any;
	dispContador: string;
	inicio: number;
	baseUrl: string;
	urlForEvents: string;
	tiempoTranscurrido: number;
	pausa: number;

	constructor(private adminServices: AdminAppService, private router: ActivatedRoute, private http: HttpClient) {
		this.currentRoute = '/logged/';
		this.disp = 'none';
		this.baseUrl = 'http://localhost:3000/time/';
		this.urlForEvents = 'http://localhost:3000/events/';
		this.tiempoTranscurrido = 0;
	}

	ngOnInit() {
		this.router.params.subscribe((param) => (this.currentRoute += param.userId));
		// console.log(this.currentRoute);
	}
	toggleMenu() {
		this.disp = this.disp == 'none' ? 'block' : 'none';
		// console.log(this.disp);
	}
	empezarContador(pTiempo = 0) {
		this.inicio = new Date().getTime();
		this.adminServices
			.updateUserPause(false)
			.then((result) => result)
			.catch((err) => alert('Ha ocurrido un error'));
		this.http
			.post(
				this.baseUrl + 'inicial',
				{ inicioTiempo: Math.floor(this.inicio / 1000) },
				this.adminServices.tokenInHeaders()
			)
			.subscribe((params) => params);
		this.interval = setInterval(() => {
			this.tiempoTranscurrido = Math.floor((new Date().getTime() - this.inicio) / 1000) + pTiempo;
			let horas = Math.floor(this.tiempoTranscurrido / 3600);
			let resSegundos = this.tiempoTranscurrido - horas * 3600;
			let minutos = Math.floor(resSegundos / 60);
			let segundos = resSegundos - minutos * 60;

			let horasParse = horas < 10 ? '0' + horas + ':' : horas + ':';
			let minParse = minutos < 10 ? '0' + minutos + ':' : minutos + ':';
			let segParse = segundos < 10 ? '0' + segundos : segundos;

			this.dispContador = horasParse + minParse + segParse;
		}, 1000);
	}
	pausarContador() {
		clearInterval(this.interval);
		console.log(this.tiempoTranscurrido);
		this.adminServices.updateUserPause(true).then((result) => result).catch((err) => alert('Ha ocurrido un error'));
		this.http
			.post(
				this.baseUrl + 'transcurrido',
				{
					tiempo: this.tiempoTranscurrido,
					pausa: Math.floor(new Date().getTime() / 1000).toString()
				},
				this.adminServices.tokenInHeaders()
			)
			.subscribe((params) => console.log(params));
	}
	reanudarContador() {
		this.adminServices
			.updateUserPause(false)
			.then((result) => result)
			.catch((err) => alert('Ha ocurrido un error'));
		// tiempoAnterior = Number(transc['tiempoTranscurrido'])

		this.http.get(this.baseUrl + 'transcurrido', this.adminServices.tokenInHeaders()).subscribe((transc) => {
			let tiempoAnterior = transc['tiempoTranscurrido'];
			this.empezarContador(parseInt(tiempoAnterior));
			this.pausa = new Date().getTime() - parseInt(transc['pausa']);
		});
	}
	async finalizarContador() {
		this.adminServices.updateUserPause(true).then((result) => result).catch((err) => alert('Ha ocurrido un error'));
		let inicioTIempo;
		clearInterval(this.interval);
		this.http.get(this.baseUrl + 'transcurrido', this.adminServices.tokenInHeaders()).subscribe((transc) => {
			inicioTIempo = transc['inicioTiempo'];
			this.pausa = Math.floor((new Date().getTime() / 1000 - parseInt(transc['pausa'])) / 60);
			console.log(this.pausa, transc);
		});

		try {
			let pauses = await this.adminServices.getPauses();
			let { numPauses, totalPauseT } = {
				numPauses: pauses['numPauses'] + 1,
				totalPauseT: pauses['totalPauseT'] + this.pausa
			};
			let dateObject = new Date(Number(inicioTIempo * 1000));
			let hor = dateObject.getHours() < 10 ? '0' + dateObject.getHours() : dateObject.getHours();
			let min = dateObject.getMinutes() < 10 ? '0' + dateObject.getMinutes() : dateObject.getMinutes();

			let sec = dateObject.getUTCSeconds() < 10 ? '0' + dateObject.getUTCSeconds() : dateObject.getUTCSeconds();
			let endhor = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
			let endmin = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
			let endsec = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();

			this.http
				.post(
					this.urlForEvents + 'new',
					{
						month: new Date().getMonth() + 1,
						day: new Date().getDate(),
						startHour: hor + ':' + min + ':' + sec,
						endHour: endhor + ':' + endmin + ':' + endsec
					},
					this.adminServices.tokenInHeaders()
				)
				.subscribe((result) => {
					if (result['error']) {
						alert('Hoy ya hay otra entrada, intenta no darle a finalizar más de una vez al día');
					}
					// console.log(result);
				});
			// console.log({
			// 	month: new Date().getMonth() + 1,
			// 	day: new Date().getDate(),
			// 	startHour: hor + ':' + min + ':' + sec,
			// 	endHour: endhor + ':' + endmin + ':' + endsec
			// // });
			// console.log(nuevo);

			this.adminServices.updatePauses(numPauses, totalPauseT);
		} catch (err) {
			console.log(err);
			alert('Ha ocurrido un error, mira la consola para más información');
		}
	}
	onClick() {
		sessionStorage.removeItem('user-token');
	}
}
