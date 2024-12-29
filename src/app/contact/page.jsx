import React from "react";

function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form action="" className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <label htmlFor="password"> Password</label>
          <input
            type="url"
            id="url"
            name="url"
            placeholder="https://example.com"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        
        <label htmlFor="confirm-password"> Confirm password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
          />
        
      </form>
    </div>
  );
}

export default page;
