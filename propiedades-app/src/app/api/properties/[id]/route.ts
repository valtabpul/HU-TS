import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Property from '@/database/models/Property';

interface Params {
  id: string;
}

export async function PUT(request: Request, { params }: { params: Params }) {
  await connectDB();
  try {
    const body = await request.json();
    const updatedProperty = await Property.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!updatedProperty) {
      return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 });
    }
    return NextResponse.json(updatedProperty);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar la propiedad' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  await connectDB();
  try {
    const deletedProperty = await Property.findByIdAndDelete(params.id);
    if (!deletedProperty) {
      return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Propiedad eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar la propiedad' }, { status: 500 });
  }
}
