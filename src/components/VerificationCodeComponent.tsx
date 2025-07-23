import React, { forwardRef } from 'react';
import { MollieComponentBase, MollieComponentBaseProps } from './MollieComponentBase';
import { MollieComponentOptions } from '../types/mollie';

export interface VerificationCodeComponentProps extends Omit<MollieComponentBaseProps, 'type'> {
  options?: MollieComponentOptions;
}

export const VerificationCodeComponent = forwardRef<HTMLDivElement, VerificationCodeComponentProps>(
  (props, ref) => {
    return <MollieComponentBase {...props} type="verificationCode" ref={ref} />;
  }
);

VerificationCodeComponent.displayName = 'VerificationCodeComponent';
