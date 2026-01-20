// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import isLogIn from "../../checkLogin/isLogIn";
// import LogInButton from "./LogInButton";
// import Profile from "../authorAuth/Profile";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const [loggedIn, setLoggedIn] = useState(() => isLogIn());

//   useEffect(() => {
//     // handler to update login state
//     const handleAuthChange = () => {
//       setLoggedIn(isLogIn());
//     };

//     // listen to storage (other tabs) and custom authChange (same tab)
//     window.addEventListener("storage", handleAuthChange);
//     window.addEventListener("authChange", handleAuthChange);

//     // cleanup
//     return () => {
//       window.removeEventListener("storage", handleAuthChange);
//       window.removeEventListener("authChange", handleAuthChange);
//     };
//   }, []);

//   return (
//     <nav className="w-full sticky top-0 z-50 bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/home" className="inline-flex items-center">
//           <h1 className="text-2xl font-bold text-red-600 tracking-wide cursor-pointer">
//             Blogging<span className="text-gray-800">Site</span>
//           </h1>
//         </Link>

//         {/* Menu */}
//         <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
//           <li
//             onClick={() => navigate("/blogs")}
//             className="hover:text-red-600 cursor-pointer transition"
//           >
//             Blogs
//           </li>
//           <li className="hover:text-red-600 cursor-pointer transition">
//             About Us
//           </li>
//           <li className="hover:text-red-600 cursor-pointer transition">
//             Contact
//           </li>
//         </ul>

//         {/* Auth area */}
//         <div>{loggedIn ? <Profile /> : <LogInButton />}</div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import isLogIn from "../../checkLogin/isLogIn";
import LogInButton from "./LogInButton";
import Profile from "../authorAuth/Profile";

/**
 * NOTE:
 * menuItemsJSX is a plain function that returns JSX.
 * It's declared outside the Navbar component body to avoid
 * "components created during render" React error.
 */
const menuItemsJSX = (navigate, closeMenu) => (
  <>
    <li>
      <button
        onClick={() => {
          closeMenu();
          navigate("/blogs");
        }}
        className="w-full text-left px-4 py-2 hover:text-red-600"
      >
        Blogs
      </button>
    </li>

    <li>
      <button
        onClick={() => {
          closeMenu();
          navigate("/about");
        }}
        className="w-full text-left px-4 py-2 hover:text-red-600"
      >
        About Us
      </button>
    </li>

    <li>
      <button
        onClick={() => {
          closeMenu();
          navigate("/contact");
        }}
        className="w-full text-left px-4 py-2 hover:text-red-600"
      >
        Contact
      </button>
    </li>
  </>
);

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(() => isLogIn());
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync auth state across tabs / app
  useEffect(() => {
    const handleAuthChange = () => setLoggedIn(isLogIn());
    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("authChange", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/home" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-red-600">
            Blogging<span className="text-gray-800">Site</span>
          </h1>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <button onClick={() => navigate("/blogs")} className="hover:text-red-600">
            Blogs
          </button>

          <button onClick={() => navigate("/about")} className="hover:text-red-600">
            About Us
          </button>

          <button onClick={() => navigate("/contact")} className="hover:text-red-600">
            Contact
          </button>
        </div>

        {/* DESKTOP AUTH */}
        <div className="hidden md:block">
          {loggedIn ? <Profile /> : <LogInButton />}
        </div>

        {/* MOBILE CONTROLS */}
        <div className="md:hidden flex items-center gap-2">
          {/* show compact profile label (Profile component handles its own UI) */}
          {loggedIn && (
            <div className="mr-2">
              <Profile />
            </div>
          )}

          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded hover:bg-gray-100"
          >
            {/* simple hamburger icon */}
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileOpen(false)}
          />

          {/* drawer */}
          <div className="fixed right-0 top-0 h-full w-72 bg-white z-50 shadow-lg">
            <div className="flex justify-between items-center px-4 py-4 border-b">
              <h2 className="font-bold text-red-600">Menu</h2>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <ul className="py-4 space-y-1">
              {menuItemsJSX(navigate, () => setMobileOpen(false))}
            </ul>

            <div className="border-t px-4 py-4">
              {loggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/profiledata");
                    }}
                    className="block w-full text-left py-2"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("x-api-key");
                      localStorage.removeItem("authorId");
                      window.dispatchEvent(new Event("authChange"));
                      setMobileOpen(false);
                      navigate("/login");
                    }}
                    className="text-red-600 font-semibold mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/register");
                    }}
                    className="w-full bg-red-600 text-white py-2 rounded mb-2"
                  >
                    Register
                  </button>

                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/login");
                    }}
                    className="w-full border py-2 rounded"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
