import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");
const [rememberMe, setRememberMe] = useState(false);

function handleSubmit(event: FormEvent<HTMLFormElement>) {
event.preventDefault();
setError(
"Форма заполнена. Вход станет доступен после подключения сервера.",
);
}

return ( <main className="login-page"> <div className="login-background" aria-hidden="true" />

  <section className="login-content">
    <h1 className="login-title">
      С возвращением!
      <img
        className="login-title-leaf"
        src="/leaves.png"
        alt=""
        aria-hidden="true"
      />
    </h1>

    <p className="login-subtitle">
      Войдите, чтобы продолжить заботиться о своем здоровье
    </p>

    <div className="login-card">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-field">
          <label htmlFor="login-email">Электронная почта</label>

          <input
            id="login-email"
            name="email"
            type="email"
            placeholder="anna@mail.ru"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="login-field">
          <label htmlFor="login-password">Пароль</label>

          <div className="login-password-input">
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Введите пароль"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button
              className="login-password-toggle"
              type="button"
              aria-label={
                showPassword ? "Скрыть пароль" : "Показать пароль"
              }
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={21} />
              ) : (
                <Eye size={21} />
              )}
            </button>
          </div>
        </div>

        <div className="login-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <span>Запомнить меня</span>
          </label>

          <Link className="login-forgot" to="/forgot-password">
            Забыли пароль?
          </Link>
        </div>

        {error && (
          <p className="login-message" role="status" aria-live="polite">
            {error}
          </p>
        )}

        <button className="login-submit" type="submit">
          Войти
        </button>

        <div className="login-footer">
          <span>Ещё нет аккаунта?</span>

          <Link className="login-register-link" to="/register">
            Регистрация
          </Link>
        </div>
      </form>
    </div>

    <Link className="login-home-link" to="/">
      На главную
    </Link>
  </section>
</main>

);
}

export default LoginPage;