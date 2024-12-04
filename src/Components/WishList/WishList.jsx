import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]); // حالة لتخزين المنتجات في الـ Wishlist
  const [loading, setLoading] = useState(true); // حالة التحميل

  // جلب المنتجات من الـ Wishlist
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        setWishlistItems(data.data); // تحديث المنتجات
        setLoading(false); // إيقاف التحميل
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  // دالة لإزالة المنتج من الـ Wishlist
  async function removeFromWishlist(productId) {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      // تحديث المنتجات بعد الإزالة
      setWishlistItems(wishlistItems.filter(item => item._id !== productId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">My Wishlist</h1>

      {loading ? (
        <p>Loading your wishlist...</p>
      ) : wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlistItems.map(product => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <Link to={`/ProductDetailes/${product._id}`}>
                <img className="rounded-t-lg" src={product.imageCover} alt={product.title} />
              </Link>
              <div className="p-5">
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.title}
                </h5>
                <p className="text-gray-700 dark:text-gray-400">{product.description}</p>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
