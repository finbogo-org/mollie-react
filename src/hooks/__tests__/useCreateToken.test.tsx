import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { useCreateToken } from '../useCreateToken';
import { MollieProvider } from '../../providers/MollieProvider';

const mockCreateToken = jest.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MollieProvider profileId="test-profile-id">
    {children}
  </MollieProvider>
);

describe('useCreateToken', () => {
  beforeEach(() => {
    mockCreateToken.mockReset();
    
    // Mock Mollie being available
    (window as any).Mollie = jest.fn(() => ({
      createToken: mockCreateToken
    }));
    
    // Clear any existing scripts
    document.head.innerHTML = '';
  });

  it('returns createToken function and state', () => {
    const { result } = renderHook(() => useCreateToken(), { wrapper });

    expect(result.current).toHaveProperty('createToken');
    expect(result.current).toHaveProperty('isCreatingToken');
    expect(result.current).toHaveProperty('tokenError');
    
    expect(typeof result.current.createToken).toBe('function');
    expect(typeof result.current.isCreatingToken).toBe('boolean');
    expect(result.current.tokenError).toBeNull();
  });

  it('starts with correct initial state', () => {
    const { result } = renderHook(() => useCreateToken(), { wrapper });

    expect(result.current.isCreatingToken).toBe(false);
    expect(result.current.tokenError).toBeNull();
  });

  it('handles successful token creation', async () => {
    const mockToken = { token: 'test-token' };
    mockCreateToken.mockResolvedValue(mockToken);

    const { result } = renderHook(() => useCreateToken(), { wrapper });

    let tokenResult: any;
    await act(async () => {
      tokenResult = await result.current.createToken();
    });

    expect(mockCreateToken).toHaveBeenCalled();
    expect(tokenResult).toEqual(mockToken);
    expect(result.current.isCreatingToken).toBe(false);
    expect(result.current.tokenError).toBeNull();
  });

  it('handles token creation error', async () => {
    const errorMessage = 'Token creation failed';
    mockCreateToken.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCreateToken(), { wrapper });

    await act(async () => {
      try {
        await result.current.createToken();
      } catch (err) {
        // Expected to throw
      }
    });

    expect(mockCreateToken).toHaveBeenCalled();
    expect(result.current.isCreatingToken).toBe(false);
    expect(result.current.tokenError).toBe(errorMessage);
  });

  it('handles mollie result with error', async () => {
    const errorMessage = 'Invalid card details';
    const mockResultWithError = { 
      error: { message: errorMessage } 
    };
    mockCreateToken.mockResolvedValue(mockResultWithError);

    const { result } = renderHook(() => useCreateToken(), { wrapper });

    let tokenResult: any;
    await act(async () => {
      tokenResult = await result.current.createToken();
    });

    expect(mockCreateToken).toHaveBeenCalled();
    expect(tokenResult).toEqual(mockResultWithError);
    expect(result.current.isCreatingToken).toBe(false);
    expect(result.current.tokenError).toBe(errorMessage);
  });

  it('sets loading state during token creation', async () => {
    let resolveToken: (value: any) => void;
    const tokenPromise = new Promise(resolve => {
      resolveToken = resolve;
    });
    mockCreateToken.mockReturnValue(tokenPromise);

    const { result } = renderHook(() => useCreateToken(), { wrapper });

    act(() => {
      result.current.createToken();
    });

    expect(result.current.isCreatingToken).toBe(true);
    expect(result.current.tokenError).toBeNull();

    await act(async () => {
      resolveToken!({ token: 'test-token' });
      await tokenPromise;
    });

    expect(result.current.isCreatingToken).toBe(false);
  });

  it('throws error when used outside MollieProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      renderHook(() => useCreateToken());
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
    
    const { result } = renderHook(() => useCreateToken(), { wrapper: MockProvider });

    act(() => {
      result.current.createToken();
    });

    expect(result.current.tokenError).toBe('Mollie is not initialized');
  });
});
