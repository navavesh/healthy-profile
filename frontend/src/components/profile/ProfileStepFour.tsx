import type { UserProfile } from "../../types/profile";

import {
  HeartPulse,
  Info,
  ShieldCheck,
  MessageSquareText,
  Stethoscope,
  CircleHelp,
} from "lucide-react";

import "./ProfileStepFour.css";

interface ProfileStepFourProps {
  data: UserProfile["health"];
  onChange: (data: Partial<UserProfile["health"]>) => void;
}

function ProfileStepFour({ data, onChange }: ProfileStepFourProps) {
  const selectStatus = (
    status: UserProfile["health"]["status"]
  ) => {
    onChange({
      status,
      details: status === "has_details" ? data.details : "",
    });
  };

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
              data.status === "none" ? "selected" : ""
            }`}
            onClick={() => selectStatus("none")}
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
              {data.status === "none" && <span />}
            </span>
          </button>

          <button
            type="button"
            className={`health-option-card ${
              data.status === "has_details" ? "selected" : ""
            }`}
            onClick={() => selectStatus("has_details")}
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
              {data.status === "has_details" && <span />}
            </span>
          </button>

          <button
            type="button"
            className={`health-option-card ${
              data.status === "prefer_not" ? "selected" : ""
            }`}
            onClick={() => selectStatus("prefer_not")}
          >
            <span className="health-option-icon">
              <CircleHelp size={32} />
            </span>

            <strong>Не хочу указывать</strong>

            <span>
              Предпочитаю не предоставлять эту информацию
            </span>

            <span className="health-radio">
              {data.status === "prefer_not" && <span />}
            </span>
          </button>
        </div>
      </section>

      {data.status === "has_details" && (
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
            value={data.details}
            onChange={(event) =>
              onChange({ details: event.target.value })
            }
            placeholder="Например: специалист рекомендовал ограничить потребление соли..."
            rows={5}
            maxLength={1000}
          />

          <div className="health-character-count">
            {data.details.length}/1000
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