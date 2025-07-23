import React from 'react';
import { ExpiryDateComponent } from '../ExpiryDateComponent';
import { renderWithProvider, setupMockMollie } from './test-helpers';

// Mock the useMollieComponent hook
jest.mock('../../hooks/useMollieComponent', () => ({
  useMollieComponent: jest.fn(() => ({
    containerRef: { current: null },
    isReady: true,
    error: null
  }))
}));

setupMockMollie();

describe('ExpiryDateComponent', () => {
  it('renders without crashing', () => {
    renderWithProvider(<ExpiryDateComponent />);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithProvider(<ExpiryDateComponent ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = renderWithProvider(
      <ExpiryDateComponent className="custom-class" />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('passes through data attributes', () => {
    const { container } = renderWithProvider(
      <ExpiryDateComponent data-testid="expiry-date" />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('data-testid', 'expiry-date');
  });

  it('passes through style props', () => {
    const { container } = renderWithProvider(
      <ExpiryDateComponent style={{ width: '100%' }} />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle('width: 100%');
  });

  it('has correct display name', () => {
    expect(ExpiryDateComponent.displayName).toBe('ExpiryDateComponent');
  });
});
