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

function ProfileStepOne() {
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("low");

  const [sleepSchedule, setSleepSchedule] = useState("7-8");
  const [mealSchedule, setMealSchedule] = useState("3");
  const [workMode, setWorkMode] = useState("computer");

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
                className={gender === "male" ? "selected" : ""}
                onClick={() => setGender("male")}
              >
                Мужской
              </button>

              <button
                type="button"
                className={gender === "female" ? "selected" : ""}
                onClick={() => setGender("female")}
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
              type="number"
              min="14"
              max="100"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </div>

          <div className="profile-field-card">
            <div className="profile-field-title">
              <Ruler size={25} />
              <span>Рост</span>
            </div>

            <div className="profile-input-with-unit">
              <input
                type="number"
                min="100"
                max="250"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
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
                type="number"
                min="20"
                max="300"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
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
                activity === value ? "selected" : ""
              }`}
              onClick={() => setActivity(value)}
            >
              <span className="activity-radio">
                {activity === value && <span />}
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
              value={sleepSchedule}
              onChange={(event) => setSleepSchedule(event.target.value)}
            >
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
              value={mealSchedule}
              onChange={(event) => setMealSchedule(event.target.value)}
            >
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
              value={workMode}
              onChange={(event) => setWorkMode(event.target.value)}
            >
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