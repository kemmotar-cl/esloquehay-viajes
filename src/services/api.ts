import type { Recipe } from '../types/recipe';

export interface ItineraryRequest {
  elements: string[];
  country: string;
  budget?: string;
  duration?: number;
  travelerType?: string;
  companions?: number;
}

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  'https://esloquehay-backend.jorge-labbe-a.workers.dev';

export async function generateItinerary(request: ItineraryRequest): Promise<Recipe> {
  const response = await fetch(`${API_URL}/api/itinerary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  const result = (await response.json()) as {
    success: boolean;
    data?: Recipe;
    error?: string;
  };

  if (!result.success || !result.data) {
    throw new Error(result.error ?? 'Error generando el itinerario');
  }

  return result.data;
}

export async function checkHealth(): Promise<{ keyConfigured: boolean }> {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    const data = (await response.json()) as { keyConfigured: boolean };
    return data;
  } catch {
    return { keyConfigured: false };
  }
}
