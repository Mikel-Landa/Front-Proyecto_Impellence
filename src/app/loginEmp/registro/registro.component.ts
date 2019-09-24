import { Component, OnInit } from '@angular/core';
import { BusinessServiceService } from 'src/app/business-service.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-registro',
	templateUrl: './registro.component.html',
	styleUrls: [ './registro.component.css' ]
})
export class RegistroComponent implements OnInit {
	constructor(private businessService: BusinessServiceService, private router: Router) {}

	ngOnInit() {}

	onSubmit(formulario) {
		console.log(formulario.form.status);
		if (formulario.form.status == 'VALID') {
			this.businessService
				.register(formulario.value)
				.then((response) => {
					console.log(response);
					if (response['insertId']) {
						alert('Registro exitoso');
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
