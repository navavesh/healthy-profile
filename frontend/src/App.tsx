import {
ArrowRight,
ChefHat,
HeartHandshake,
Salad,
Flame,
Menu,
X,
} from "lucide-react";
import { useState } from "react";
import "./App.css";

const features = [
{
icon: ChefHat,
title: "Персональные",
secondLine: "рекомендации",
},
{
icon: HeartHandshake,
title: "Учет ограничений",
secondLine: "и аллергий",
},
{
icon: Salad,
title: "Расчет КБЖУ",
secondLine: "",
},
];

function App() {
const [menuOpen, setMenuOpen] = useState(false);

const closeMenu = () => setMenuOpen(false);

return ( <main className="landing"> 

      <header className="header"> 

    <a className="brand" href="#home" aria-label="Здоровый Профиль">
      <img
        className="brand-logo"
        src="/logo.png"
        alt="Здоровый Профиль"
      />
    </a>

    <button
      className="mobile-menu-button"
      type="button"
      aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

    <nav className={`navigation ${menuOpen ? "navigation-open" : ""}`}>
      <a href="#features" onClick={closeMenu}>
        Возможности
      </a>
      <a href="#about" onClick={closeMenu}>
        О продукте
      </a>
      <a href="#pricing" onClick={closeMenu}>
        Тарифы
      </a>
      <a href="#faq" onClick={closeMenu}>
        Вопросы
      </a>
    </nav>

    <div className="header-actions">
      <a className="button button-outline" href="#login">
        Войти
      </a>
      <a className="button button-primary button-register" href="#register">
        Зарегистрироваться
      </a>
    </div>
  </header>

  <section className="hero" id="home">
    <div className="hero-content">
      <div className="hero-copy">
        <h1>
          Персональный
          <br />
          помощник по
          <br />
          питанию
        </h1>

        <p className="hero-description">
          Помогает выбирать блюда из имеющихся
          <br className="desktop-break" />
          продуктов, учитывает ваши ограничения
          <br className="desktop-break" />
          и цели, рассчитывает КБЖУ и ведет дневник питания.
        </p>

        <a className="button button-primary hero-button" href="#register">
          Начать бесплатно
          <ArrowRight size={17} />
        </a>
      </div>

      <div className="features" id="features">
        {features.map(({ icon: Icon, title, secondLine }) => (
          <div className="feature" key={title}>
            <div className="feature-icon">
              <Icon size={28} strokeWidth={1.35} />
            </div>

            <p>
              {title}
              {secondLine && (
                <>
                  <br />
                  {secondLine}
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div className="nutrition-card">
      <div className="nutrition-main">
        <div className="calorie-icon">
          <Flame size={34} strokeWidth={1.8} />
        </div>

        <div>
          <strong className="calorie-value">536 ккал</strong>
          <span className="calorie-caption">на порцию</span>
        </div>
      </div>

      <div className="macros">
        <span>Б 22 г</span>
        <span>Ж 18 г</span>
        <span>У 62 г</span>
      </div>
    </div>
  </section>

  <div className="bottom-decoration" aria-hidden="true">
    <span />
    <span />
    <span />
  </div>
</main>

);
}

export default App;
