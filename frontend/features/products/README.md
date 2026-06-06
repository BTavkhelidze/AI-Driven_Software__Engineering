# Products Feature Module

## Quick Start

```jsx
import { ProductForm } from "@/features/products";

function MyPage() {
  return <ProductForm onSuccess={(product) => console.log(product)} />;
}
```

## What's Included

### Components
- **ProductForm** - Full-featured product creation form with validation

### Schemas
- **productSchema** - Zod validation schema for product data

### Services
- **productService** - API service for products and categories

## Key Features

✅ **React Hook Form** integration with Zod validation  
✅ **TanStack Query** for data fetching and mutations  
✅ **Auto-slug generation** from product name  
✅ **Real-time validation** with inline error messages  
✅ **Toast notifications** for success/error feedback  
✅ **shadcn/ui components** for premium design  
✅ **Fully typed** with comprehensive validation  
✅ **Responsive design** with Tailwind CSS  

## Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | Text | Yes | Min 2, Max 100 chars |
| Slug | Text | Yes | Lowercase, alphanumeric, hyphens |
| Description | Textarea | No | Max 1000 chars |
| Price | Number | Yes | Min $0.01, Max $999,999.99 |
| Stock | Number | Yes | Integer, Min 0, Max 999,999 |
| Category | Select | Yes | Must select valid category |

## API Requirements

The form expects these endpoints:

- `GET /api/categories` - Returns list of categories
- `POST /api/products` - Creates a new product

See [PRODUCTFORM_README.md](../../PRODUCTFORM_README.md) for detailed API specifications.

## Environment Setup

Create `.env` file:
```env
VITE_API_URL=http://localhost:3000/api
```

## Dependencies

All required dependencies are already installed:
- @hookform/resolvers
- @tanstack/react-query
- react-hook-form
- zod
- class-variance-authority
- clsx
- tailwind-merge
- lucide-react
