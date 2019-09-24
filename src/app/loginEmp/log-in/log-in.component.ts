import { Component, OnInit } from '@angular/core';
import { AdminAppService } from 'src/app/admin-app.service';
import { BusinessServiceService } from 'src/app/business-service.service';

@Component({
	selector: 'app-log-in',
	templateUrl: './log-in.component.html',
	styleUrls: [ './log-in.component.css' ]
})
export class LogInComponent implements OnInit {
	constructor(private businessService: BusinessServiceService) {}

	ngOnInit() {}

	onSubmit(values) {
		this.businessService
			.login(values)
			.then((res) => {
				if (res['token']) {
					sessionStorage.setItem('business-token', res['token']);
					this.businessService.isLogged();
				}
				else {
					console.log(res);
					alert('Ha ocurrido un error, mira la consola para más informacion');
				}
			})
			.catch((err) => {
				console.log(err);
				alert('Promesa rechazada,mira la consola para más información');
			});
	}
}
