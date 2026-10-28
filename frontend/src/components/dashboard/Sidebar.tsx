import {
House,
MessageSquare,
BookOpen,
Refrigerator,
NotebookPen,
UserRound,
Settings,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import "./Sidebar.css";

const mainLinks = [
{ label: "Главная", path: "/dashboard", icon: House },
{ label: "Чат с ИИ", path: "/chat", icon: MessageSquare },
{ label: "Мои рецепты", path: "/recipes", icon: BookOpen },
{ label: "Мои продукты", path: "/products", icon: Refrigerator },
{ label: "Дневник питания", path: "/diary", icon: NotebookPen },
];

const bottomLinks = [
{ label: "Профиль", path: "/profile", icon: UserRound },
{ label: "Настройки", path: "/settings", icon: Settings },
];

function Sidebar() {
return ( <aside className="dashboard-sidebar"> <Link to="/" className="sidebar-brand" aria-label="На главную"> <img src="/logo.png" alt="Здоровый Профиль" /> </Link>

  <nav className="sidebar-navigation" aria-label="Основная навигация">
    {mainLinks.map(({ label, path, icon: Icon }) => (
      <NavLink
        key={path}
        to={path}
        end={path === "/dashboard"}
        className={({ isActive }) =>
          `sidebar-link${isActive ? " active" : ""}`
        }
      >
        <Icon size={21} strokeWidth={2.4} />
        <span>{label}</span>
      </NavLink>
    ))}
  </nav>

  <nav
    className="sidebar-bottom"
    aria-label="Профиль и настройки"
  >
    {bottomLinks.map(({ label, path, icon: Icon }) => (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) =>
          `sidebar-link${isActive ? " active" : ""}`
        }
      >
        <Icon size={21} strokeWidth={2.4} />
        <span>{label}</span>
      </NavLink>
    ))}
  </nav>
</aside>

);
}

export default Sidebar;
