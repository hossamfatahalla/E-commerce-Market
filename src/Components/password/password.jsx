import React, { useState } from 'react';
import axios from 'axios';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault(); // منع التحديث الافتراضي للصفحة
    setLoading(true); // بدء حالة التحميل

    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPassword', {
        email,
      });
      setMessage(response.data.message); // عرض رسالة النجاح
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong, please try again later.');
    } finally {
      setLoading(false); // إنهاء حالة التحميل
    }
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Forget Password</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Enter your email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-gray-700 dark:text-gray-400">{message}</p>}
    </div>
  );
}
