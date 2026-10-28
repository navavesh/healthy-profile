import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Пароль должен содержать минимум 8 символов.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают.");
      return;
    }

    if (!acceptedTerms) {
      setError("Необходимо принять условия использования.");
      return;
    }

    setError(
      "Форма заполнена правильно. Регистрация будет доступна после подключения сервера.",
    );
  }

  return (
    <main className="register-page">
      <div className="register-background" aria-hidden="true" />

      <img
        className="register-leaves"
        src="/tea-leaves.png"
        alt=""
        aria-hidden="true"
      />

      <section className="register-content">
        <h1 className="register-title">
          Создайте свой
          <br />
          здоровый профиль
          <img
            className="title-leaf"
            src="/leaves.png"
            alt=""
            aria-hidden="true"
            />
        </h1>

        <div className="register-card">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="register-name">Имя</label>

              <input
                id="register-name"
                name="name"
                type="text"
                placeholder="Например, Анна"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="register-email">Электронная почта</label>

              <input
                id="register-email"
                name="email"
                type="email"
                placeholder="anna@mail.ru"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="register-password">Пароль</label>

              <div className="password-input">
                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Минимум 8 символов"
                  autoComplete="new-password"
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  className="password-toggle"
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

            <div className="form-field">
              <label htmlFor="register-confirm-password">
                Повторите пароль
              </label>

              <div className="password-input">
                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Введите пароль еще раз"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  required
                />

                <button
                  className="password-toggle"
                  type="button"
                  aria-label={
                    showConfirmPassword
                      ? "Скрыть пароль"
                      : "Показать пароль"
                  }
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={21} />
                  ) : (
                    <Eye size={21} />
                  )}
                </button>
              </div>
            </div>

            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) =>
                  setAcceptedTerms(event.target.checked)
                }
              />

              <span>
                Я согласен(на) с{" "}
                <a href="/terms" onClick={(event) => event.preventDefault()}>
                  условиями использования
                </a>{" "}
                и{" "}
                <a
                  href="/privacy"
                  onClick={(event) => event.preventDefault()}
                >
                  политикой конфиденциальности
                </a>
              </span>
            </label>

            {error && (
              <p
                className="register-message"
                role="status"
                aria-live="polite"
              >
                {error}
              </p>
            )}

            <button className="register-submit" type="submit">
              Создать аккаунт
            </button>

            <div className="register-footer">
              <span>Уже есть аккаунт?</span>

              <Link className="register-login-link" to="/login">
                Войти
              </Link>
            </div>
          </form>
        </div>

        <Link className="register-home-link" to="/">
          На главную
        </Link>
      </section>
    </main>
  );
}

export default RegisterPage;