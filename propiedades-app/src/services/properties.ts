import axios from 'axios';
import { NextResponse } from 'next/server';

export interface Property {
  _id?: string;
  name: string;
  value: number;
  img?: string;
}

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProperties = async (): Promise<Property[]> => {
  const response = await apiClient.get('/properties');
  return response.data;
};

export const postProperty = async (property: Property): Promise<Property> => {
  const response = await apiClient.post('/properties', property);
  return response.data;
};

export const updateProperty = async (id: string, property: Partial<Property>): Promise<Property> => {
  const response = await apiClient.put(`/properties/${id}`, property);
  return response.data;
};

export const deleteProperty = async (id: string): Promise<void> => {
  await apiClient.delete(`/properties/${id}`);
};

return NextResponse.json({ data: properties }, { status: 200 });