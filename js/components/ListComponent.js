import {Component} from '../core/Component';

export class ListComponent extends Component {
	
	constructor(id) {
		super(id);
		this.valid = null;
		this.dataObj = [];
		this.itemObj = {};
	}

	init() {
		console.log(this.$el);
		this.render();		
	}

	show() {
		this.$el.classList.remove('hide');
	}

	hide() {
		this.$el.classList.add('hide');
	}

    handlerListItemClick(e) {
    	// e.stopPropagation();
		e.preventDefault();
		console.log('click', e);
		// e.stopPropagation();
		var self = this;
		// console.log('self',self);
		// console.log('handle list item click');
		// console.log(this.$el);
		// 	alert('click');
		if(e.target.dataset.action === 'edit') {
			// console.log('edit');
			// console.log('edit', e.target.id);
			// this.action = e.target.dataset.action;
			let employees = JSON.parse(localStorage.getItem('employees'));
			employees.filter(item => {
				 return (item.id == e.target.dataset.id)
				 ? item.action = e.target.dataset.action
				 : item;
			});
			localStorage.setItem('employees', JSON.stringify(employees));
			this.render();	

		}
		if(e.target.dataset.action === 'save') {
			
			console.log('save');

			// let employees = JSON.parse(localStorage.getItem('employees'));
			// let data = employees.filter(item => {
			// 	 return (item.id == e.target.id)
			// 	 ? item.action = e.target.dataset.action
			// 	 : item;
			// });
			// localStorage.setItem('employees', JSON.stringify(data));
			// this.render();
			
			let fields = document.querySelectorAll('.employees__list-control');
			// this.valid = document.querySelector('[data-valid]');
			// console.log('valid',this.valid.dataset.valid);

			var dataObj = [];
			var itemObj = {};
			var valid = null;

			Array.from(fields).forEach((field) => {
		
				if(field.value !== '' && field.value !== undefined) {
					// console.log(field.value);
					field.classList.remove('invalid');

					const name = field.getAttribute('name');
					const value = field.value;
					console.log('value:', value);

					itemObj[name] = value;
					console.log('itemObj: ', itemObj);

					field.dataset.valid = 'true';
					
				}
				else {
					field.classList.add('invalid');
					field.dataset.valid = 'false';
				}
			});

            console.log('itemObj - ',itemObj);


			try {
				Array.from(fields).map((item) => {
					if(item.dataset.valid == 'false') {
					    valid = 'false';
					    throw BreakException;
					} else {
						valid = 'true';
					}
				});
			}
			catch(e) {}

			


			// console.log(itemObj);
			
			
			
			if(valid == 'false') {
				console.log('error');
			}
			else {
				let employees = JSON.parse(localStorage.getItem('employees'));
				employees.filter(item => {
					return (item.id == e.target.dataset.id)
					? item.action = ''
					: item;
				});

				dataObj.push(itemObj);
				// console.log('data',dataObj);
				
				employees.map((employee) => {
					if(employee.id == e.target.dataset.id) {
						dataObj.map((item) => {
							   // console.log('name', item.name);
								employee.name = item.name;
								employee.phone = item.phone;
								employee.email = item.email;
								employee.position = item.position; 
								// console.log(employee);
								// return employee;
						});

					}
				});
				console.log('employees 1',employees);
				localStorage.setItem('employees', JSON.stringify(employees));
				this.render();
			}
			

		}
		if(e.target.dataset.action === 'remove') {
			console.log('remove');
			let id = parseFloat(e.target.dataset.id);
			let employees = JSON.parse(localStorage.getItem('employees'));

			let data = employees.filter((item) => {
				if(item.id !== id) {
					return item;
				}
			});

			localStorage.setItem('employees', JSON.stringify(data));
			this.render();
		}

	}

	render() {
		// console.log(self);
		// console.log('ListComponent render', this.$el);
		// console.log(this.action);

		
		if(localStorage.getItem('employees')) {
			// console.log(JSON.parse(localStorage.getItem('employees')));
			const data = JSON.parse(localStorage.getItem('employees'));
			let html = '';
				html = data.map((item) => {
					if(item.action === 'edit') {
						return `
						   <div class="employees__list-item">
								<div class="employees__list-text">
									<div>
									    <label><strong>Name:</strong> </label>
										<input class="employees__list-control" type="text" name="name" data-valid="true" value="${item.name}" />
									</div>
									<div>
										<label><strong>Tel: </strong></label>
										<input class="employees__list-control" type="tel" name="phone" data-valid="true" value="${item.phone}" />
									</div>
									<div>
										<label><strong>Email: </strong></label>
										<input class="employees__list-control" type="email"  name="email" data-valid="true" value="${item.email}" />
									</div>
									<div>
									    <label><strong>Job: </strong></label>
										<input class="employees__list-control" type="text" name="position" data-valid="true" value="${item.position}"  />
									</div>
								</div>
								<div class="employees__list-buttons">
									<div>
										<a class="employees__btn employees__btn_uppercase employees__btn_primary" data-action="save" data-id="${item.id}" href="#">Save</a>
									</div>
								</div>
							</div>
						`;
					}
					else {
						return `
						   <div class="employees__list-item">
								<div class="employees__list-text">
									<div>
										<h5>${item.name}</h5>
									</div>
									<div>
										<p><strong>Tel: </strong> ${item.phone}</p>
									</div>
									<div>
										<p><strong>Email: </strong>${item.email}</p>
									</div>
									<div>
										<p><strong>Job: </strong> ${item.position}</p>
									</div>
								</div>
								<div class="employees__list-buttons">
									<div>
										<a class="employees__btn employees__btn_uppercase employees__btn_warning" data-action="edit" data-id="${item.id}" href="#">Edit</a>
									</div>
									<div>
										<a class="employees__btn employees__btn_uppercase employees__btn_danger" data-action="remove" data-id="${item.id}" href="#">Remove</a>
									</div>
								</div>
							</div>
						`;
					}
			    	
				 
				});

			 
			this.$el.innerHTML = '';
			this.$el.insertAdjacentHTML('afterbegin', html.join(' '));

			let employeesList = document.querySelectorAll('.employees__list-item');
			if(employeesList) {
				Array.from(employeesList).forEach((employeeItem) => {
					const handlerListItemClick = (e) => this.handlerListItemClick(e);
					// employeesList.removeEventListener('click', handlerListItemClick2, false);
					employeeItem.addEventListener('click', handlerListItemClick, false);
				});
				
			}

		}
		
        

	}

	

	
}








	