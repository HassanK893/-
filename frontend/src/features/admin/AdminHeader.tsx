import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function AdminHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="admin-header">
      <nav>
        <NavLink to="/admin/add" end>Добавить</NavLink>
        <NavLink to="/admin/edit">Изменить</NavLink>
      </nav>
      <div style={{ display: "flex", gap: "10px", alignItems: "center", background: "white" }}>
        <NavLink to="/collection" className="back-link highlight">Вернуться к коллекции</NavLink>
        <button 
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            background: "transparent",
            border: "2px solid var(--link-color, rgb(255, 136, 0))",
            borderRadius: "6px",
            color: "var(--link-color, rgb(255, 136, 0))",
            fontWeight: 600
          }}
        >
          Выйти
        </button>
      </div>
    </header>
  );
}
export default AdminHeader;
