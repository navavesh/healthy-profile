import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import NutritionStats from "../components/dashboard/NutritionStats";
import AIChatBanner from "../components/dashboard/AIChatBanner";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import "./DashboardPage.css";

function formatDate(date: Date) {
return new Intl.DateTimeFormat("ru-RU", {
day: "numeric",
month: "short",
year: "numeric",
}).format(date);
}

function DashboardPage() {
const [selectedDate, setSelectedDate] = useState(() => new Date());

function changeDate(days: number) {
setSelectedDate((current) => {
const next = new Date(current);
next.setDate(next.getDate() + days);
return next;
});
}

return ( <div className="dashboard-layout"> <Sidebar />

  <main className="dashboard-main">
    <header className="dashboard-header">
      <div>
        <h1>Добро пожаловать!</h1>
        <p>Ваше питание и цель — в одном месте</p>
      </div>

      <button
        className="dashboard-avatar"
        type="button"
        aria-label="Открыть профиль"
        onClick={() => {
          window.location.href = "/profile";
        }}
      >
        <UserAvatar />
      </button>
    </header>

    <div className="dashboard-date">
      <button
        type="button"
        aria-label="Предыдущий день"
        onClick={() => changeDate(-1)}
      >
        <ChevronLeft size={18} />
      </button>

      <span>Сегодня, {formatDate(selectedDate)}</span>

      <button
        type="button"
        aria-label="Следующий день"
        onClick={() => changeDate(1)}
      >
        <ChevronRight size={18} />
      </button>
    </div>

    <NutritionStats />

    <AIChatBanner />

    <DashboardOverview />
  </main>
</div>

);
}

function UserAvatar() {
return ( <span className="dashboard-avatar-placeholder" aria-hidden="true"> <span>ЗП</span> </span>
);
}

export default DashboardPage;
