// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Export credentials from environment variables
export const validCredentials = {
  username: process.env.VALID_USERNAME || '',
  password: process.env.VALID_PASSWORD || ''
};

export const invalidCredentials = {
  username: process.env.INVALID_USERNAME || '',
  password: process.env.VALID_PASSWORD || ''
};