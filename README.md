# Mollie React

A TypeScript React library for integrating Mollie payment components into your React applications.

## Features

- 🔒 **Secure**: Uses Mollie's secure iframe-based components
- 🎨 **Customizable**: Full styling support through Mollie's styling system
- 🚀 **Easy to use**: Simple React components and hooks
- 📦 **TypeScript**: Full TypeScript support with comprehensive types
- ⚡ **Optimized**: Single script loading with context sharing
- 🔧 **Flexible**: Support for all Mollie component types

## Installation

```bash
npm install mollie-react
```

## Quick Start

### 1. Wrap your app with MollieProvider

```tsx
import React from 'react';
import { MollieProvider } from 'mollie-react';

function App() {
  return (
    <MollieProvider 
      profileId="pfl_3RkSN1zuPE" 
      options={{ locale: 'en_US' }}
    >
      <YourCheckoutComponent />
    </MollieProvider>
  );
}
```

### 2. Use Mollie components in your checkout

```tsx
import React from 'react';
import { 
  CardComponent, 
  useCreateToken, 
  useMollie 
} from 'mollie-react';

function CheckoutForm() {
  const { mollie, isLoading } = useMollie();
  const { createToken, isCreatingToken } = useCreateToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await createToken();
    
    if (result.token) {
      // Send token to your backend
      console.log('Payment token:', result.token);
    } else if (result.error) {
      console.error('Payment error:', result.error.message);
    }
  };

  if (isLoading) {
    return <div>Loading Mollie...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardComponent 
        options={{
          styles: {
            base: {
              color: '#32325d',
              fontSize: '16px',
              '::placeholder': {
                color: '#aab7c4'
              }
            }
          }
        }}
      />
      
      <button 
        type="submit" 
        disabled={isCreatingToken}
      >
        {isCreatingToken ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}
```

## Available Components

### Full Card Component
```tsx
<CardComponent 
  options={{
    styles: { /* styling options */ },
    components: {
      cardHolder: { label: 'Cardholder Name' },
      cardNumber: { label: 'Card Number' },
      expiryDate: { label: 'MM/YY' },
      verificationCode: { label: 'CVC' }
    }
  }}
/>
```

### Individual Components
```tsx
<CardHolderComponent />
<CardNumberComponent />
<ExpiryDateComponent />
<VerificationCodeComponent />
```

## Styling

The library supports Mollie's comprehensive styling system:

```tsx
const componentOptions = {
  styles: {
    base: {
      color: '#32325d',
      fontSize: '16px',
      fontWeight: '400',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    valid: {
      color: '#28a745'
    },
    invalid: {
      color: '#dc3545'
    }
  }
};
```

### CSS Classes

Components automatically receive CSS classes for styling:

- `.mollie-component` - Base component class
- `.mollie-component--card` - Component type specific class
- `.mollie-component--is-loading` - Loading state
- `.is-touched` - Component has been focused
- `.is-valid` - Valid input
- `.is-invalid` - Invalid input
- `.has-focus` - Component is focused

## API Reference

### MollieProvider

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `profileId` | `string` | Yes | Your Mollie profile ID |
| `options` | `MollieOptions` | No | Mollie initialization options |
| `scriptUrl` | `string` | No | Custom script URL (defaults to Mollie CDN) |
| `children` | `ReactNode` | Yes | Your app components |

### Component Props

All components accept standard HTML div props plus:

| Prop | Type | Description |
|------|------|-------------|
| `options` | `MollieComponentOptions` | Styling and configuration options |
| `onReady` | `() => void` | Called when component is ready |
| `onMollieError` | `(error: string) => void` | Called on component errors |

### Hooks

#### useMollie()
Returns the Mollie context:
```tsx
const { mollie, isLoading, error } = useMollie();
```

#### useCreateToken()
Handles token creation:
```tsx
const { createToken, isCreatingToken, tokenError } = useCreateToken();
```

#### useMollieComponent()
Low-level hook for custom components:
```tsx
const { 
  component, 
  containerRef, 
  isReady, 
  error, 
  mount, 
  unmount 
} = useMollieComponent('cardNumber', options);
```

## Error Handling

```tsx
function CheckoutForm() {
  const { error } = useMollie();
  const { tokenError } = useCreateToken();

  if (error) {
    return <div>Failed to load Mollie: {error}</div>;
  }

  // Handle token creation errors
  if (tokenError) {
    console.error('Token creation failed:', tokenError);
  }

  return (
    <CardComponent 
      onMollieError={(error) => {
        console.error('Component error:', error);
      }}
    />
  );
}
```

## TypeScript Support

The library includes comprehensive TypeScript definitions:

```tsx
import type { 
  MollieComponentOptions,
  TokenResult,
  ComponentType 
} from 'mollie-react';
```

## License

MIT

## Contributing

Please read our contributing guidelines and submit pull requests to help improve this library.

## Support

For Mollie-specific questions, please refer to the [Mollie Documentation](https://docs.mollie.com/).
For issues with this library, please open an issue on GitHub.
