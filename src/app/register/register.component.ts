import { Component, OnInit } from '@angular/core';
import { AdminAppService } from '../admin-app.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
	constructor(private adminServices: AdminAppService, private router: Router) {}

	ngOnInit() {}

	onSubmit(formulario) {
		console.log(formulario.form.status);
		if (formulario.form.status == 'VALID') {
			this.adminServices
				.register(formulario.value)
				.then((response) => {
					if (response['insertId']) {
						alert('Registro exitoso');
						this.router.navigate([ '/login' ]);
					}
					else if (response['mensaje']) alert(response['mensaje'] + ',prube otro nombre');
				})
				.catch((err) => {
					console.log(err);
				});
		}
		else {
			alert('El formulario es inválido');
			console.log(formulario);
		}
	}
}
