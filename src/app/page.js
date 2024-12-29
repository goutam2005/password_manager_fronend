"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Page() {
  const [password, setPassword] = useState([]);
  const [passwords, setPasswords] = useState({ URL: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [data, setData] = useState({
    id: '',
    URL: '',
    password: '',
  });

  useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/read');
        setPassword(response.data); // Set the fetched data
      } catch (err) {
        console.error(err);
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchData();
  }, [setPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwords.URL || !passwords.password) {
      setError('Please enter both URL and password.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/users', passwords);
      setPassword((prevPasswords) => [...prevPasswords, response.data]); // Append new password
      setPasswords({ URL: '', password: '' }); // Reset form
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleDeletePassword = async (id) => {
    setLoading(true); // Start the loading spinner
    try {
      const del = await axios.delete(`http://localhost:5000/api/users/${id}`);
      setPassword((prevPasswords) => prevPasswords.filter((password) => password.id !== id));
      console.log(del);
      console.log(password);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setLoading(false);
  }
const handleChangeupdate = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async (item) => {
    setData(item);    
    document.getElementById('my_modal_1').showModal()
  }
  const handleUpdate = async (data) => {

    setLoading(true); // Start the loading spinner
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${data.id}}`, data);
      setPassword((prevPasswords) =>
        prevPasswords.map((password) =>
          password.id === data.id ? { ...password, ...data } : password
        )
      );
      console.log(response);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setLoading(false);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <nav className="bg-[#0c0c0c] text-white">
        <ul className="flex p-4 text-2xl hover:cursor-pointer gap-4">
          <li className="hover:text-slate-400">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-slate-400">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-slate-400">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
       <h1 className='text-center text-4xl mt-5  text-blue-950 '>Welcome to Password Manager</h1>
      {/* Form Section */}
      <div className="flex items-center justify-center min-h-[70vh] bg-white">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-700 text-center">Enter your URL and Password below 👇</h2>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="URL" className="block text-sm font-medium text-gray-600">
                URL
              </label>
              <input
                onChange={handleChange}
                type="url"
                id="URL"
                name="URL"
                value={passwords.URL}
                placeholder="https://example.com"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                value={passwords.password}
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50 rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
     
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6">     
            
      
          <h3 className="font-bold text-xl text-center mb-4">Hello!</h3>
          <p className="text-gray-600 text-center mb-6">
            Press ESC key or click the button below to close.
          </p>
          <div className="flex flex-col items-center justify-center">
            <div className="w-full">
              <form method="dialog" className="space-y-4" onSubmit={()=>handleUpdate(data)}>
                <div>
                  <label
                    htmlFor="URL"
                    className="block text-sm font-medium text-gray-700"
                  >
                    URL
                  </label>
                  <input
                    onChange={handleChangeupdate}
                    type="url"
                    id="URL"
                    name="URL"
                    value={data.URL}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleChangeupdate}
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => document.getElementById('my_modal_1').close()}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>




      {/* Display Section */}
      <div className=''>
        <h1 className="text-4xl text-center mb-12">Password Manager</h1>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {password.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <ul className="space-y-2">
                <li className="text-lg font-semibold text-gray-800 truncate">
                  URL: <span className="text-sky-600">{item.URL}</span>
                </li>
                <li className="text-sm text-gray-600">
                  Password: <span className="font-mono bg-gray-100 px-2 py-1 rounded-md">{
                    visiblePasswords[item.id] ? item.password : "•".repeat(item.password.length)}
                    <svg className='inline ml-2 w-4 h-4' onClick={() => togglePasswordVisibility(item.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" /></svg>
                  </span>
                </li>
              </ul>
              <div className="flex items-center justify-between mt-4">
                <button className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300" onClick={() => handleDeletePassword(item.id)}>
                  Delete
                </button>
                <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300" onClick={() => handleUpdatePassword(item)}>
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
