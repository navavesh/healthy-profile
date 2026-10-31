import { useState } from "react";
import {
  Utensils,
  Clock,
  MessageSquareText,
  Info,
  CookingPot,
} from "lucide-react";

import "./ProfileStepFive.css";

const cuisineOptions = [
  "Европейская",
  "Итальянская",
  "Средиземноморская",
  "Азиатская",
  "Японская",
  "Китайская",
  "Мексиканская",
  "Кавказская",
  "Восточная",
  "Русская",
];

const cookingOptions = [
  {
    value: "15",
    title: "До 15 минут",
    description: "Быстрые и простые блюда",
  },
  {
    value: "30",
    title: "До 30 минут",
    description: "Обычная домашняя готовка",
  },
  {
    value: "60",
    title: "До 1 часа",
    description: "Готов уделить больше времени",
  },
  {
    value: "any",
    title: "Без ограничений",
    description: "Время приготовления не принципиально",
  },
];

function ProfileStepFive() {
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [cookingTime, setCookingTime] = useState("");
  const [additionalPreferences, setAdditionalPreferences] = useState("");

  const toggleCuisine = (cuisine: string) => {
    setCuisines((current) =>
      current.includes(cuisine)
        ? current.filter((item) => item !== cuisine)
        : [...current, cuisine]
    );
  };

  return (
    <div className="profile-step-five">
      <header className="profile-step-header">
        <h1>Какие у вас предпочтения?</h1>
        <p>
          Расскажите, какую еду вы любите и сколько времени
          готовы уделять приготовлению
        </p>
      </header>

      {/* Предпочитаемая кухня */}
      <section className="profile-section">
        <div className="profile-section-title">
          <Utensils size={24} />
          <h2>Предпочитаемая кухня</h2>
        </div>

        <p className="preference-description">
          Выберите кухни, блюда которых вам интересны.
          Можно отметить несколько вариантов.
        </p>

        <div className="cuisine-options">
          {cuisineOptions.map((cuisine) => (
            <button
              type="button"
              key={cuisine}
              className={`cuisine-chip ${
                cuisines.includes(cuisine) ? "selected" : ""
              }`}
              onClick={() => toggleCuisine(cuisine)}
              aria-pressed={cuisines.includes(cuisine)}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </section>

      {/* Время приготовления */}
      <section className="profile-section">
        <div className="profile-section-title">
          <Clock size={24} />
          <h2>Сколько времени готовы тратить на готовку?</h2>
        </div>

        <div className="cooking-options">
          {cookingOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              className={`cooking-card ${
                cookingTime === option.value ? "selected" : ""
              }`}
              onClick={() => setCookingTime(option.value)}
              aria-pressed={cookingTime === option.value}
            >
              <span className="cooking-radio">
                {cookingTime === option.value && <span />}
              </span>

              <CookingPot size={30} />

              <strong>{option.title}</strong>

              <span>{option.description}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Дополнительные пожелания */}
      <section className="profile-section">
        <div className="profile-section-title">
          <MessageSquareText size={24} />
          <h2>Дополнительные пожелания</h2>
        </div>

        <p className="preference-description">
          Укажите другие предпочтения, которые помогут
          сделать рекомендации более подходящими.
        </p>

        <textarea
          className="preference-textarea"
          value={additionalPreferences}
          onChange={(event) =>
            setAdditionalPreferences(event.target.value.slice(0, 1000))
          }
          placeholder="Например: предпочитаю блюда с небольшим количеством ингредиентов, люблю домашнюю кухню..."
          rows={5}
          maxLength={1000}
        />

        <div className="preference-character-count">
          {additionalPreferences.length}/1000
        </div>
      </section>

      <div className="preference-notice">
        <Info size={20} />

        <span>
          Предпочтения можно будет изменить позже в разделе
          «Профиль». Заполнять все пункты необязательно.
        </span>
      </div>
    </div>
  );
}

export default ProfileStepFive;