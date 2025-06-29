// src/components/Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">
          © {new Date().getFullYear()} InkPress - All rights reserved
        </p>
        <p className="text-gray-400 text-sm">
          Developed by <span className="text-blue-300">Ibn_misbah</span>{" "}
          @shiera_developers
        </p>
      </div>
    </footer>
  );
}

export default Footer;
