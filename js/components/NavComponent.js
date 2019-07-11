import {Component} from '../core/Component.js';
import {FormComponent} from './FormComponent'
import {ListComponent} from './ListComponent';

export class NavComponent extends Component {
	constructor(id) {
		super(id);
	}

	init() {	
	   const blocks = document.querySelectorAll('[data-content="employee"]');
	   Array.from(blocks).forEach((block) => {
	   	   (block.getAttribute('id') === 'list-block')
	   	   ? new ListComponent('list-block')
	   	   : null;
	   });
	   this.$el.addEventListener('click', this.navHandler);
	}

	navHandler(event) {
		event.preventDefault();
		if(event.target.dataset.nav == 'nav') {
			const navs = document.querySelectorAll('[data-nav="nav"]');
			Array.from(navs).forEach((nav) => {
				 nav.classList.remove('active');
			});
			event.target.classList.add('active');

			const id = event.target.getAttribute('href');
		    const blocks = document.querySelectorAll('[data-content="employee"]');
			const tarId = id.split('#')[1]; 

			Array.from(blocks).forEach((block) => {
			
				(block.getAttribute('id') === tarId)
			    ? block.classList.remove('hide')
				: block.classList.add('hide');

			});
			if(tarId === 'add-block') {
			    new FormComponent(tarId);
			}
			else {
			    new ListComponent(tarId);
			}
		}
	}

}

