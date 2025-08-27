# Components Structure

This directory contains all reusable components organized by their purpose and scope.

## Directory Structure

```
src/components/
├── ui/           # Basic UI components (Button, Card, etc.)
├── layout/       # Layout components (Container, etc.)
├── home/         # Homepage-specific components
└── README.md     # This file
```

## Component Categories

### UI Components (`/ui`)

Basic, reusable UI components that can be used throughout the application:

- `Button` - Reusable button component with variants and sizes
- `Card` - Card container with consistent styling

### Layout Components (`/layout`)

Components that handle layout and structure:

- `Container` - Responsive container with max-width constraints

### Page-Specific Components (`/home`)

Components specific to individual pages:

- `Hero` - Homepage hero section
- `FeatureCard` - Individual feature card
- `FeaturesSection` - Grid of feature cards

## Usage

Import components using the path alias:

```tsx
import { Button, Card } from "@/components/ui";
import { Container } from "@/components/layout";
import { Hero, FeaturesSection } from "@/components/home";
```

## Best Practices

1. **Component Naming**: Use PascalCase for component names
2. **File Naming**: Use PascalCase for component files
3. **Props Interface**: Define TypeScript interfaces for component props
4. **Default Props**: Provide sensible defaults where appropriate
5. **Styling**: Use Tailwind CSS classes for consistent styling
6. **Accessibility**: Include proper ARIA attributes and keyboard navigation
7. **Responsive Design**: Ensure components work on all screen sizes

## Adding New Components

1. Create the component file in the appropriate directory
2. Add TypeScript interfaces for props
3. Export the component from the directory's `index.ts` file
4. Update this README if adding new categories
