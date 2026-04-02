/**
 * Shared TypeScript types used across the framework.
 */

export interface UserCredentials {
  username: string;
  password: string;
  description: string;
}

export interface Product {
  name: string;
  price: number;
  description: string;
}
