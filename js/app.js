class Medicine {
	constructor(productName, productID, manufacturer, expirationDate, quantity) {
	  this.productName = productName;
	  this.productID = productID;
	  this.manufacturer = manufacturer;
	  this.expirationDate = expirationDate;
	  this.quantity = quantity;
	}
}
 
class MedicineWithForm extends Medicine {
	constructor(productName, manufacturer, expirationDate, quantity, formType, productID) {
	  super(productName, productID, manufacturer, expirationDate, quantity);
	  this.formType = formType;
	}
}
 
class PharmacyInventory {
	constructor() {
	  this.medicineList = JSON.parse(localStorage.getItem('medicineList')) || [];
	  this.addMedicineBtn = document.querySelector('#addMedicineBtn');
	  this.productNameInput = document.querySelector('#productName');
	  this.manufacturerInput = document.querySelector('#manufacturer');
	  this.expirationDateInput = document.querySelector('#expirationDate');
	  this.quantityInput = document.querySelector('#quantity');
	  this.formTypeInput = document.querySelector('#formType');
	  this.medicineTableBody = document.querySelector('.medicineListBody');
	  this.errorMessage = document.querySelector('#error-message');
     this.itemCounter = document.querySelector('.item-counter');
     this.counter = 1; 


	  this.addMedicineBtn.addEventListener('click', (event) => {
		event.preventDefault(); 
		this.addMedicine();
	  });
	  this.updateTable();
	}
 
	addMedicine() {
		const productName = this.productNameInput.value;
		const manufacturer = this.manufacturerInput.value;
		const expirationDate = this.expirationDateInput.value;
		const quantity = Number(this.quantityInput.value);
		const formType = this.formTypeInput.value;
  
		if (!productName || !manufacturer || !expirationDate || !quantity || !formType) {
			 this.showErrorMessage('Please fill out all fields.');
			 return;
		}
  
		let existingMedicine = this.medicineList.find(medicine => medicine.productName === productName);
  
		if (existingMedicine) {
			 // Update the existing medicine's details and quantity
			 existingMedicine.manufacturer = manufacturer;
			 existingMedicine.expirationDate = expirationDate;
			 existingMedicine.quantity += quantity;
			 existingMedicine.formType = formType;
			 this.showMessage('Item details updated');
		} else {
			 const productID = this.generateProductID();
			 const medicine = new MedicineWithForm(productName, manufacturer, expirationDate, quantity, formType, productID);
			 this.medicineList.push(medicine);
			 this.showMessage('Item added');
		}
  
		this.updateCounter();
		localStorage.setItem('medicineList', JSON.stringify(this.medicineList));
		this.updateTable();
		this.clearInputs();
		this.clearErrorMessage();
  }
  
  
	
	updateTable() {
	  this.medicineTableBody.innerHTML = '';
	  this.counter = 1;

 
	  this.medicineList.forEach((medicine, index) => {
		 const row = document.createElement('tr');
		 row.innerHTML = `
		   <td>${this.counter}</td>
			<td>${medicine.productName}</td>
			<td>${medicine.manufacturer}</td>
			<td>${medicine.expirationDate}</td>
			<td>${medicine.quantity}</td>
			<td>${medicine.formType}</td>
			<td><button class="deleteBtn" data-index="${index}">Delete</button></td>
		 `;
		 this.medicineTableBody.appendChild(row);
		 this.counter++;
	  });
 
	  // ADD EVENTLISTENERS TO THE DELETE BUTTON
	  const deleteButtons = document.querySelectorAll('.deleteBtn');
	  deleteButtons.forEach(button => {
		 button.addEventListener('click', event => {
			const index = event.target.dataset.index;
			this.deleteMedicine(index);
		 });
	  });
	}
 
	deleteMedicine(index) {
	  this.medicineList.splice(index, 1);
	  localStorage.setItem('medicineList', JSON.stringify(this.medicineList));
	  this.updateTable();
	  this.updateCounter();
	  this.showMessage('Item removed');
	}
 
	clearInputs() {
	  this.productNameInput.value = '';
	  this.manufacturerInput.value = '';
	  this.expirationDateInput.value = '';
	  this.quantityInput.value = '';
	  this.formTypeInput.value = '';
	  this.clearErrorMessage();
	}
 
	showErrorMessage(message) {
	  this.errorMessage.textContent = message;
	}
 
	clearErrorMessage() {
	  this.errorMessage.textContent = '';
	}

	generateProductID() { 
	  return Math.random().toString(36).slice(2, 11); 
	}

	showMessage(message) {
		const messageElement = document.createElement('div');
		messageElement.textContent = message;
		messageElement.classList.add('message');
		document.body.appendChild(messageElement);
 
		setTimeout(() => {
		 messageElement.remove();
		}, 2000);
	 }

	 updateCounter() {
		const itemCount = this.medicineList.length;
		if (itemCount === 1) {
		  this.itemCounter.textContent = `1 Item added`;
		} else {
		  this.itemCounter.textContent = `${itemCount} Items added`;
		}
	 }
}
 
const pharmacyInventory = new PharmacyInventory();
