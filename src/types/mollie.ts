// Mollie JavaScript SDK types
export interface MollieOptions {
  locale?: string;
  testmode?: boolean;
}

export interface MollieComponentOptions {
  styles?: {
    base?: ComponentStyles;
    valid?: ComponentStyles;
    invalid?: ComponentStyles;
  };
  components?: {
    cardHolder?: { label?: string };
    cardNumber?: { label?: string };
    verificationCode?: { label?: string };
    expiryDate?: { label?: string };
  };
}

export interface ComponentStyles {
  backgroundColor?: string;
  color?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  letterSpacing?: string | number;
  lineHeight?: string | number;
  textAlign?: string;
  textDecoration?: string;
  textTransform?: string;
  '::placeholder'?: {
    color?: string;
  };
}

export type ComponentType = 
  | 'card'
  | 'cardHolder'
  | 'cardNumber'
  | 'verificationCode'
  | 'expiryDate';

export interface MollieComponent {
  mount(selector: string | HTMLElement): void;
  unmount(): void;
  addEventListener(event: string, handler: (event: any) => void): void;
  removeEventListener(event: string, handler: (event: any) => void): void;
}

export interface TokenResult {
  token?: string;
  error?: {
    message: string;
    field?: string;
  };
}

export interface MollieInstance {
  createComponent(type: ComponentType, options?: MollieComponentOptions): MollieComponent;
  createToken(): Promise<TokenResult>;
}

export interface MollieConstructor {
  (profileId: string, options?: MollieOptions): MollieInstance;
}

declare global {
  interface Window {
    Mollie?: MollieConstructor;
  }
}
