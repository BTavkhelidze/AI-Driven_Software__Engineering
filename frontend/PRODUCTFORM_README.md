# ProductForm Component Documentation

## Overview

The `ProductForm` component is a fully-featured, production-ready form for creating products. It leverages modern React patterns and libraries to provide a robust, type-safe, and user-friendly experience.

## Tech Stack

- **React Hook Form** - Form state management and validation
- **Zod** - Type-safe schema validation
- **@hookform/resolvers** - Integration between React Hook Form and Zod
- **TanStack Query (React Query)** - Data fetching, caching, and mutations
- **shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

## Features

### ✅ Comprehensive Validation

The form uses a Zod schema (`productSchema`) that validates:

- **name**: String, min 2 chars, max 100 chars
- **slug**: String, min 2 chars, lowercase alphanumeric with hyphens only
- **description**: Optional string, max 1000 chars
- **price**: Number, min $0.01, max $999,999.99
- **stock**: Integer, min 0, max 999,999
- **categoryId**: Required positive integer

### 🔄 Auto-Slug Generation

The form automatically generates a URL-friendly slug from the product name:
- Converts to lowercase
- Removes special characters
- Replaces spaces with hyphens
- Users can manually override the auto-generated slug

### 📡 Data Fetching with TanStack Query

- **Categories**: Fetched using `useQuery` with 5-minute cache
- **Product Creation**: Handled via `useMutation` with automatic cache invalidation
- Error handling for both queries and mutations

### 🎨 Premium UI/UX

- Clean, modern design with shadcn/ui components
- Responsive layout (mobile-first)
- Loading states with spinner animations
- Disabled states during submission
- Form validation feedback in real-time
- Success/error toast notifications

### 🔔 Toast Notifications

- Success toast on product creation
- Error toast on failure
- Auto-dismiss after 5 seconds
- Dismissible by user

## File Structure

```
frontend/src/
├── features/
│   └── products/
│       ├── components/
│       │   └── ProductForm.jsx          # Main form component
│       ├── schemas/
│       │   └── productSchema.js         # Zod validation schema
│       ├── services/
│       │   └── productService.js        # API service functions
│       └── index.js                     # Barrel export
├── components/
│   └── ui/
│       ├── button.jsx                   # Button component
│       ├── input.jsx                    # Input component
│       ├── textarea.jsx                 # Textarea component
│       ├── select.jsx                   # Select component
│       ├── label.jsx                    # Label component
│       ├── form.jsx                     # Form components (FormField, FormItem, etc.)
│       └── toast.jsx                    # Toast notification system
└── lib/
    └── utils.js                         # Utility functions (cn helper)
```

## Usage

### Basic Usage

```jsx
import { ProductForm } from "./features/products/components/ProductForm";

function App() {
  return <ProductForm />;
}
```

### With Success Callback

```jsx
import { ProductForm } from "./features/products/components/ProductForm";

function App() {
  const handleProductCreated = (product) => {
    console.log("Product created:", product);
    // Navigate to product page, show modal, etc.
  };

  return <ProductForm onSuccess={handleProductCreated} />;
}
```

### Required Setup

Wrap your app with the necessary providers in `main.jsx`:

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./components/ui/toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>
);
```

## API Integration

The form expects the following API endpoints:

### GET /api/categories

Fetch all categories for the select dropdown.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Electronics"
    },
    {
      "id": 2,
      "name": "Clothing"
    }
  ]
}
```

### POST /api/products

Create a new product.

**Request Body:**
```json
{
  "name": "Product Name",
  "slug": "product-name",
  "description": "Product description",
  "price": 29.99,
  "stock": 100,
  "categoryId": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "Product Name",
    "slug": "product-name",
    "description": "Product description",
    "price": 29.99,
    "stock": 100,
    "categoryId": 1,
    "createdAt": "2026-06-06T17:00:00.000Z"
  }
}
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000/api
```

## Validation Schema

The Zod schema ensures type safety and validation:

```javascript
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(1000).optional().or(z.literal("")),
  price: z.number().min(0.01).max(999999.99),
  stock: z.number().int().min(0).max(999999),
  categoryId: z.number().int().positive(),
});
```

## Component Props

### ProductForm

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSuccess` | `(product: Product) => void` | No | Callback function called after successful product creation |

## Customization

### Styling

The component uses Tailwind CSS classes. You can customize the appearance by:

1. Modifying the Tailwind classes in the component
2. Updating your `tailwind.config.js` for theme customization
3. Overriding CSS variables for shadcn/ui components

### Validation Rules

Modify the `productSchema.js` file to adjust validation rules:

```javascript
// Example: Change minimum price to $1.00
price: z.number().min(1.00, { message: "Price must be at least $1.00" })
```

### API Endpoints

Update the `productService.js` file to change API endpoints or add authentication headers:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const productService = {
  async createProduct(productData) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Add auth if needed
      },
      credentials: "include",
      body: JSON.stringify(productData),
    });
    // ... rest of the code
  },
};
```

## Error Handling

The component handles errors at multiple levels:

1. **Validation Errors**: Displayed inline below each field via `<FormMessage />`
2. **API Errors**: Shown as toast notifications
3. **Network Errors**: Caught and displayed as toast notifications

## Accessibility

The form is built with accessibility in mind:

- Proper ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Error announcements
- Semantic HTML structure

## Performance Optimizations

- **React Hook Form**: Minimizes re-renders with uncontrolled components
- **TanStack Query**: Caches category data for 5 minutes
- **Debounced Validation**: Validates on change without excessive re-renders
- **Lazy Loading**: Components are tree-shakeable

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

```json
{
  "@hookform/resolvers": "^3.x",
  "@tanstack/react-query": "^5.x",
  "class-variance-authority": "^0.x",
  "clsx": "^2.x",
  "lucide-react": "^0.x",
  "react": "^19.x",
  "react-hook-form": "^7.x",
  "tailwind-merge": "^2.x",
  "zod": "^4.x"
}
```

## Testing

To test the component:

1. Start your backend server
2. Ensure the database is seeded with categories
3. Run the frontend development server: `npm run dev`
4. Navigate to the form and test various scenarios:
   - Valid submissions
   - Invalid data (validation errors)
   - Network errors
   - Auto-slug generation
   - Manual slug override

## Troubleshooting

### Categories not loading

- Check that the backend API is running
- Verify the `VITE_API_URL` environment variable
- Check browser console for CORS errors
- Ensure categories exist in the database

### Form not submitting

- Check browser console for validation errors
- Verify all required fields are filled
- Ensure the API endpoint is correct
- Check network tab for failed requests

### Toast notifications not appearing

- Verify `ToastProvider` wraps your app in `main.jsx`
- Check browser console for errors
- Ensure the toast component is properly imported

## Future Enhancements

Potential improvements for the component:

- [ ] Image upload functionality
- [ ] Rich text editor for description
- [ ] Bulk product import
- [ ] Product preview
- [ ] Draft saving
- [ ] Multi-language support
- [ ] Advanced validation (e.g., duplicate slug detection)
- [ ] Product variants support

## License

This component is part of the AI-Driven Software Engineering project.

## Support

For issues or questions, please refer to the main project documentation or create an issue in the repository.
