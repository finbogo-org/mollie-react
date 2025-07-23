import React from 'react';
import { MollieComponentBase } from '../MollieComponentBase';
import { renderWithProvider, setupMockMollie } from './test-helpers';
import { useMollieComponent } from '../../hooks/useMollieComponent';

// Mock the useMollieComponent hook
jest.mock('../../hooks/useMollieComponent', () => ({
  useMollieComponent: jest.fn()
}));

const mockUseMollieComponent = useMollieComponent as jest.MockedFunction<typeof useMollieComponent>;

setupMockMollie();

describe('MollieComponentBase', () => {
  beforeEach(() => {
    mockUseMollieComponent.mockReturnValue({
      component: {} as any,
      containerRef: { current: null },
      mount: jest.fn(),
      unmount: jest.fn(),
      isReady: true,
      error: null
    });
  });

  it('renders without crashing', () => {
    renderWithProvider(<MollieComponentBase type="cardNumber" />);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithProvider(<MollieComponentBase type="cardNumber" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = renderWithProvider(
      <MollieComponentBase type="cardNumber" className="custom-class" />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('custom-class');
  });

  it('passes through data attributes', () => {
    const { container } = renderWithProvider(
      <MollieComponentBase type="cardNumber" data-testid="base-component" />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveAttribute('data-testid', 'base-component');
  });

  it('calls onReady when component is ready', () => {
    const onReady = jest.fn();
    mockUseMollieComponent.mockReturnValue({
      component: {} as any,
      containerRef: { current: null },
      mount: jest.fn(),
      unmount: jest.fn(),
      isReady: true,
      error: null
    });

    renderWithProvider(
      <MollieComponentBase type="cardNumber" onReady={onReady} />
    );

    expect(onReady).toHaveBeenCalled();
  });

  it('calls onMollieError when there is an error', () => {
    const onMollieError = jest.fn();
    const errorMessage = 'Test error';
    
    mockUseMollieComponent.mockReturnValue({
      component: {} as any,
      containerRef: { current: null },
      mount: jest.fn(),
      unmount: jest.fn(),
      isReady: false,
      error: errorMessage
    });

    renderWithProvider(
      <MollieComponentBase type="cardNumber" onMollieError={onMollieError} />
    );

    expect(onMollieError).toHaveBeenCalledWith(errorMessage);
  });

  it('passes correct type and options to useMollieComponent', () => {
    const options = { styles: { base: { fontSize: '16px' } } };
    
    renderWithProvider(
      <MollieComponentBase type="cardNumber" options={options} />
    );

    expect(mockUseMollieComponent).toHaveBeenCalledWith('cardNumber', options);
  });

  it('handles different component types', () => {
    const types: Array<'card' | 'cardHolder' | 'cardNumber' | 'verificationCode' | 'expiryDate'> = [
      'card', 'cardHolder', 'cardNumber', 'verificationCode', 'expiryDate'
    ];

    types.forEach(type => {
      mockUseMollieComponent.mockClear();
      renderWithProvider(<MollieComponentBase type={type} />);
      expect(mockUseMollieComponent).toHaveBeenCalledWith(type, undefined);
    });
  });
});
