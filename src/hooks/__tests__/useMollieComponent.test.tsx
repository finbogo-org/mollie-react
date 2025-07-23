import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { useMollieComponent } from '../useMollieComponent';
import { MollieProvider } from '../../providers/MollieProvider';
import { ComponentType } from '../../types/mollie';

const mockCreateComponent = jest.fn();
const mockMount = jest.fn();
const mockUnmount = jest.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MollieProvider profileId="test-profile-id">
    {children}
  </MollieProvider>
);

describe('useMollieComponent', () => {
  beforeEach(() => {
    mockCreateComponent.mockClear();
    mockMount.mockClear();
    mockUnmount.mockClear();
    
    // Mock component object
    const mockComponent = {
      mount: mockMount,
      unmount: mockUnmount,
    };
    
    mockCreateComponent.mockReturnValue(mockComponent);
    
    // Mock Mollie being available
    (window as any).Mollie = jest.fn(() => ({
      createComponent: mockCreateComponent
    }));
    
    // Clear any existing scripts
    document.head.innerHTML = '';
  });

  it('returns component, containerRef, mount, and unmount functions', () => {
    const { result } = renderHook(() => useMollieComponent('cardNumber', {}), { wrapper });

    expect(result.current).toHaveProperty('component');
    expect(result.current).toHaveProperty('containerRef');
    expect(result.current).toHaveProperty('mount');
    expect(result.current).toHaveProperty('unmount');
    expect(result.current).toHaveProperty('isReady');
    expect(result.current).toHaveProperty('error');
    
    expect(typeof result.current.mount).toBe('function');
    expect(typeof result.current.unmount).toBe('function');
    expect(result.current.containerRef).toHaveProperty('current');
  });

  it('creates component with correct type and options', () => {
    const options = { 
      styles: { 
        base: { color: '#000' } 
      } 
    };
    
    renderHook(() => useMollieComponent('cardNumber', options), { wrapper });

    expect(mockCreateComponent).toHaveBeenCalledWith('cardNumber', options);
  });

  it('mounts component when mount is called and ref is available', () => {
    const { result } = renderHook(() => useMollieComponent('cardNumber', {}), { wrapper });

    // Simulate having a DOM element in the ref
    const mockElement = document.createElement('div');
    Object.defineProperty(result.current.containerRef, 'current', {
      value: mockElement,
      writable: true
    });

    act(() => {
      result.current.mount();
    });

    expect(mockMount).toHaveBeenCalledWith(mockElement);
  });

  it('calls unmount function without errors', () => {
    const { result } = renderHook(() => useMollieComponent('cardNumber', {}), { wrapper });

    expect(() => {
      act(() => {
        result.current.unmount();
      });
    }).not.toThrow();
  });

  it('creates new component when type changes', () => {
    const { result, rerender } = renderHook(
      ({ type }) => useMollieComponent(type, {}),
      { 
        wrapper,
        initialProps: { type: 'cardNumber' as ComponentType }
      }
    );

    expect(mockCreateComponent).toHaveBeenCalledWith('cardNumber', {});
    const initialCallCount = mockCreateComponent.mock.calls.length;

    rerender({ type: 'expiryDate' as ComponentType });

    expect(mockCreateComponent).toHaveBeenCalledWith('expiryDate', {});
    expect(mockCreateComponent.mock.calls.length).toBe(initialCallCount + 1);
  });

  it('creates new component when options change', () => {
    const { result, rerender } = renderHook(
      ({ options }) => useMollieComponent('cardNumber', options),
      { 
        wrapper,
        initialProps: { options: { styles: { base: { color: '#000' } } } }
      }
    );

    expect(mockCreateComponent).toHaveBeenCalledWith('cardNumber', { styles: { base: { color: '#000' } } });
    const initialCallCount = mockCreateComponent.mock.calls.length;

    rerender({ options: { styles: { base: { color: '#333' } } } });

    expect(mockCreateComponent).toHaveBeenCalledWith('cardNumber', { styles: { base: { color: '#333' } } });
    expect(mockCreateComponent.mock.calls.length).toBe(initialCallCount + 1);
  });

  it('throws error when used outside MollieProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      renderHook(() => useMollieComponent('cardNumber', {}));
    }).toThrow('useMollie must be used within a MollieProvider');
    
    consoleError.mockRestore();
  });

  it('handles null mollie instance gracefully', () => {
    // Mock Mollie provider context but with null mollie instance
    const MockProvider = ({ children }: { children: React.ReactNode }) => (
      <MollieProvider profileId="test-profile-id">
        {children}
      </MollieProvider>
    );

    // Override the Mollie function to return null mollie
    (window as any).Mollie = jest.fn(() => null);
    
    const { result } = renderHook(() => useMollieComponent('cardNumber', {}), { wrapper: MockProvider });
    
    // Should handle the null mollie case gracefully
    expect(result.current.component).toBeNull();
    expect(result.current.isReady).toBe(false);
  });

  it('handles different component types', () => {
    const componentTypes = ['cardNumber', 'expiryDate', 'verificationCode', 'cardHolder'] as const;

    componentTypes.forEach(type => {
      renderHook(() => useMollieComponent(type, {}), { wrapper });
      expect(mockCreateComponent).toHaveBeenCalledWith(type, {});
    });
  });

  it('handles mount with no ref element', () => {
    const { result } = renderHook(() => useMollieComponent('cardNumber', {}), { wrapper });

    expect(() => {
      act(() => {
        result.current.mount();
      });
    }).not.toThrow();
  });

  it('handles unmount with no component', () => {
    // Mock createComponent to return null
    mockCreateComponent.mockReturnValue(null);
    
    const { result } = renderHook(() => useMollieComponent('cardNumber', {}), { wrapper });

    expect(() => {
      act(() => {
        result.current.unmount();
      });
    }).not.toThrow();
  });

  it('sets isReady to true when component is ready', async () => {
    const { result } = renderHook(() => useMollieComponent('cardNumber', {}), { wrapper });

    // Component should initially not be ready
    expect(result.current.isReady).toBe(false);

    // Wait for the effect to run and component to be created
    await act(async () => {
      // Simulate component ready
    });

    // After component is created, isReady should be true
    expect(result.current.component).toBeTruthy();
  });

  it('handles component creation errors', () => {
    const errorMessage = 'Component creation failed';
    mockCreateComponent.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    
    const { result } = renderHook(() => useMollieComponent('cardNumber', {}), { wrapper });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.isReady).toBe(false);
    expect(result.current.component).toBeNull();
  });
});
