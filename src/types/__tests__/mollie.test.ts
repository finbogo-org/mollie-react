import { ComponentType, MollieOptions } from '../mollie';

describe('Mollie Types', () => {
  it('ComponentType type includes expected values', () => {
    const cardType: ComponentType = 'card';
    const cardNumberType: ComponentType = 'cardNumber';
    const expiryDateType: ComponentType = 'expiryDate';
    
    expect(cardType).toBe('card');
    expect(cardNumberType).toBe('cardNumber');
    expect(expiryDateType).toBe('expiryDate');
  });

  it('MollieOptions interface accepts valid options', () => {
    const options: MollieOptions = {
      locale: 'en_US',
      testmode: true
    };
    
    expect(options.locale).toBe('en_US');
    expect(options.testmode).toBe(true);
  });
});
