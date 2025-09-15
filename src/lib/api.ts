/**
 * API service for Emerging Markets Bloom
 */
import { API_CONFIG, getApiUrl } from './config';

interface UserData {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

// Support both the original nested shape and a flat payload
type SubscriberData = { users: UserData } | UserData;

interface SubscriberResponse {
  statusCode: number;
  message: {
    id: number;
    fname: string;
    lname: string;
    email: string;
    password: string;
  }
}

/**
 * Add a new subscriber to the newsletter
 * @param data Subscriber data
 * @returns Promise with the API response
 */
export const addSubscriber = async (data: SubscriberData): Promise<SubscriberResponse> => {
  try {
    // Get the API endpoint URL from configuration
    const apiUrl = getApiUrl(API_CONFIG.endpoints.addSubscriber);
    
    // Normalize payload to the flat structure expected by backend
    const payload: UserData = (data as any).users ? (data as any).users as UserData : data as UserData;
    console.log('Using API URL:', apiUrl);
    console.log('Normalized payload:', payload);
    
    // Using fetch API with the configured URL
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...API_CONFIG.headers,
      },
      // Always send the flat payload
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to add subscriber:', error);
    throw error;
  }
};
