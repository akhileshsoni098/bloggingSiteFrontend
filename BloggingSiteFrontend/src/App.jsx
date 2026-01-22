import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/authorAuth/Login";
import Register from "./components/authorAuth/Register";
import ProfileCardData from "./components/authorAuth/ProfileCardData";
import Navbar from "./components/navigation/Navbar";
import GetBlog from "./components/blogs/GetBlog";
import CreateAndUpdateBlog from "./components/blogs/CreateAndUpdateBlog";
import GetPublicBlog from "./components/blogs/GetPublicBlog";
import SinglePublicBlog from "./components/blogs/SinglePublicBlog";
import AboutUs from "./components/aboutus/AboutUs";
import ContactUs from "./components/contact/ContactUs";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiledata" element={<ProfileCardData />} />

        {/* Create: uses logged-in author from /profile */}
        <Route path="/createBlog" element={<CreateAndUpdateBlog />} />

        {/* Update */}
        <Route path="/updateBlog/:blogId" element={<CreateAndUpdateBlog />} />

        {/* List */}
        <Route path="/your-blogs" element={<GetBlog />} />

        {/* /blogs */}

        <Route path="/blogs" element={<GetPublicBlog />} />
        <Route path="/blog/:blogId" element={<SinglePublicBlog />} />
        <Route path="/about" element={<AboutUs />} />
         <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;

/* 
contact Us 
About Us Remains 
*/
