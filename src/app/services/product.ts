import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

/**
 * @description Service responsible for managing product data operations.
 * Provides methods to fetch product information from the data source.
 * @class ProductService
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  /** @description URL path to the product data JSON file */
  private productsUrl = 'assets/data.json';

  /**
   * @description Creates an instance of ProductService.
   * @constructor
   * @param {HttpClient} http - Angular HTTP client for making HTTP requests
   */
  constructor(private http: HttpClient) {}

  /**
   * @description Retrieves all products from the data source.
   * @returns {Observable<Product[]>} Observable that emits an array of Product objects
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  /**
   * @description Retrieves a specific product by its ID.
   * @param {number} id - The unique identifier of the product
   * @returns {Observable<Product | undefined>} Observable that emits the found Product or undefined
   */
  getProduct(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(map((products) => products.find((p) => p.id === id)));
  }
}
