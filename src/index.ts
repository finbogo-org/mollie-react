

// Provider and Context
export { MollieProvider, useMollie } from './providers/MollieProvider';

// Hooks
export { useMollieComponent } from './hooks/useMollieComponent';
export { useCreateToken } from './hooks/useCreateToken';

// Components
export { MollieComponentBase } from './components/MollieComponentBase';
export { CardComponent } from './components/CardComponent';
export { CardHolderComponent } from './components/CardHolderComponent';
export { CardNumberComponent } from './components/CardNumberComponent';
export { VerificationCodeComponent } from './components/VerificationCodeComponent';
export { ExpiryDateComponent } from './components/ExpiryDateComponent';

// Types
export type {
  MollieOptions,
  MollieComponentOptions,
  ComponentStyles,
  ComponentType,
  MollieComponent,
  TokenResult,
  MollieInstance,
  MollieConstructor,
} from './types/mollie';

export type {
  MollieComponentBaseProps,
} from './components/MollieComponentBase';

export type {
  CardComponentProps,
} from './components/CardComponent';

export type {
  CardHolderComponentProps,
} from './components/CardHolderComponent';

export type {
  CardNumberComponentProps,
} from './components/CardNumberComponent';

export type {
  VerificationCodeComponentProps,
} from './components/VerificationCodeComponent';

export type {
  ExpiryDateComponentProps,
} from './components/ExpiryDateComponent';

export type {
  UseMollieComponentResult,
} from './hooks/useMollieComponent';

export type {
  UseCreateTokenResult,
} from './hooks/useCreateToken';

// Import everything needed for the main export object
import { MollieProvider, useMollie } from './providers/MollieProvider';
import { useMollieComponent } from './hooks/useMollieComponent';
import { useCreateToken } from './hooks/useCreateToken';
import { CardComponent } from './components/CardComponent';
import { CardHolderComponent } from './components/CardHolderComponent';
import { CardNumberComponent } from './components/CardNumberComponent';
import { VerificationCodeComponent } from './components/VerificationCodeComponent';
import { ExpiryDateComponent } from './components/ExpiryDateComponent';

// Main export object for backward compatibility
export const MollieReact = {
  Provider: MollieProvider,
  CardComponent,
  CardHolderComponent,
  CardNumberComponent,
  VerificationCodeComponent,
  ExpiryDateComponent,
  useMollie,
  useMollieComponent,
  useCreateToken,
};