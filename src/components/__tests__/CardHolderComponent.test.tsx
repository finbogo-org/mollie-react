import React from 'react';
import { CardHolderComponent } from '../CardHolderComponent';
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

describe('CardHolderComponent', () => {
  it('renders without crashing', () => {
    renderWithProvider(<CardHolderComponent />);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithProvider(<CardHolderComponent ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = renderWithProvider(
      <CardHolderComponent className="custom-class" />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('passes through data attributes', () => {
    const { container } = renderWithProvider(
      <CardHolderComponent data-testid="card-holder" />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('data-testid', 'card-holder');
  });

  it('passes through style props', () => {
    const { container } = renderWithProvider(
      <CardHolderComponent style={{ width: '100%' }} />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle('width: 100%');
  });

  it('has correct display name', () => {
    expect(CardHolderComponent.displayName).toBe('CardHolderComponent');
  });
});
