import { Component, OnInit } from '@angular/core';
import { AdminAppService } from '../admin-app.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	info1: boolean;
	info2: boolean;
	info3: boolean;
	constructor(private adminServices: AdminAppService) {
		this.info1 = true;
		this.info2 = false;
		this.info3 = false;
	}

	ngOnInit() {}
	onClick(pNum) {
		this.info1 = false;
		this.info2 = false;
		this.info3 = false;
		switch (pNum) {
			case 0:
				this.info1 = true;
				break;
			case 1:
				this.info2 = true;
				break;
			case 2:
				this.info3 = true;
				break;
		}
	}
}
