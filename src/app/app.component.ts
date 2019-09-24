import { Component } from '@angular/core';
import { AdminAppService } from './admin-app.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	isLogged: boolean;

	constructor(public adminServices: AdminAppService) {}
	ngOnInit() {}
}
