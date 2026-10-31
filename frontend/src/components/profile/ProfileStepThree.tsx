import { useState } from "react";
import type { ReactNode } from "react";
import type { UserProfile } from "../../types/profile";

import {
  ShieldAlert,
  AlertCircle,
  Ban,
  Plus,
  X,
  Info,
} from "lucide-react";

import "./ProfileStepThree.css";

const allergyOptions = [
  "Арахис",
  "Орехи",
  "Молоко",
  "Яйца",
  "Рыба",
  "Морепродукты",
  "Соя",
  "Пшеница",
];

const intoleranceOptions = [
  "Лактоза",
  "Глютен",
  "Фруктоза",
  "Гистамин",
];

const stopProductOptions = [
  "Грибы",
  "Лук",
  "Чеснок",
  "Оливки",
  "Баклажаны",
  "Острая пища",
];

interface RestrictionSectionProps {
  title: string;
  description: string;
  icon: ReactNode;
  options: string[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
}

function RestrictionSection({
  title,
  description,
  icon,
  options,
  selected,
  onChange,
  placeholder,
}: RestrictionSectionProps) {
  const [customValue, setCustomValue] = useState("");

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const addCustomValue = () => {
    const value = customValue.trim();

    if (
      !value ||
      selected.some(
        (item) => item.toLowerCase() === value.toLowerCase()
      )
    ) {
      return;
    }

    onChange([...selected, value]);
    setCustomValue("");
  };

  const removeValue = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  return (
    <section className="restriction-card">
      <div className="restriction-heading">
        {icon}

        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      <div className="restriction-options">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            className={`restriction-chip ${
              selected.includes(option) ? "selected" : ""
            }`}
            onClick={() => toggleOption(option)}
          >
            {option}
            {selected.includes(option) && <X size={14} />}
          </button>
        ))}
      </div>

      <div className="restriction-custom">
        <input
          type="text"
          placeholder={placeholder}
          value={customValue}
          maxLength={100}
          onChange={(event) => setCustomValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addCustomValue();
            }
          }}
        />

        <button
          type="button"
          onClick={addCustomValue}
          disabled={!customValue.trim()}
          aria-label="Добавить продукт"
        >
          <Plus size={19} />
        </button>
      </div>

      {selected.length > 0 && (
        <div className="restriction-selected">
          <span className="restriction-selected-label">
            Выбрано: {selected.length}
          </span>

          <div className="restriction-selected-list">
            {selected.map((value) => (
              <span className="restriction-selected-item" key={value}>
                {value}

                <button
                  type="button"
                  onClick={() => removeValue(value)}
                  aria-label={`Удалить ${value}`}
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

interface ProfileStepThreeProps {
  data: UserProfile["restrictions"];
  onChange: (data: Partial<UserProfile["restrictions"]>) => void;
}

function ProfileStepThree({
  data,
  onChange,
}: ProfileStepThreeProps) {
  const handleRestrictionsChange = (
    field: "allergies" | "intolerances" | "stopProducts",
    value: string[]
  ) => {
    onChange({
      [field]: value,
      noRestrictions: false,
    });
  };

  const handleNoRestrictions = (checked: boolean) => {
    if (checked) {
      onChange({
        noRestrictions: true,
        allergies: [],
        intolerances: [],
        stopProducts: [],
      });
    } else {
      onChange({
        noRestrictions: false,
      });
    }
  };

  return (
    <div className="profile-step-three">
      <header className="profile-step-header">
        <h1>Есть ли у вас ограничения в питании?</h1>
        <p>
          Укажите продукты, которые необходимо исключить
          из рекомендаций и рецептов
        </p>
      </header>

      <div className="restriction-notice">
        <Info size={20} />

        <span>
          Мы будем учитывать эту информацию при подборе рецептов
          и формировании рекомендаций.
        </span>
      </div>

      <div className="restriction-sections">
        <RestrictionSection
          title="Пищевые аллергии"
          description="Продукты, которые могут вызывать у вас аллергическую реакцию"
          icon={<ShieldAlert size={27} />}
          options={allergyOptions}
          selected={data.allergies}
          onChange={(value) =>
            handleRestrictionsChange("allergies", value)
          }
          placeholder="Добавить другой аллерген..."
        />

        <RestrictionSection
          title="Пищевые непереносимости"
          description="Продукты или компоненты, которые ваш организм плохо переносит"
          icon={<AlertCircle size={27} />}
          options={intoleranceOptions}
          selected={data.intolerances}
          onChange={(value) =>
            handleRestrictionsChange("intolerances", value)
          }
          placeholder="Добавить другую непереносимость..."
        />

        <RestrictionSection
          title="Нежелательные продукты"
          description="Ингредиенты, которые вы не хотите видеть в своих блюдах"
          icon={<Ban size={27} />}
          options={stopProductOptions}
          selected={data.stopProducts}
          onChange={(value) =>
            handleRestrictionsChange("stopProducts", value)
          }
          placeholder="Добавить нежелательный продукт..."
        />
      </div>

      <label className="no-restrictions-option">
        <input
          type="checkbox"
          checked={data.noRestrictions}
          onChange={(event) =>
            handleNoRestrictions(event.target.checked)
          }
        />

        <span className="no-restrictions-checkbox" />

        <span>
          У меня нет пищевых ограничений и нежелательных продуктов
        </span>
      </label>
    </div>
  );
}

export default ProfileStepThree;