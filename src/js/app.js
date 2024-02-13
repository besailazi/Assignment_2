
class Medicine {
	constructor(productName, productID, manufacturer, expirationDate, quantity) {
		 this.productName = productName;
		 this.productID = productID;
		 this.manufacturer = manufacturer;
		 this.expirationDate = expirationDate;
		 this.quantity = quantity;
	}

	getFormattedExpirationDate() {
		 const date = new Date(this.expirationDate);
		 return date.toISOString().split('T')[0];
	}
}

class PharmacyInventory {
	constructor() {
		 this.medicines = JSON.parse(localStorage.getItem('medicines')) || [];
	}

	addMedicine(medicine) {
		 if (this.isProductIDUnique(medicine.productID)) {
			  this.medicines.push(medicine);
			  this.saveToLocalStorage();
			  return true;
		 } else {
			  return false; // Product ID already exists
		 }
	}

	deleteMedicine(productID) {
		 this.medicines = this.medicines.filter(medicine => medicine.productID !== productID);
		 this.saveToLocalStorage();
	}

	isProductIDUnique(productID) {
		 return !this.medicines.some(medicine => medicine.productID === productID);
	}

	saveToLocalStorage() {
		 localStorage.setItem('medicines', JSON.stringify(this.medicines));
		 this.displayMedicines();
	}

	displayMedicines() {
		 const medicineListContainer = document.getElementById('medicineList');
		 medicineListContainer.innerHTML = '';

		 this.medicines.forEach(medicine => {
			  const medicineItem = document.createElement('div');
			  medicineItem.className = 'medicine-item';
			  medicineItem.innerHTML = `
					<strong>${medicine.productName}</strong> (ID: ${medicine.productID})<br>
					Manufacturer: ${medicine.manufacturer}<br>
					Expiration Date: ${medicine.getFormattedExpirationDate()}<br>
					Quantity: ${medicine.quantity}<br>
					<button onclick="deleteMedicine('${medicine.productID}')">Delete</button>
			  `;
			  medicineListContainer.appendChild(medicineItem);
		 });
	}
}

const pharmacyInventory = new PharmacyInventory();

function addMedicine() {
	const form = document.getElementById('medicineForm');
	const productName = form.elements['productName'].value;
	const productID = form.elements['productID'].value;
	const manufacturer = form.elements['manufacturer'].value;
	const expirationDate = form.elements['expirationDate'].value;
	const quantity = form.elements['quantity'].value;

	const medicine = new Medicine(productName, productID, manufacturer, expirationDate, quantity);

	if (pharmacyInventory.addMedicine(medicine)) {
		 form.reset();
	} else {
		 alert('Product ID must be unique.');
	}
}

function deleteMedicine(productID) {
	pharmacyInventory.deleteMedicine(productID);
}

// Display existing medicines on page load
pharmacyInventory.displayMedicines();