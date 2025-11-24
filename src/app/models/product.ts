/**
 * @description Interface representing a product in the e-commerce application.
 * Defines the structure and properties of a product item.
 * @interface Product
 */
export interface Product {
  /** @description Unique identifier for the product */
  id: number;

  /** @description Display name of the product */
  name: string;

  /** @description Price of the product in USD */
  price: number;

  /** @description Detailed description of the product */
  description: string;

  /** @description URL path to the product's image */
  url: string;
}
