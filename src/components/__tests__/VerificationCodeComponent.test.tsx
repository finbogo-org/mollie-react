import React from 'react';
import { VerificationCodeComponent } from '../VerificationCodeComponent';
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

describe('VerificationCodeComponent', () => {
  it('renders without crashing', () => {
    renderWithProvider(<VerificationCodeComponent />);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithProvider(<VerificationCodeComponent ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = renderWithProvider(
      <VerificationCodeComponent className="custom-class" />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('passes through data attributes', () => {
    const { container } = renderWithProvider(
      <VerificationCodeComponent data-testid="verification-code" />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('data-testid', 'verification-code');
  });

  it('passes through style props', () => {
    const { container } = renderWithProvider(
      <VerificationCodeComponent style={{ width: '100%' }} />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle('width: 100%');
  });

  it('has correct display name', () => {
    expect(VerificationCodeComponent.displayName).toBe('VerificationCodeComponent');
  });
});
