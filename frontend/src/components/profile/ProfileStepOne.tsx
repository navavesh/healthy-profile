import type { UserProfile } from "../../types/profile";
import { useState } from "react";
import {
  UserRound,
  UsersRound,
  Ruler,
  Weight,
  Activity,
  Armchair,
  Footprints,
  Dumbbell,
  PersonStanding,
  Moon,
  Utensils,
  Laptop,
  Info,
} from "lucide-react";

import "./ProfileStepOne.css";

const activityLevels = [
  {
    value: "low",
    label: "Низкий",
    description: "Преимущественно сидячий образ жизни",
    Icon: Armchair,
  },
  {
    value: "moderate",
    label: "Умеренный",
    description: "Регулярно хожу пешком, лёгкие тренировки",
    Icon: Footprints,
  },
  {
    value: "high",
    label: "Высокий",
    description: "Часто занимаюсь спортом",
    Icon: Dumbbell,
  },
  {
    value: "very_high",
    label: "Очень высокий",
    description: "Интенсивные тренировки и высокая нагрузка",
    Icon: PersonStanding,
  },
];

const isValidInteger = (value: string, max: number): boolean => {
  if (value === "") return true;

  if (!/^\d+$/.test(value)) return false;

  return Number(value) <= max;
};

const isValidWeight = (value: string): boolean => {
  if (value === "") return true;

  if (!/^\d*[.,]?\d*$/.test(value)) return false;

  const number = Number(value.replace(",", "."));

  return Number.isFinite(number) && number <= 300;
};

interface ProfileStepOneProps {
  data: UserProfile["personal"];
  onChange: (data: Partial<UserProfile["personal"]>) => void;
}

function ProfileStepOne({ data, onChange }: ProfileStepOneProps) {
  const [weightInput, setWeightInput] = useState(
    data.weight === null ? "" : String(data.weight)
  );
  return (
    <div className="profile-step-one">
      <header className="profile-step-header">
        <h1>Расскажите о себе</h1>
        <p>Это поможет настроить ваш профиль питания</p>
      </header>

      {/* Основная информация */}
      <section className="profile-section">
        <h2>Основная информация</h2>

        <div className="profile-basic-grid">
          <div className="profile-field-card gender-card">
            <div className="profile-field-title">
              <UserRound size={25} />
              <span>Пол</span>
            </div>

            <div className="gender-options">
              <button
                type="button"
                className={data.gender === "male" ? "selected" : ""}
                onClick={() => onChange({ gender: "male" })}
              >
                Мужской
              </button>

              <button
                type="button"
                className={data.gender === "female" ? "selected" : ""}
                onClick={() => onChange({ gender: "female" })}
              >
                Женский
              </button>
            </div>
          </div>

          <div className="profile-field-card">
            <div className="profile-field-title">
              <UsersRound size={25} />
              <span>Возраст</span>
            </div>

            <input
              type="text"
              inputMode="numeric"
              value={data.age ?? ""}
              onChange={(event) => {
                const value = event.target.value;

                if (isValidInteger(value, 100)) {
                  onChange({
                    age: value === "" ? null : Number(value),
                  });
                }
              }}
            />
          </div>

          <div className="profile-field-card">
            <div className="profile-field-title">
              <Ruler size={25} />
              <span>Рост</span>
            </div>

            <div className="profile-input-with-unit">
              <input
                type="text"
                inputMode="numeric"
                value={data.height ?? ""}
                onChange={(event) => {
                  const value = event.target.value;

                  if (isValidInteger(value, 250)) {
                    onChange({
                      height: value === "" ? null : Number(value),
                    });
                  }
                }}
              />
              <span>см</span>
            </div>
          </div>

          <div className="profile-field-card">
            <div className="profile-field-title">
              <Weight size={25} />
              <span>Вес</span>
            </div>

            <div className="profile-input-with-unit">
              <input
                type="text"
                inputMode="decimal"
                value={weightInput}
                onChange={(event) => {
                  const value = event.target.value;

                  if (isValidWeight(value)) {
                    setWeightInput(value);

                    if (value === "" || /[0-9]$/.test(value)) {
                      onChange({
                        weight: value === "" ? null : Number(value.replace(",", ".")),
                      });
                    }
                  }
                }}
              />
              <span>кг</span>
            </div>
          </div>
        </div>
      </section>

      {/* Физическая активность */}
      <section className="profile-section">
        <div className="profile-section-title">
          <Activity size={23} />
          <h2>Уровень физической активности</h2>

          <div className="profile-info-tooltip">
            <Info size={17} />
            <span>
              Учитывайте не только тренировки, но и повседневную
              активность: прогулки, работу и движение в течение дня.
            </span>
          </div>
        </div>

        <div className="activity-options">
          {activityLevels.map(({ value, label, description, Icon }) => (
            <button
              key={value}
              type="button"
              className={`activity-card ${
                data.activity === value ? "selected" : ""
              }`}
              onClick={() => onChange({ activity: value })}
            >
              <span className="activity-radio">
                {data.activity === value && <span />}
              </span>

              <Icon className="activity-icon" size={34} />

              <strong>{label}</strong>

              <span className="activity-description">
                {description}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Образ жизни */}
      <section className="profile-section lifestyle-section">
        <div className="profile-section-title">
          <Activity size={23} />
          <h2>Образ жизни</h2>

          <div className="profile-info-tooltip">
            <Info size={17} />
            <span>
              Эти сведения помогут учитывать ваш распорядок дня
              при подборе питания.
            </span>
          </div>
        </div>

        <div className="lifestyle-fields">
          <div className="lifestyle-field">
            <div className="lifestyle-label">
              <Moon size={19} />
              <span>Режим сна</span>
            </div>

            <select
              value={data.sleepSchedule}
              onChange={(event) =>
                onChange({ sleepSchedule: event.target.value })
              }
            >
              <option value="">Выберите режим сна</option>
              <option value="less-6">Менее 6 часов</option>
              <option value="6-7">Около 6–7 часов</option>
              <option value="7-8">Около 7–8 часов</option>
              <option value="8-9">Около 8–9 часов</option>
              <option value="more-9">Более 9 часов</option>
              <option value="irregular">Нерегулярный режим</option>
            </select>
          </div>

          <div className="lifestyle-field">
            <div className="lifestyle-label">
              <Utensils size={19} />
              <span>График питания</span>
            </div>

            <select
              value={data.mealSchedule}
              onChange={(event) =>
                onChange({ mealSchedule: event.target.value })
              }
            >
              <option value="">Выберите график питания</option>
              <option value="2">2 раза в день</option>
              <option value="3">3 раза в день</option>
              <option value="4">4 раза в день</option>
              <option value="5">5 и более раз в день</option>
              <option value="irregular">Без определённого графика</option>
            </select>
          </div>

          <div className="lifestyle-field">
            <div className="lifestyle-label">
              <Laptop size={19} />
              <span>Рабочий режим</span>
            </div>

            <select
              value={data.workMode}
              onChange={(event) =>
                onChange({ workMode: event.target.value })
              }
            >
              <option value="">Выберите рабочий режим</option>
              <option value="computer">В основном за компьютером</option>
              <option value="standing">Преимущественно стоя</option>
              <option value="moving">Постоянно в движении</option>
              <option value="physical">Физическая работа</option>
              <option value="remote">Удалённая работа</option>
              <option value="not-working">Не работаю / учусь</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileStepOne;