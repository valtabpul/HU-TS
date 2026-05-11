'use client';

import { useState, useEffect, FormEvent } from 'react';
import {
  getProperties,
  postProperty,
  updateProperty,
  deleteProperty,
  Property,
} from '@/src/services/properties';

export default function DashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [newProperty, setNewProperty] = useState({ name: '', value: 0, img: '' });
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const data = await getProperties();
    setProperties(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      await deleteProperty(id);
      loadProperties();
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (editingProperty && editingProperty._id) {
      await updateProperty(editingProperty._id, {
        name: editingProperty.name,
        value: editingProperty.value,
        img: editingProperty.img,
      });
      setEditingProperty(null);
      loadProperties();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await postProperty(newProperty);
    setNewProperty({ name: '', value: 0, img: '' });
    loadProperties();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard de Propiedades</h1>

        {/* Formulario para agregar/editar */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">{editingProperty ? 'Editar Propiedad' : 'Agregar Nueva Propiedad'}</h2>
          <form onSubmit={editingProperty ? handleUpdate : handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Nombre"
                className="p-2 border rounded-md"
                value={editingProperty ? editingProperty.name : newProperty.name}
                onChange={(e) =>
                  editingProperty
                    ? setEditingProperty({ ...editingProperty, name: e.target.value })
                    : setNewProperty({ ...newProperty, name: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Valor"
                className="p-2 border rounded-md"
                value={editingProperty ? editingProperty.value : newProperty.value}
                onChange={(e) =>
                  editingProperty
                    ? setEditingProperty({ ...editingProperty, value: Number(e.target.value) })
                    : setNewProperty({ ...newProperty, value: Number(e.target.value) })
                }
                required
              />
              <input
                type="text"
                placeholder="URL de la imagen"
                className="p-2 border rounded-md"
                value={editingProperty ? editingProperty.img : newProperty.img}
                onChange={(e) =>
                  editingProperty
                    ? setEditingProperty({ ...editingProperty, img: e.target.value })
                    : setNewProperty({ ...newProperty, img: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-4">
              {editingProperty && (
                <button type="button" onClick={() => setEditingProperty(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                  Cancelar
                </button>
              )}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                {editingProperty ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de propiedades */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Nombre</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Valor</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Imagen</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop) => (
                <tr key={prop._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-5 py-5 text-sm">{prop.name}</td>
                  <td className="px-5 py-5 text-sm">${prop.value.toLocaleString()}</td>
                  <td className="px-5 py-5 text-sm">
                    {prop.img && <img src={prop.img} alt={prop.name} className="h-10 w-10 object-cover rounded-md" />}
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <button onClick={() => handleEdit(prop)} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</button>
                    <button onClick={() => handleDelete(prop._id!)} className="text-red-600 hover:text-red-900">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}