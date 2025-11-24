# MyStore - Angular E-Commerce Application

## Project Description

MyStore is a modern e-commerce web application built with Angular 20. This single-page application provides a complete online shopping experience with product browsing, detailed product views, shopping cart management, and order confirmation functionality.

### Features

- **Product Catalog**: Browse through a curated selection of products with images, prices, and descriptions
- **Enhanced Visual Design**: Products feature prominent blue borders and modern card styling with hover effects
- **Product Details**: Click on any product card to view detailed information including full descriptions
- **Shopping Cart**: Add products to cart with customizable quantities (0-10 items)
- **Real-time Cart Updates**: Quantities and totals update instantly across all components
- **Cart Management**: Modify quantities or remove items directly from the cart (setting quantity to 0 removes the item)
- **Order Processing**: Complete purchases with shipping information and receive order confirmation
- **Responsive Design**: Optimized for both desktop and mobile devices with fluid layouts
- **Clean UI**: Modern, user-friendly interface with enhanced blue theme and intuitive navigation
- **Angular Best Practices**: Implements proper @Input/@Output decorators and service-based communication

### Technology Stack

- **Frontend**: Angular 20.3.0 with TypeScript
- **Styling**: CSS3 with responsive grid layouts and modern card designs
- **Component Architecture**: @Input/@Output decorators for parent-child communication
- **State Management**: Service-based architecture for sibling component communication
- **Data**: JSON-based product catalog with TypeScript interfaces
- **Routing**: Angular Router for single-page navigation
- **Forms**: Angular Reactive Forms with two-way data binding
- **Build Tools**: Angular CLI with hot-reload development server

## Installation Instructions

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Angular CLI** (version 20.3.9 or higher)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mystore
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Angular CLI globally** (if not already installed)
   ```bash
   npm install -g @angular/cli@20.3.9
   ```

## Launch Instructions

### Development Server

1. **Start the development server**

   ```bash
   ng serve
   ```

2. **Access the application**
   - Open your web browser
   - Navigate to `http://localhost:4200/`
   - The application will automatically reload when you modify source files

### Production Build

1. **Build for production**

   ```bash
   ng build --configuration production
   ```

2. **Serve the built application**
   - The build artifacts will be stored in the `dist/` directory
   - Deploy the contents to your preferred web server

### Testing

- **Unit Tests**: Run `ng test` to execute unit tests via Karma
- **End-to-End Tests**: Run `ng e2e` for e2e testing

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── product-list/     # Product catalog with grid layout
│   │   ├── product-item/     # Individual product cards with @Input/@Output
│   │   ├── product-detail/   # Detailed product view with enhanced styling
│   │   ├── cart/            # Shopping cart management
│   │   ├── cart-item/       # Individual cart item component
│   │   └── confirmation/    # Order confirmation with order summary
│   ├── models/              # TypeScript interfaces (Product, CartItem)
│   │   ├── product.ts       # Product data model
│   │   └── cart-item.ts     # Cart item data model
│   ├── services/            # Business logic and state management
│   │   ├── cart.service.ts  # Centralized cart management
│   │   └── product.service.ts # Product data operations
│   ├── layout/              # Application layout components
│   │   └── header/          # Navigation header component
│   └── assets/              # Static files and product data
│       └── data.json        # Product catalog with sample data
└── styles.css              # Global application styles
```

### Component Hierarchy

```
AppComponent
├── HeaderComponent (layout/header)
└── RouterOutlet
    ├── ProductListComponent
    │   └── ProductItemComponent[] (with @Input/@Output)
    ├── ProductDetailComponent
    ├── CartComponent
    │   └── CartItemComponent[] (with @Input/@Output)
    └── ConfirmationComponent
```

## Data Flow Architecture

This application demonstrates proper Angular data flow patterns following industry best practices:

### Parent-Child Communication (@Input/@Output)

The application implements comprehensive parent-child component communication using Angular decorators:

#### ProductList → ProductItem Components

- **@Input Properties**:
  - `product`: Product data from parent component
  - `selectedQuantity`: Current quantity selection managed by parent
- **@Output Events**:
  - `quantityChange`: Emitted when user changes quantity selection
  - `addToCart`: Emitted when user clicks "Add to Cart" button
  - `productSelect`: Emitted when user clicks on product card for navigation
- **Data Flow**: ProductList manages state and responds to child events while ProductItem handles display and user interactions

#### Cart → CartItemComponent

- **@Input Properties**:
  - `item`: CartItem object containing product and quantity data
- **@Output Events**:
  - `quantityUpdate`: Emitted when user modifies item quantity with productId and new quantity
- **Data Flow**: Cart manages overall cart state while CartItemComponent handles individual item interactions and validation

### Sibling Component Communication (Services)

Cart data is shared between sibling components using the comprehensive CartService:

#### CartService Implementation

- **Cross-Component Communication**: ProductList, ProductDetail, and Cart components communicate via the shared CartService
- **Centralized State Management**: CartService maintains cart items, quantities, totals, and order information
- **Type Safety**: All methods use TypeScript interfaces (Product, CartItem) for type safety
- **Real-time Updates**: Components receive immediate updates when cart state changes
- **Data Persistence**: Service retains cart state across component navigation and page refreshes

#### Service Methods

- `addToCart(product: Product, quantity: number)`: Adds products with intelligent duplicate handling
- `getItems(): CartItem[]`: Retrieves current cart items for display components
- `updateQuantity(productId: number, quantity: number)`: Modifies quantities with automatic cleanup
- `getTotal(): number`: Calculates real-time cart totals
- `clearCart()`: Empties cart after successful order completion
- `setOrderInfo(name: string)` / `getOrderInfo()`: Manages order data for confirmation display

### Template Data Binding

The application uses proper Angular template binding patterns:

- **Two-way Binding**: `[(ngModel)]` for form controls and quantity selectors
- **Event Binding**: `(click)`, `(change)` events properly handled with type safety
- **Property Binding**: `[src]`, `[alt]`, `[value]` attributes dynamically bound to component properties
- **String Interpolation**: `{{ }}` for displaying dynamic content with proper type conversion

This architecture ensures clean separation of concerns, maintainable code, and proper data flow throughout the application following Angular's recommended patterns.

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Official Documentation](https://angular.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
