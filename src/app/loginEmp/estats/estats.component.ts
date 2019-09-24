import { Component, OnInit } from '@angular/core';
import { BusinessServiceService } from 'src/app/business-service.service';
import { showStatsMonth, getStastYear } from 'src/app/models/statsModel';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-estats',
	templateUrl: './estats.component.html',
	styleUrls: [ './estats.component.css' ]
})
export class EstatsComponent implements OnInit {
	disp: string;
	currentRoute: string;
	arrEmpleados: any;

	constructor(private businessService: BusinessServiceService, private router: ActivatedRoute) {
		this.disp = 'none';
		this.currentRoute = '/business/logged/';
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

	public barChartLabels3 = [];
	public barChartType3 = 'bar';
	public barChartLegend3 = true;
	public barChartData3 = [];

	// public barChartLabels4 = [];
	// public barChartType4 = 'bar';
	// public barChartLegend4 = true;
	// public barChartData4 = [];
	ngOnInit() {
		this.router.params.subscribe((param) => (this.currentRoute += param.businessId));
		this.businessService
			.getEmployeesStats()
			.then((response) => {
				let arrYear = getStastYear(response);
				this.barChartData3 = arrYear[0];
				this.barChartLabels3 = arrYear[1];
			})
			.catch((err) => console.log(err));
		// this.businessService
		// 	.getNumberEmployes()
		// 	.then((response) => console.log(response))
		// 	.catch((err) => console.log(err));
		this.businessService
			.getAllStatsMonth(new Date().getMonth() + 1)
			.then((response) => {
				setTimeout(() => {
					let arrSol = showStatsMonth(response);

					this.barChartData = arrSol[0];
					this.barChartLabels = arrSol[1];
				}, 100);
			})
			.catch((err) => {
				console.log(err);
				alert('Ha ocurrido un error');
			});
		this.businessService
			.getAllStatsMonth(new Date().getMonth())
			.then((response) => {
				let arrSol = showStatsMonth(response);
				this.barChartData1 = arrSol[0];

				this.barChartLabels1 = arrSol[1];

				// console.log(this.barChartData, this.barChartData1);
				// console.log(response);
			})
			.catch((err) => {
				console.log(err);
				alert('Ha ocurrido un error');
			});
	}
	toggleMenu() {
		this.disp = this.disp == 'none' ? 'block' : 'none';
		// console.log(this.disp);
	}
	onClick() {
		sessionStorage.removeItem('user-token');
	}
}
