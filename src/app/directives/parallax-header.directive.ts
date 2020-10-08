import { Directive, AfterViewInit, ElementRef, Renderer2, Input } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[app-parallax-header]',
  host: {
	'(ionScroll)': 'onContentScroll($event)'
}
})
export class ParallaxHeaderDirective {
	private MODULE="ParallaxHeaderDirective";

	@Input('app-parallax-header') imagePath: string;
	@Input('parallaxHeight') parallaxHeight: number;

	private headerHeight: number;
	private header: HTMLDivElement;
  	private mainContent: HTMLDivElement;

	constructor(private element: ElementRef, private renderer: Renderer2, private domCtrl: DomController) {
		console.log(this.MODULE + '::constructor | ');
	}

	ngAfterViewInit(){
		console.log(this.MODULE + '::ngAfterViewInit | ');
		this.headerHeight = this.parallaxHeight;
    	this.mainContent = this.element.nativeElement.querySelector('.main-content');

		console.log(this.MODULE + '::ngAfterViewInit | ', this.mainContent);

		this.domCtrl.write(() => {

			this.header = this.renderer.createElement('div');
			console.log(this.MODULE + '::ngAfterViewInit | header = ', this.header);

			this.renderer.insertBefore(this.element.nativeElement, this.header, this.element.nativeElement.firstChild);
			console.log(this.MODULE + '::ngAfterViewInit | firstChild = ', this.element.nativeElement.firstChild);
			console.log(this.MODULE + '::ngAfterViewInit | imagePath  = ', this.imagePath);
			
			this.renderer.setStyle(this.header, 'background-image', 'url(' + this.imagePath + ')');
			this.renderer.setStyle(this.header, 'height', this.headerHeight + 'px');
			this.renderer.setStyle(this.header, 'background-size', 'cover');

		});

  	}

	onContentScroll(ev){
		console.log(this.MODULE + '::onContentScroll | ');

	    this.domCtrl.read(() => {

	      let translateAmt, scaleAmt;
	  
	      // Already scrolled past the point at which the header image is visible
	      if(ev.detail.scrollTop > this.parallaxHeight){
	        return;
	      }

	      if(ev.detail.scrollTop >= 0){
	          translateAmt = -(ev.detail.scrollTop / 2);
	          scaleAmt = 1;
	      } else {
	          translateAmt = 0;
	          scaleAmt = -ev.detail.scrollTop / this.headerHeight + 1;
	      }

	      this.domCtrl.write(() => {
	        this.renderer.setStyle(this.header, 'transform', 'translate3d(0,'+translateAmt+'px,0) scale('+scaleAmt+','+scaleAmt+')');
	        this.renderer.setStyle(this.mainContent, 'transform', 'translate3d(0, '+(-ev.detail.scrollTop) + 'px, 0');
	      });

	    });

	}
}
