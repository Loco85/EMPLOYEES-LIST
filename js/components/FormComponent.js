import {Component} from '../core/Component';

export class FormComponent extends Component {
	constructor(id) {
		super(id);
		this.vlid = null;
	}

	init() {
		console.log(this.$el);
		const form = this.$el.querySelector('#employees-form');
		form.addEventListener('submit', this.formSubmit);
	}

	show() {
		this.$el.classList.remove('hide');
	}

	hide() {
		this.$el.classList.add('hide');
	}

	formSubmit(event) {

		event.preventDefault();
		console.log('submit', this.$el);
		let fields = document.querySelectorAll('.employees__form-control');
		let data = [];
		let item = {};
		Array.from(fields).forEach((field) => {
			 if(field.value !== '') {
			 	field.classList.remove('invalid');

			 	const name = field.getAttribute('name');
			 	const value = field.value;

			 	item[name] = value;
			 	field.dataset.valid = 'true';
			 }
			 else {
			 	field.classList.add('invalid');
			 	field.dataset.valid = 'false';
			 }
		});

		try {
			Array.from(fields).forEach((item) => {
				if(item.dataset.valid == 'false') {
					this.valid = 'false';
					throw BreakException;
				} else {
					this.valid = 'true';
				}
			});
		}
		catch(e) {}
		
		if(this.valid == 'false') {
			console.log('Error');
		}
		else {
			// console.log(JSON.stringify(data));
			if(localStorage.getItem('employees')) {
				let dataOld = JSON.parse(localStorage.getItem('employees'));
				// if(dataOld.length > 0) {
				data = dataOld.map(o => ({...o}));
				// }
			}
			item.id = Math.random();
			item.action = '';
			data.push(item);
			console.log(data);
			localStorage.setItem('employees', JSON.stringify(data));
		}
		
		
	}

	render() {
		console.log('FormComponent render');
	}
}