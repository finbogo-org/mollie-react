import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MollieProvider } from '../../providers/MollieProvider';

export const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MollieProvider profileId="test-profile-id">
    {children}
  </MollieProvider>
);

export const renderWithProvider = (component: React.ReactElement): RenderResult => {
  return render(<TestWrapper>{component}</TestWrapper>);
};

export const setupMockMollie = () => {
  beforeEach(() => {
    (window as any).Mollie = jest.fn(() => ({
      mount: jest.fn(),
      unmount: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }));
  });
};
