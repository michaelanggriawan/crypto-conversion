"use client"

import React from "react";
import Calculator from "../components/Calculator";

function Home() {
  // Get current date and time
  const currentDateTime = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-gray-200 flex flex-col justify-center sm:py-12">
      <div className="p-3 md:p-10 xs:p-0 mx-auto md:w-full md:max-w-xl">
        <h1 className="font-bold text-center text-2xl mb-2">
          La Coco Crypto Exchange
        </h1>
        <p className="text-center text-gray-500 text-xs mb-1">
          Current Date and Time: {currentDateTime}
        </p>
        <div className="relative bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <span className="absolute rounded-b-lg inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

          <Calculator />

          <p className="font-md text-slate-500 mb-2 py-5 px-2 md:px-5 text-xs md:text-sm">
            <a href="#" rel="noreferrer" className="text-indigo-600">
              Code of Relevancy
            </a>{" "}
            presents a crypto conversion calculator for both personal and
            business transactions, streamlining your conversion needs in one
            easy-to-use tool.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
