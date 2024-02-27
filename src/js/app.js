
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
	constructor(productName, productID, manufacturer, expirationDate, quantity, formType) {
	  super(productName, productID, manufacturer, expirationDate, quantity);
	  this.formType = formType;
	}
 }
 
 class PharmacyInventory {
	constructor() {
	  this.medicineList = JSON.parse(localStorage.getItem('medicineList')) || [];
	  this.addMedicineBtn = document.querySelector('#addMedicineBtn');
	  this.productNameInput = document.querySelector('#productName');
	  this.productIDInput = document.querySelector('#productID');
	  this.manufacturerInput = document.querySelector('#manufacturer');
	  this.expirationDateInput = document.querySelector('#expirationDate');
	  this.quantityInput = document.querySelector('#quantity');
	  this.formTypeInput = document.querySelector('#formType');
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
	  const quantity = Number(this.quantityInput.value); 
	  const formType = this.formTypeInput.value;
 
	  if (!productName || !productID || !manufacturer || !expirationDate || !quantity || !formType) {
		 this.showErrorMessage('Please fill out all fields.');
		 return;
	  }
 
	  const existingMedicineIndex = this.medicineList.findIndex(medicine => medicine.productName === productName);
 
	  if (existingMedicineIndex !== -1) {
		 
		 this.medicineList[existingMedicineIndex].quantity += quantity;
	  } else {
		 
		 const medicine = new MedicineWithForm(productName, productID, manufacturer, expirationDate, quantity, formType);
		 this.medicineList.push(medicine);
	  }
 
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
			<td>${medicine.formType}</td>
			<td><button class="deleteBtn" data-index="${index}">Delete</button></td>
		 `;
		 this.medicineTableBody.appendChild(row);
	  });
 
	  // Attach event listeners to delete buttons
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
	  this.formTypeInput.value = '';
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