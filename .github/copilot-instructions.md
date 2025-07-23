This is a typescript library for Mollie payment integration in React applications. The library is designed to be used with modern JavaScript tooling and follows best practices for module exports and package management.

https://docs.mollie.com/reference/mollie-object has the Mollie API documentation. Also look at https://docs.mollie.com/reference/component-object for event listener patterns. 

To allow encapsulation of external script we will use the provider and context pattern in React. 

The provider will add the external Mollie script to the document head and provide the Mollie object to the context. The context will be used by components to access the Mollie object.

Mollie components will then be rendered inside the provided context and use hooks to allow the correct usage of the Mollie object.

The idea of Mollie is to provide payment methods in a modular way, so we will create components for each payment method that Mollie supports. Each component will use the Mollie object to render the payment method and handle the payment process.

The concept is we will get a token back from Mollie that we will then need to send onto our own apis. This library takes payment information and returns the Mollie token.

This project will be structured to allow easy addition of new payment methods as Mollie supports them. The components will be designed to be reusable and configurable, allowing developers to customize the appearance and behaviour of the payment methods. https://docs.mollie.com/docs/styling-mollie-components outlines the styling system in place ans how to use it.


All code should have tests. we use jest and aim for 90% coverage where possible. 