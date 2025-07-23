import React from 'react';
import { CardComponent } from '../CardComponent';
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

describe('CardComponent', () => {
  it('renders without crashing', () => {
    renderWithProvider(<CardComponent />);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithProvider(<CardComponent ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = renderWithProvider(
      <CardComponent className="custom-class" />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('passes through data attributes', () => {
    const { container } = renderWithProvider(
      <CardComponent data-testid="card" />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('data-testid', 'card');
  });

  it('passes through style props', () => {
    const { container } = renderWithProvider(
      <CardComponent style={{ width: '100%' }} />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle('width: 100%');
  });

  it('has correct display name', () => {
    expect(CardComponent.displayName).toBe('CardComponent');
  });
});
