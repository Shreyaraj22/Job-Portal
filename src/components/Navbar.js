import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ jobTitle: searchTerm, location: '', datePosted: 'all' }); // Basic search
    navigate('/');
  };

  return (
    <nav className="bg-purple-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">Job Portal</Link>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            placeholder="Search jobs..."
            className="text-gray-800 rounded-md px-3 py-2 mr-2 focus:outline-none"
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Search
          </button>
        </form>
        <div>
          <Link to="/about" className="mr-4 hover:text-purple-300">About</Link>
          <Link to="/applied-jobs" className="hover:text-purple-300">My Applications</Link> {/* Added Link */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;