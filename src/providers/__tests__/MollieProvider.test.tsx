import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MollieProvider, useMollie } from '../MollieProvider';

// Test component to access Mollie context
const TestComponent = () => {
  const { mollie, isLoading, error } = useMollie();
  return (
    <div>
      <div data-testid="mollie">{mollie ? 'available' : 'null'}</div>
      <div data-testid="loading">{isLoading ? 'loading' : 'loaded'}</div>
      <div data-testid="error">{error || 'no-error'}</div>
    </div>
  );
};

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

  it('provides context with initial loading state', () => {
    render(
      <MollieProvider profileId="test-profile-id">
        <TestComponent />
      </MollieProvider>
    );

    expect(screen.getByTestId('mollie')).toHaveTextContent('null');
    expect(screen.getByTestId('loading')).toHaveTextContent('loading');
    expect(screen.getByTestId('error')).toHaveTextContent('no-error');
  });

  it('handles successful Mollie initialization when script is already loaded', async () => {
    // Mock Mollie being already available
    const mockMollie = jest.fn().mockReturnValue({ initialized: true });
    (window as any).Mollie = mockMollie;

    render(
      <MollieProvider profileId="test-profile-id" options={{ testmode: true }}>
        <TestComponent />
      </MollieProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    expect(screen.getByTestId('mollie')).toHaveTextContent('available');
    expect(screen.getByTestId('error')).toHaveTextContent('no-error');
    expect(mockMollie).toHaveBeenCalledWith('test-profile-id', { testmode: true });
  });

  it('handles Mollie initialization error when script is already loaded', async () => {
    // Mock Mollie throwing an error during initialization
    const mockMollie = jest.fn().mockImplementation(() => {
      throw new Error('Invalid profile ID');
    });
    (window as any).Mollie = mockMollie;

    render(
      <MollieProvider profileId="invalid-profile">
        <TestComponent />
      </MollieProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    expect(screen.getByTestId('mollie')).toHaveTextContent('null');
    expect(screen.getByTestId('error')).toHaveTextContent('Invalid profile ID');
  });

  it('handles existing script being loaded', async () => {
    // Create an existing script element
    const existingScript = document.createElement('script');
    existingScript.src = 'https://js.mollie.com/v1/mollie.js';
    document.head.appendChild(existingScript);

    render(
      <MollieProvider profileId="test-profile-id">
        <TestComponent />
      </MollieProvider>
    );

    // Initially should be loading
    expect(screen.getByTestId('loading')).toHaveTextContent('loading');

    // Mock Mollie becoming available and trigger load event
    act(() => {
      (window as any).Mollie = jest.fn().mockReturnValue({ fromExisting: true });
      existingScript.dispatchEvent(new Event('load'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    expect(screen.getByTestId('mollie')).toHaveTextContent('available');
    expect(screen.getByTestId('error')).toHaveTextContent('no-error');
  });

  it('handles existing script load error', async () => {
    // Create an existing script element
    const existingScript = document.createElement('script');
    existingScript.src = 'https://js.mollie.com/v1/mollie.js';
    document.head.appendChild(existingScript);

    render(
      <MollieProvider profileId="test-profile-id">
        <TestComponent />
      </MollieProvider>
    );

    // Trigger error event on existing script
    act(() => {
      existingScript.dispatchEvent(new Event('error'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    expect(screen.getByTestId('mollie')).toHaveTextContent('null');
    expect(screen.getByTestId('error')).toHaveTextContent('Failed to load Mollie script');
  });

  it('handles script load success but Mollie constructor not available', async () => {
    render(
      <MollieProvider profileId="test-profile-id">
        <TestComponent />
      </MollieProvider>
    );

    // Wait for script to be added
    await waitFor(() => {
      const scripts = Array.from(document.getElementsByTagName('script'));
      expect(scripts.length).toBeGreaterThan(0);
    });

    // Find the Mollie script and trigger load event without setting window.Mollie
    const scripts = Array.from(document.getElementsByTagName('script'));
    const mollieScript = scripts.find(script => 
      script.src && script.src.includes('mollie.com')
    );

    act(() => {
      mollieScript!.dispatchEvent(new Event('load'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    expect(screen.getByTestId('mollie')).toHaveTextContent('null');
    expect(screen.getByTestId('error')).toHaveTextContent('Mollie script loaded but Mollie constructor not available');
  });

  it('handles script loading error', async () => {
    render(
      <MollieProvider profileId="test-profile-id">
        <TestComponent />
      </MollieProvider>
    );

    // Wait for script to be added
    await waitFor(() => {
      const scripts = Array.from(document.getElementsByTagName('script'));
      expect(scripts.length).toBeGreaterThan(0);
    });

    // Find the Mollie script and trigger error event
    const scripts = Array.from(document.getElementsByTagName('script'));
    const mollieScript = scripts.find(script => 
      script.src && script.src.includes('mollie.com')
    );

    act(() => {
      mollieScript!.dispatchEvent(new Event('error'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    expect(screen.getByTestId('mollie')).toHaveTextContent('null');
    expect(screen.getByTestId('error')).toHaveTextContent('Failed to load Mollie script');
  });

  it('handles successful script load and Mollie initialization', async () => {
    render(
      <MollieProvider profileId="test-profile-id">
        <TestComponent />
      </MollieProvider>
    );

    // Wait for script to be added
    await waitFor(() => {
      const scripts = Array.from(document.getElementsByTagName('script'));
      expect(scripts.length).toBeGreaterThan(0);
    });

    // Find the Mollie script and simulate successful load
    const scripts = Array.from(document.getElementsByTagName('script'));
    const mollieScript = scripts.find(script => 
      script.src && script.src.includes('mollie.com')
    );

    act(() => {
      // Mock Mollie becoming available
      (window as any).Mollie = jest.fn().mockReturnValue({ scriptLoaded: true });
      mollieScript!.dispatchEvent(new Event('load'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    expect(screen.getByTestId('mollie')).toHaveTextContent('available');
    expect(screen.getByTestId('error')).toHaveTextContent('no-error');
  });

  it('handles Mollie initialization error during script load', async () => {
    render(
      <MollieProvider profileId="test-profile-id">
        <TestComponent />
      </MollieProvider>
    );

    // Wait for script to be added
    await waitFor(() => {
      const scripts = Array.from(document.getElementsByTagName('script'));
      expect(scripts.length).toBeGreaterThan(0);
    });

    // Find the Mollie script and simulate load with initialization error
    const scripts = Array.from(document.getElementsByTagName('script'));
    const mollieScript = scripts.find(script => 
      script.src && script.src.includes('mollie.com')
    );

    act(() => {
      // Mock Mollie throwing error during initialization
      (window as any).Mollie = jest.fn().mockImplementation(() => {
        throw new Error('Network error');
      });
      mollieScript!.dispatchEvent(new Event('load'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    expect(screen.getByTestId('mollie')).toHaveTextContent('null');
    expect(screen.getByTestId('error')).toHaveTextContent('Network error');
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
    expect(mollieScript!.async).toBe(true);
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

  it('memoizes options to prevent unnecessary re-renders', async () => {
    const mockMollie = jest.fn().mockReturnValue({ memoized: true });
    (window as any).Mollie = mockMollie;

    const options = { testmode: true };
    const { rerender } = render(
      <MollieProvider profileId="test-profile-id" options={options}>
        <TestComponent />
      </MollieProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    const initialCallCount = mockMollie.mock.calls.length;

    // Re-render with same options object reference
    rerender(
      <MollieProvider profileId="test-profile-id" options={options}>
        <TestComponent />
      </MollieProvider>
    );

    // Should not call Mollie constructor again
    expect(mockMollie.mock.calls.length).toBe(initialCallCount);
  });

  it('recreates Mollie instance when options change', async () => {
    const mockMollie = jest.fn().mockReturnValue({ recreated: true });
    (window as any).Mollie = mockMollie;

    const { rerender } = render(
      <MollieProvider profileId="test-profile-id" options={{ testmode: true }}>
        <TestComponent />
      </MollieProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    const initialCallCount = mockMollie.mock.calls.length;

    // Re-render with different options
    rerender(
      <MollieProvider profileId="test-profile-id" options={{ testmode: false }}>
        <TestComponent />
      </MollieProvider>
    );

    // Should call Mollie constructor again with new options
    expect(mockMollie.mock.calls.length).toBe(initialCallCount + 1);
    expect(mockMollie).toHaveBeenLastCalledWith('test-profile-id', { testmode: false });
  });
});
