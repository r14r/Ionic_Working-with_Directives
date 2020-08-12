import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	private MODULE="HomePage";

	public title = "Directive Samples";

	constructor() {
		console.log(this.MODULE + '::construtor | ');
	}

}
