import type { UserProfile } from "../../types/profile";
import {
  Target,
  Scale,
  Dumbbell,
  Salad,
  Heart,
  Flame,
  BicepsFlexed,
  Droplet,
  Wheat,
  Info,
  Sparkles,
} from "lucide-react";

import "./ProfileStepTwo.css";

const goals = [
  {
    value: "lose",
    title: "Снижение веса",
    description: "Хочу постепенно снизить вес и улучшить форму.",
    Icon: Scale,
  },
  {
    value: "gain",
    title: "Набор веса",
    description: "Хочу увеличить вес или набрать мышечную массу.",
    Icon: Dumbbell,
  },
  {
    value: "maintain",
    title: "Поддержание веса",
    description: "Хочу сохранять текущий вес и поддерживать форму.",
    Icon: Salad,
  },
  {
    value: "balanced",
    title: "Сбалансированное питание",
    description: "Хочу питаться разнообразно без конкретной цели по весу.",
    Icon: Heart,
  },
];

interface ProfileStepTwoProps {
  data: UserProfile["nutrition"];
  onChange: (data: Partial<UserProfile["nutrition"]>) => void;
}

function ProfileStepTwo({ data, onChange }: ProfileStepTwoProps) {
  const handleNumberChange = (
    field: "calories" | "proteins" | "fats" | "carbs",
    value: string
  ) => {
    const digits = value.replace(/\D/g, "");

    if (digits === "") {
      onChange({ [field]: null });
      return;
    }

    const number = Number(digits);

    const max = field === "calories" ? 10000 : 1000;

    if (number <= max) {
      onChange({ [field]: number });
    }
  };

  return (
    <div className="profile-step-two">
      <header className="profile-step-header">
        <h1>Какая у вас цель питания?</h1>
        <p>
          Это поможет подобрать подходящие рекомендации
          и рассчитать оптимальные значения КБЖУ
        </p>
      </header>

      {/* Выбор цели */}
      <section className="profile-section">
        <div className="profile-section-title">
          <Target size={24} />
          <h2>Ваша цель</h2>
        </div>

        <div className="goal-options">
          {goals.map(({ value, title, description, Icon }) => (
            <button
              key={value}
              type="button"
              className={`goal-card ${
                data.goal === value ? "selected" : ""
              }`}
              onClick={() => onChange({ goal: value })}
            >
              <span className="goal-radio">
                {data.goal === value && <span />}
              </span>

              <Icon className="goal-icon" size={42} />

              <strong>{title}</strong>

              <span className="goal-description">
                {description}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Целевые значения КБЖУ */}
      <section className="profile-section macro-section">
        <div className="macro-heading">
          <div>
            <div className="profile-section-title">
              <Target size={24} />
              <h2>Целевые значения КБЖУ</h2>
            </div>

            <p className="macro-subtitle">
              Укажите свои значения вручную или используйте
              автоматический расчёт
            </p>
          </div>

          <button
            type="button"
            className="macro-calculate-button"
            disabled
            title="Автоматический расчёт будет подключён позже"
          >
            <Sparkles size={17} />
            Рассчитать автоматически
          </button>
        </div>

        <div className="macro-grid">
          <div className="macro-card">
            <div className="macro-card-title">
              <Flame size={23} />
              <strong>Калории</strong>
              <Info size={15} />
            </div>

            <div className="macro-input-row">
              <input
                type="text"
                inputMode="numeric"
                placeholder="1800"
                value={data.calories ?? ""}
                onChange={(event) =>
                  handleNumberChange("calories", event.target.value)
                }
              />
              <span>ккал/день</span>
            </div>

            <span className="macro-hint">
              Пример: 1800 ккал
            </span>
          </div>

          <div className="macro-card">
            <div className="macro-card-title">
              <BicepsFlexed size={23} />
              <strong>Белки</strong>
              <Info size={15} />
            </div>

            <div className="macro-input-row">
              <input
                type="text"
                inputMode="numeric"
                min="0"
                max="1000"
                placeholder="130"
                value={data.proteins ?? ""}
                onChange={(event) =>
                  handleNumberChange("proteins", event.target.value)
                }
              />
              <span>г/день</span>
            </div>

            <span className="macro-hint">
              Количество белка в сутки
            </span>
          </div>

          <div className="macro-card">
            <div className="macro-card-title">
              <Droplet size={23} />
              <strong>Жиры</strong>
              <Info size={15} />
            </div>

            <div className="macro-input-row">
              <input
                type="text"
                inputMode="numeric"
                min="0"
                max="1000"
                placeholder="60"
                value={data.fats ?? ""}
                onChange={(event) =>
                  handleNumberChange("fats", event.target.value)
                }
              />
              <span>г/день</span>
            </div>

            <span className="macro-hint">
              Количество жиров в сутки
            </span>
          </div>

          <div className="macro-card">
            <div className="macro-card-title">
              <Wheat size={23} />
              <strong>Углеводы</strong>
              <Info size={15} />
            </div>

            <div className="macro-input-row">
              <input
                type="text"
                inputMode="numeric"
                min="0"
                max="1000"
                placeholder="180"
                value={data.carbs ?? ""}
                onChange={(event) =>
                  handleNumberChange("carbs", event.target.value)
                }
              />
              <span>г/день</span>
            </div>

            <span className="macro-hint">
              Количество углеводов в сутки
            </span>
          </div>
        </div>

        <div className="macro-information">
          <Info size={19} />
          <span>
            Значения КБЖУ можно будет изменить позже в разделе
            «Профиль». Пока поля не заполнены, примеры служат
            только подсказками.
          </span>
        </div>
      </section>
    </div>
  );
}

export default ProfileStepTwo;