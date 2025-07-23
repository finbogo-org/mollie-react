import React from 'react';
import { render, screen } from '@testing-library/react';
import { MollieProvider } from '../MollieProvider';

describe('MollieProvider', () => {
  beforeEach(() => {
    // Clear any existing scripts and Mollie instance
    document.head.innerHTML = '';
    delete (window as any).Mollie;
  });

  it('renders children correctly', () => {
    render(
      <MollieProvider profileId="test-profile-id">
        <div data-testid="child">Test Child</div>
      </MollieProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('accepts empty profileId without crashing', () => {
    expect(() => {
      render(
        <MollieProvider profileId="">
          <div>Test</div>
        </MollieProvider>
      );
    }).not.toThrow();
  });

  it('adds mollie script to document head', () => {
    render(
      <MollieProvider profileId="test-profile-id">
        <div>Test</div>
      </MollieProvider>
    );

    const scripts = Array.from(document.getElementsByTagName('script'));
    const mollieScript = scripts.find(script => 
      script.src && script.src.includes('mollie.com')
    );
    
    expect(mollieScript).toBeTruthy();
  });

  it('accepts custom script URL', () => {
    const customUrl = 'https://custom.mollie.js';
    
    render(
      <MollieProvider profileId="test-profile-id" scriptUrl={customUrl}>
        <div>Test</div>
      </MollieProvider>
    );

    const scripts = Array.from(document.getElementsByTagName('script'));
    const mollieScript = scripts.find(script => 
      script.src && script.src.includes('custom.mollie.js')
    );
    
    expect(mollieScript).toBeTruthy();
  });
});
