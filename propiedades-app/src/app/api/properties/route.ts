import { NextResponse } from 'next/server';
import connectDB from '@/src/lib/db';
import Property from '@/src/database/models/Property';

export async function GET() {
  await connectDB();
  try {
    const properties = await Property.find({});
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener las propiedades' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const newProperty = new Property(body);
    const savedProperty = await newProperty.save();
    return NextResponse.json(savedProperty);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear la propiedad' }, { status: 500 });
  }
}
