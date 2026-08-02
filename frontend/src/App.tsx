import { Routes, Route } from "react-router-dom";
import Layout from "./shared/ui/Layout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Collection from "./pages/collection/Collection";
import Contacts from "./pages/contacts/Contacts";
import AdminAdd from "./pages/admin/add/AdminAdd";
import AdminEdit from "./pages/admin/edit/AdminEdit";
import Login from "./pages/login/Login";
import { AuthProvider } from "./features/auth/AuthContext";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/collection" element={<Layout><Collection /></Layout>} />
        <Route path="/contacts" element={<Layout><Contacts /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminAdd />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/add" 
          element={
            <ProtectedRoute>
              <AdminAdd />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/edit" 
          element={
            <ProtectedRoute>
              <AdminEdit />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
