
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto mt-16 p-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
      <p className="text-gray-600 mb-4">The page you are looking for does not exist.</p>
      <Link to="/" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700">
        Go back to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;