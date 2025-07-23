import React from 'react';
import { CardNumberComponent } from '../CardNumberComponent';
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

describe('CardNumberComponent', () => {
  it('renders without crashing', () => {
    renderWithProvider(<CardNumberComponent />);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithProvider(<CardNumberComponent ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = renderWithProvider(
      <CardNumberComponent className="custom-class" />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('passes through data attributes', () => {
    const { container } = renderWithProvider(
      <CardNumberComponent data-testid="card-number" />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('data-testid', 'card-number');
  });

  it('passes through style props', () => {
    const { container } = renderWithProvider(
      <CardNumberComponent style={{ width: '100%' }} />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle('width: 100%');
  });

  it('has correct display name', () => {
    expect(CardNumberComponent.displayName).toBe('CardNumberComponent');
  });
});
