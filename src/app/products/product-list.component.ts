import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// import { IProduct } from './product';
// import { ProductService } from './product.service';

@Component({
    templateUrl: 'product-list.component.html',
    styleUrls: ['product-list.component.css']
})
export class ProductListComponent implements OnInit {


    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
    }
}
