// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import CreateBlog from "./pages/CreateBloge";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import LogOut from "./pages/Logout";
import EditPost from "./pages/EditPost";

// Layout component to handle conditional rendering
function Layout({ children }) {
  const location = useLocation();
  const hideOnPages = ["/login", "/register"];
  const shouldHide = hideOnPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {!shouldHide && <Navbar />}
      <main className="flex-grow py-8">{children}</main>
      {!shouldHide && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
