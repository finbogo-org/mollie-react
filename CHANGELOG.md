# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-07-23

### Added
- Initial release of Mollie React library
- `MollieProvider` component for loading and managing Mollie script
- React context and hooks for accessing Mollie functionality
- Pre-built components for all Mollie payment types:
  - `CardComponent` - Full card input component
  - `CardHolderComponent` - Card holder name input
  - `CardNumberComponent` - Card number input
  - `VerificationCodeComponent` - CVC input
  - `ExpiryDateComponent` - Expiry date input
- `useMollie` hook for accessing Mollie context
- `useCreateToken` hook for token creation
- `useMollieComponent` hook for custom component creation
- Comprehensive TypeScript definitions
- Full styling system support through Mollie's CSS API
- Error handling and loading states
- Script loading optimization (single script per page)
- Automatic component mounting and cleanup

### Features
- 🔒 **Secure**: Uses Mollie's iframe-based components
- 🎨 **Customizable**: Full styling support
- 🚀 **Easy to use**: Simple React API
- 📦 **TypeScript**: Complete type definitions
- ⚡ **Optimized**: Efficient script loading
- 🔧 **Flexible**: Support for all Mollie component types
