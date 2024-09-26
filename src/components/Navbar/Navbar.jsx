import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import ServiceModal from "../Services/ServiceModal"; // Import the modal component
import BuyPage from "./BuyPage";

const Navbar = ({ toggleTheme, theme }) => {




  // Function to handle the opening and closing of the modal
 
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 p-[16px]">
      <div className="container py-3 sm:py-0">
        <div className="flex justify-between items-center">
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
              MenuApp
            </a>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div>
              <DarkMode toggleTheme={toggleTheme} theme={theme} />
            </div>
          <BuyPage />
          </div>
        </div>
      </div>

      {/* Service Modal */}

    </div>
  );
};

export default Navbar;
