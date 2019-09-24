import { Component, OnInit } from '@angular/core';
import { AdminAppService } from '../admin-app.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	constructor(private adminServices: AdminAppService) {}

	ngOnInit() {}

	onSubmit(values) {
		this.adminServices
			.login(values)
			.then((res) => {
				if (res['token']) {
					sessionStorage.setItem('user-token', res['token']);
					this.adminServices.isLogged();
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
