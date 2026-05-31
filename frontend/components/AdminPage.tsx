'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import {
  getMe,
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from '@/services/productServices';

import { useRouter } from 'next/navigation';

type ProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  type: string;
  category: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const [products, setProducts] = useState<ProductType[]>([]);

  const [loading, setLoading] = useState(true);

  const [creating, setCreating] = useState(false);

  const [editingLoading, setEditingLoading] =
    useState(false);

  const [message, setMessage] =
    useState('');

  const [error, setError] =
    useState('');

  /* =========================================================
     EDIT MODAL
  ========================================================= */

  const [selectedProduct, setSelectedProduct] =
    useState<ProductType | null>(null);

  const [editForm, setEditForm] =
    useState({
      name: '',
      price: '',
      quantity: '',
      image: '',
      description: '',
      type: '',
      category: '',
    });

  /* =========================================================
     CREATE FORM
  ========================================================= */

  const [formData, setFormData] =
    useState({
      name: '',
      price: '',
      quantity: '',
      image: '',
      description: '',
      type: '',
      category: '',
    });

  /* =========================================================
     LOAD DATA
  ========================================================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        const me = await getMe();

        if (me.role !== 'admin') {
          router.push('/');
          return;
        }

        setUser(me);

        const data = await fetchProducts();

        setProducts(data);
      } catch (err) {
        console.log(err);

        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* =========================================================
     EDIT CHANGE
  ========================================================= */

  const handleEditChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* =========================================================
     CREATE PRODUCT
  ========================================================= */

  const handleCreate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setMessage('');
    setError('');

    try {
      setCreating(true);

      const newProduct =
        await addProduct({
          name: formData.name,
          price: Number(formData.price),
          quantity: Number(
            formData.quantity
          ),
          image: formData.image,
          description:
            formData.description,
          type: formData.type,
          category: formData.category,
        });

      setProducts(prev => [
        newProduct,
        ...prev,
      ]);

      setMessage(
        'Product created successfully'
      );

      setFormData({
        name: '',
        price: '',
        quantity: '',
        image: '',
        description: '',
        type: '',
        category: '',
      });
    } catch (err) {
      console.log(err);

      setError(
        'Failed to create product'
      );
    } finally {
      setCreating(false);
    }
  };

  /* =========================================================
     OPEN UPDATE MODAL
  ========================================================= */

  const openEditModal = (
    product: ProductType
  ) => {
    setSelectedProduct(product);

    setEditForm({
      name: product.name,
      price: String(product.price),
      quantity: String(product.quantity),
      image: product.image,
      description:
        product.description,
      type: product.type,
      category: product.category,
    });
  };

  /* =========================================================
     SAVE UPDATE
  ========================================================= */

  const handleSaveUpdate =
    async () => {
      if (!selectedProduct) return;

      setMessage('');
      setError('');

      try {
        setEditingLoading(true);

        const updated =
          await updateProduct(
            selectedProduct.id,
            {
              name: editForm.name,
              price: Number(
                editForm.price
              ),
              quantity: Number(
                editForm.quantity
              ),
              image: editForm.image,
              description:
                editForm.description,
              type: editForm.type,
              category:
                editForm.category,
            }
          );

        setProducts(prev =>
          prev.map(product =>
            product.id ===
            selectedProduct.id
              ? updated
              : product
          )
        );

        setMessage(
          'Product updated successfully'
        );

        setSelectedProduct(null);
      } catch (err) {
        console.log(err);

        setError(
          'Failed to update product'
        );
      } finally {
        setEditingLoading(false);
      }
    };

  /* =========================================================
     DELETE PRODUCT
  ========================================================= */

  const handleDelete = async (
    id: number
  ) => {
    const confirmDelete =
      window.confirm(
        'Delete this product?'
      );

    if (!confirmDelete) return;

    setMessage('');
    setError('');

    try {
      await deleteProduct(id);

      setProducts(prev =>
        prev.filter(
          product =>
            product.id !== id
        )
      );

      setMessage(
        'Product deleted successfully'
      );
    } catch (err) {
      console.log(err);

      setError(
        'Failed to delete product'
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ee] p-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="bg-white p-8 rounded-3xl border">
          <h1 className="text-4xl font-serif">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back{' '}
            {user?.firstName}
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="bg-green-100 text-green-700 border border-green-300 p-4 rounded-2xl">
            {message}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded-2xl">
            {error}
          </div>
        )}

        {/* CREATE FORM */}
        <div className="bg-white p-8 rounded-3xl border">
          <h2 className="text-2xl font-serif mb-6">
            Add Product
          </h2>

          <form
            onSubmit={handleCreate}
            className="grid md:grid-cols-2 gap-5"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="type"
              placeholder="Type"
              value={formData.type}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border p-4 rounded-xl"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-4 rounded-xl md:col-span-2 min-h-[120px]"
            />

            <button
              type="submit"
              disabled={creating}
              className="bg-black text-white py-4 rounded-full uppercase tracking-[0.2em] md:col-span-2"
            >
              {creating
                ? 'Creating...'
                : 'Add Product'}
            </button>
          </form>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white p-8 rounded-3xl border">
          <h2 className="text-2xl font-serif mb-8">
            Products
          </h2>

          <div className="space-y-6">
            {products.map(product => (
              <div
                key={product.id}
                className="border rounded-3xl p-6 flex flex-col md:flex-row gap-6"
              >
                <div className="relative w-full md:w-48 h-60 md:h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover rounded-2xl"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-gray-500">
                    ${product.price}
                  </p>

                  <p className="mt-2">
                    {product.description}
                  </p>

                  <div className="flex gap-4 mt-6 ">
                    <button
                      onClick={() =>
                        openEditModal(
                          product
                        )
                      }
                      className="bg-black text-white px-6 py-3 rounded-full uppercase text-xs cursor-pointer"
                    >
                      Update Product
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          product.id
                        )
                      }
                      className="bg-red-500 text-white px-6 py-3 rounded-full uppercase text-xs cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EDIT MODAL */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-3xl rounded-3xl p-8 space-y-5 max-h-[90vh] overflow-y-auto">

              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-serif">
                  Update Product
                </h2>

                <button
                  onClick={() =>
                    setSelectedProduct(
                      null
                    )
                  }
                  className="text-2xl"
                >
                  ×
                </button>
              </div>

              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={
                  handleEditChange
                }
                className="border p-4 rounded-xl w-full"
              />

              <input
                type="number"
                name="price"
                value={editForm.price}
                onChange={
                  handleEditChange
                }
                className="border p-4 rounded-xl w-full"
              />

              <input
                type="number"
                name="quantity"
                value={
                  editForm.quantity
                }
                onChange={
                  handleEditChange
                }
                className="border p-4 rounded-xl w-full"
              />

              <input
                type="text"
                name="image"
                value={editForm.image}
                onChange={
                  handleEditChange
                }
                className="border p-4 rounded-xl w-full"
              />

              <input
                type="text"
                name="type"
                value={editForm.type}
                onChange={
                  handleEditChange
                }
                className="border p-4 rounded-xl w-full"
              />

              <input
                type="text"
                name="category"
                value={
                  editForm.category
                }
                onChange={
                  handleEditChange
                }
                className="border p-4 rounded-xl w-full"
              />

              <textarea
                name="description"
                value={
                  editForm.description
                }
                onChange={
                  handleEditChange
                }
                className="border p-4 rounded-xl w-full min-h-[150px]"
              />

              <button
                onClick={
                  handleSaveUpdate
                }
                disabled={
                  editingLoading
                }
                className="bg-black text-white px-8 py-4 rounded-full uppercase tracking-[0.2em] w-full cursor-pointer"
              >
                {editingLoading
                  ? 'Saving...'
                  : 'Save Changes'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}