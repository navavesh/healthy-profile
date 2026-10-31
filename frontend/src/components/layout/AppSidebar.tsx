import {
  House,
  MessageSquare,
  BookOpen,
  Refrigerator,
  NotebookPen,
  UserRound,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { NavLink, Link } from "react-router-dom";

import "./AppSidebar.css";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

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

function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  return (
    <aside
      className={`app-sidebar ${collapsed ? "collapsed" : "expanded"}`}
    >
      <div className="sidebar-top">
        <Link to="/dashboard" className="sidebar-logo">
          <img
            className="sidebar-logo-full"
            src="/logo.png"
            alt="Здоровый Профиль"
          />

          <img
            className="sidebar-logo-icon"
            src="/logo-icon.png"
            alt=""
          />
        </Link>

        <button
          className="sidebar-toggle"
          type="button"
          onClick={onToggle}
          aria-label={
            collapsed ? "Развернуть меню" : "Свернуть меню"
          }
          title={collapsed ? "Развернуть меню" : "Свернуть меню"}
        >
          {collapsed ? (
            <PanelLeftOpen size={21} />
          ) : (
            <PanelLeftClose size={21} />
          )}
        </button>
      </div>

      <nav className="sidebar-navigation">
        {mainLinks.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/dashboard"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={21} strokeWidth={2.3} />

            <span className="sidebar-link-label">
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      <nav className="sidebar-bottom">
        {bottomLinks.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={21} strokeWidth={2.3} />

            <span className="sidebar-link-label">
              {label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AppSidebar;