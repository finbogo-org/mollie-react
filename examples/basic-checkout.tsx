import React, { useState } from 'react';
import { 
  MollieProvider, 
  CardComponent, 
  useCreateToken, 
  useMollie 
} from '../src/index';

// Example checkout form component
function CheckoutForm() {
  const { mollie, isLoading } = useMollie();
  const { createToken, isCreatingToken, tokenError } = useCreateToken();
  const [paymentResult, setPaymentResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await createToken();
      
      if (result.token) {
        setPaymentResult(`Success! Token: ${result.token}`);
        // In a real app, you would send this token to your backend
        // to create the actual payment with Mollie's API
      } else if (result.error) {
        setPaymentResult(`Error: ${result.error.message}`);
      }
    } catch (error) {
      setPaymentResult(`Unexpected error: ${error}`);
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading Mollie payment components...</p>
      </div>
    );
  }

  return (
    <div className="checkout-form">
      <h2>Payment Details</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Card Information</label>
          <CardComponent 
            options={{
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
              },
              components: {
                cardHolder: { label: 'Cardholder Name' },
                cardNumber: { label: 'Card Number' },
                expiryDate: { label: 'MM/YY' },
                verificationCode: { label: 'CVC' }
              }
            }}
            onReady={() => console.log('Card component is ready')}
            onMollieError={(error) => console.error('Card component error:', error)}
            className="card-component"
          />
        </div>

        <button 
          type="submit" 
          disabled={isCreatingToken}
          className="pay-button"
        >
          {isCreatingToken ? 'Processing Payment...' : 'Pay Now'}
        </button>
      </form>

      {tokenError && (
        <div className="error">
          <p>Payment Error: {tokenError}</p>
        </div>
      )}

      {paymentResult && (
        <div className="result">
          <p>{paymentResult}</p>
        </div>
      )}
    </div>
  );
}

// Main app component
export function App() {
  return (
    <MollieProvider 
      profileId="pfl_3RkSN1zuPE" // Replace with your actual profile ID
      options={{ 
        locale: 'en_US',
        testmode: true 
      }}
    >
      <div className="app">
        <h1>Mollie React Example</h1>
        <CheckoutForm />
      </div>
    </MollieProvider>
  );
}

export default App;
