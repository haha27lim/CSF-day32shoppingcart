import { Component, Input, OnInit } from '@angular/core';
import {Selection} from '../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	// Define an @Input property called contents that accepts an array of Selection objects
	@Input()
	contents: Selection[] = []

	ngOnInit(): void {
	}

}