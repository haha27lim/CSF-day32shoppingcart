import { Component, OnInit, Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {INVENTORY} from '../constants';
import {Inventory, Selection} from '../models';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

	// Initialize the inventories array using the INVENTORY constant
	inventories = INVENTORY

	// Declare the form variable with FormGroup type
	form!: FormGroup

	// Declare an event emitter for adding new items
	@Output()
	onNewItem = new Subject<Selection>()

	constructor(private fb: FormBuilder) { }

	// Execute the createForm method upon initialization
	ngOnInit(): void {
		this.form = this.createForm()
	}

	// Set the selected item and unit price in the form
	selectItem(item: string) {
		console.info(`item: ${item}`)
		const itemCtrl = this.form.get('item') as FormControl
		const unitPriceCtrl = this.form.get('unitPrice') as FormControl
		const inv = this.findItem(item)
		if (!!inv) {
			itemCtrl.setValue(inv.name)
			unitPriceCtrl.setValue(inv.unitPrice)
		}
	}

	// Emit the selection event and reset the form
	addToCart() {
		const selection = this.form.value as Selection
		this.onNewItem.next(selection)
		this.form.reset()
	}

	// Create a new form using the FormBuilder module
	private createForm(): FormGroup {
		return this.fb.group({
			item: this.fb.control<string>('', [ Validators.required ]),
			unitPrice: this.fb.control<number>(0, [ Validators.required, Validators.min(.05) ]),
			quantity: this.fb.control<number>(0, [ Validators.required, Validators.min(1) ])
		})
	}

	// Find the selected item from the inventories array
	private findItem(item: string): Inventory | undefined {
		return this.inventories.find(i => i.name == item)
	}
}