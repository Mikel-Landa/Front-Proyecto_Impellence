import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminAppService } from 'src/app/admin-app.service';
@Component({
	selector: 'app-stats',
	templateUrl: './stats.component.html',
	styleUrls: [ './stats.component.css' ]
})
export class StatsComponent implements OnInit {
	disp: string;
	currentRoute: string;

	constructor(private router: ActivatedRoute, private adminService: AdminAppService) {
		this.disp = 'none';
		this.currentRoute = '/logged/';
	}
	public barChartOptions = {
		scaleShowVerticalLines: true,
		responsive: true,
		barBeginAtOrigin: false
	};

	public barChartLabels = [];
	public barChartType = 'bar';
	public barChartLegend = true;
	public barChartData = [];
	public barChartLabels1 = [];
	public barChartType1 = 'bar';
	public barChartLegend1 = true;
	public barChartData1 = [];
	private statsUser = {
		barChartLabels: this.barChartLabels,
		barChartLabels1: this.barChartLabels1,
		barChartData: this.barChartData,
		barChartData1: this.barChartData1
	};

	public barChartLabels3 = [];
	public barChartType3 = 'bar';
	public barChartLegend3 = true;
	public barChartData3 = [];
	public barChartLabels4 = [];
	public barChartType4 = 'bar';
	public barChartLegend4 = true;
	public barChartData4 = [];
	private statsCompany = {
		barChartLabels: this.barChartLabels3,
		barChartLabels1: this.barChartLabels4,
		barChartData: this.barChartData3,
		barChartData1: this.barChartData4
	};
	ngOnInit() {
		this.router.params.subscribe((param) => (this.currentRoute += param.userId));
		// console.log(this.currentRoute);
		// console.log(this.barChartData);
		this.adminService
			.getUserStats()
			.then((rows) => this.showStats(this.statsUser, rows))
			.catch((err) => console.log(err));
		this.adminService
			.getCompanyAverage()
			.then((rows) => this.showStatsCompany(this.statsCompany, rows))
			.catch((err) => console.log(err));
	}
	private showStats({ barChartLabels, barChartLabels1, barChartData, barChartData1 }, rows) {
		// console.log(rows);
		var arrStats: any = rows;
		let contador = 0;
		let data1 = [];
		let data2 = [];
		let numPauses = [];
		let totalPauseT = [];
		arrStats.forEach(() => {
			barChartLabels.push('Día ' + rows[contador].day);
			barChartLabels1.push('Día ' + rows[contador].day);
			numPauses.push(rows[contador].numPauses);
			totalPauseT.push(rows[contador].totalPauseT);
			let horaStart = rows[contador].startHour.split(':');

			// console.log(horaStart);
			let horaStartNum = parseInt(horaStart[0]) + parseInt(horaStart[1]) / 60 + parseInt(horaStart[2]) / 3600;
			// console.log(horaStartNum);

			let horaEnd = rows[contador].endHour.split(':');

			let horaEndNum = parseInt(horaEnd[0]) + parseInt(horaEnd[1]) / 60 + parseInt(horaEnd[2]) / 3600;
			data1.push(horaStartNum);
			data2.push(horaEndNum);
			contador++;
		});
		let arr = [ data1, data2, numPauses, totalPauseT ];
		for (let elm of arr) {
			for (let i = 0; i < elm.length; i++) {
				elm[i] = Math.round(elm[i] * 100) / 100;
			}
		}
		data1.push(1);
		numPauses.push(1);

		this.barChartData = [ { data: data1, label: 'Hora de entrada' }, { data: data2, label: 'Hora de salida' } ];
		this.barChartData1 = [
			{ data: numPauses, label: 'Número de pausas' },
			{ data: totalPauseT, label: 'Tiempo total(min)' }
		];
		barChartData;
		barChartData1;
	}
	private showStatsCompany({ barChartLabels, barChartLabels1, barChartData, barChartData1 }, rows) {
		console.log(rows);
		var arrStats: any = rows;

		let data1: any = [];
		let data2: any = [];
		let numPauses: any = [];
		let totalPauseT: any = [];
		// console.log(rows);
		arrStats.forEach((row) => {
			if (barChartLabels.length < 1) {
				barChartLabels.push('Año ' + row.year);
				barChartLabels1.push('Año ' + row.year);
			}
			numPauses.push(row.numPauses);
			totalPauseT.push(row.totalPauseT);
			let horaStart = row.startHour.split(':');
			let horaStartNum = parseInt(horaStart[0]) + parseInt(horaStart[1]) / 60 + parseInt(horaStart[2]) / 3600;
			let horaEnd = row.endHour.split(':');
			let horaEndNum = parseInt(horaEnd[0]) + parseInt(horaEnd[1]) / 60 + parseInt(horaEnd[2]) / 3600;
			// console.log(horaStartNum);
			data1.push(horaStartNum);
			data2.push(horaEndNum);
		});
		let data1Avr: number = 0;
		let data2Avr: number = 0;
		let numPausesAvr: number = 0;
		let totalPauseTAvr: number = 0;
		// console.log(rows.length);
		for (let i = 0; i < rows.length; i++) {
			// console.log(data1[i], i, rows.length);
			data1Avr += data1[i] / rows.length;
			data2Avr += data2[i] / rows.length;
			console.log(data2Avr);
			numPausesAvr += numPauses[i] / rows.length;
			totalPauseTAvr += totalPauseT[i] / rows.length;
		}
		data1Avr = Math.floor(data1Avr * 100) / 100;
		data2Avr = Math.floor(data2Avr * 100) / 100;
		numPausesAvr = Math.floor(numPausesAvr * 100) / 100;
		totalPauseTAvr = Math.floor(totalPauseTAvr * 100) / 100;

		// console.log(data1Avr, data2Avr, numPausesAvr, totalPauseTAvr);
		this.barChartData3 = [
			{ data: [ data1Avr, 1 ], label: 'Hora de entrada' },
			{ data: [ data2Avr ], label: 'Hora de salida' }
		];

		this.barChartData4 = [
			{ data: [ numPausesAvr, 1 ], label: 'Número de pausas' },
			{ data: [ totalPauseTAvr ], label: 'Tiempo total(min)' }
		];
		barChartData;
		barChartData1;
		// console.log(this.barChartData3);
	}

	toggleMenu() {
		this.disp = this.disp == 'none' ? 'block' : 'none';
		// console.log(this.disp);
	}
	onClick() {
		sessionStorage.removeItem('user-token');
	}
}
