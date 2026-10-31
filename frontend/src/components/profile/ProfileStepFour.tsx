import { useState } from "react";
import {
  HeartPulse,
  Info,
  ShieldCheck,
  MessageSquareText,
  Stethoscope,
  CircleHelp,
} from "lucide-react";

import "./ProfileStepFour.css";

type HealthStatus = "none" | "has_details" | "prefer_not" | "";

function ProfileStepFour() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus>("");
  const [healthDetails, setHealthDetails] = useState("");

  return (
    <div className="profile-step-four">
      <header className="profile-step-header">
        <h1>Расскажите о здоровье</h1>
        <p>
          Укажите особенности, которые могут быть важны
          при подборе повседневного питания
        </p>
      </header>

      <section className="profile-section">
        <div className="profile-section-title">
          <HeartPulse size={24} />
          <h2>Есть ли особенности здоровья?</h2>
        </div>

        <div className="health-options">
          <button
            type="button"
            className={`health-option-card ${
              healthStatus === "none" ? "selected" : ""
            }`}
            onClick={() => setHealthStatus("none")}
          >
            <span className="health-option-icon">
              <ShieldCheck size={32} />
            </span>

            <strong>Нет особенностей</strong>

            <span>
              Нет известных мне особенностей здоровья,
              которые нужно учитывать при подборе питания
            </span>

            <span className="health-radio">
              {healthStatus === "none" && <span />}
            </span>
          </button>

          <button
            type="button"
            className={`health-option-card ${
              healthStatus === "has_details" ? "selected" : ""
            }`}
            onClick={() => setHealthStatus("has_details")}
          >
            <span className="health-option-icon">
              <Stethoscope size={32} />
            </span>

            <strong>Есть особенности</strong>

            <span>
              Есть состояния или рекомендации специалиста,
              которые я хочу указать
            </span>

            <span className="health-radio">
              {healthStatus === "has_details" && <span />}
            </span>
          </button>

          <button
            type="button"
            className={`health-option-card ${
              healthStatus === "prefer_not" ? "selected" : ""
            }`}
            onClick={() => setHealthStatus("prefer_not")}
          >
            <span className="health-option-icon">
              <CircleHelp size={32} />
            </span>

            <strong>Не хочу указывать</strong>

            <span>
              Предпочитаю не предоставлять эту информацию
            </span>

            <span className="health-radio">
              {healthStatus === "prefer_not" && <span />}
            </span>
          </button>
        </div>
      </section>

      {healthStatus === "has_details" && (
        <section className="profile-section health-details-section">
          <div className="profile-section-title">
            <MessageSquareText size={23} />
            <h2>Дополнительная информация</h2>
          </div>

          <p className="health-details-description">
            Опишите особенности или рекомендации, которые
            следует учитывать при подборе питания.
          </p>

          <textarea
            value={healthDetails}
            onChange={(event) => setHealthDetails(event.target.value)}
            placeholder="Например: специалист рекомендовал ограничить потребление соли..."
            rows={5}
            maxLength={1000}
          />

          <div className="health-character-count">
            {healthDetails.length}/1000
          </div>
        </section>
      )}

      <div className="health-notice">
        <Info size={21} />

        <div>
          <strong>Важно знать</strong>

          <p>
            Сервис не ставит диагнозы, не назначает лечение
            и не заменяет консультацию медицинского специалиста.
            Указанная информация используется только для учёта
            ваших особенностей при формировании рекомендаций
            по повседневному питанию.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileStepFour;