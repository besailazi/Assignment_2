
class Medicine {
	constructor(productName, productID, manufacturer, expirationDate, quantity) {
	  this.productName = productName;
	  this.productID = productID;
	  this.manufacturer = manufacturer;
	  this.expirationDate = expirationDate;
	  this.quantity = quantity;
	}
 }
 
 class PharmacyInventory extends Medicine {
	constructor() {
	  super();
	  this.medicineList = JSON.parse(localStorage.getItem('medicineList')) || [];
	  this.addMedicineBtn = document.querySelector('#addMedicineBtn');
	  this.productNameInput = document.querySelector('#productName');
	  this.productIDInput = document.querySelector('#productID');
	  this.manufacturerInput = document.querySelector('#manufacturer');
	  this.expirationDateInput = document.querySelector('#expirationDate');
	  this.quantityInput = document.querySelector('#quantity');
	  this.medicineTableBody = document.querySelector('.medicineListBody');
	  this.errorMessage = document.querySelector('#error-message');
 
	  this.addMedicineBtn.addEventListener('click', () => this.addMedicine());
	  this.updateTable();
	}
 
	addMedicine() {
	  const productName = this.productNameInput.value;
	  const productID = this.productIDInput.value;
	  const manufacturer = this.manufacturerInput.value;
	  const expirationDate = this.expirationDateInput.value;
	  const quantity = this.quantityInput.value;
 
	  if (!productName || !productID || !manufacturer || !expirationDate || !quantity) {
		 this.showErrorMessage('Please fill out all fields.');
		 return;
	  }
 
	  if (this.medicineList.some(medicine => medicine.productID === productID)) {
		 this.showErrorMessage('Product ID must be unique.');
		 return;
	  }
 
	  const medicine = new Medicine(productName, productID, manufacturer, expirationDate, quantity);
 
	  this.medicineList.push(medicine);
	  localStorage.setItem('medicineList', JSON.stringify(this.medicineList));
	  this.updateTable();
	  this.clearInputs();
	}
 
	updateTable() {
	  this.medicineTableBody.innerHTML = '';
 
	  this.medicineList.forEach((medicine, index) => {
		 const row = document.createElement('tr');
		 row.innerHTML = `
			<td>${medicine.productName}</td>
			<td>${medicine.productID}</td>
			<td>${medicine.manufacturer}</td>
			<td>${medicine.expirationDate}</td>
			<td>${medicine.quantity}</td>
			<td><button class="deleteBtn" data-index="${index}">Delete</button></td>
		 `;
		 this.medicineTableBody.appendChild(row);
	  });
 
	  // ADD LISTENERS TO THE DELETE BUTTONS
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
	}
 
	clearInputs() {
	  this.productNameInput.value = '';
	  this.productIDInput.value = '';
	  this.manufacturerInput.value = '';
	  this.expirationDateInput.value = '';
	  this.quantityInput.value = '';
	  this.clearErrorMessage();
	}
 
	showErrorMessage(message) {
	  this.errorMessage.textContent = message;
	}
 
	clearErrorMessage() {
	  this.errorMessage.textContent = '';
	}
 }
 
 const pharmacyInventory = new PharmacyInventory();