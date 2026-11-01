import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, UserRound, Target, ShieldAlert, HeartPulse, Utensils, Save, RotateCcw } from "lucide-react";
import type { UserProfile } from "../types/profile";
import { loadProfile, saveProfile } from "../utils/profileStorage";

import ProfileStepOne from "../components/profile/ProfileStepOne";
import ProfileStepTwo from "../components/profile/ProfileStepTwo";
import ProfileStepThree from "../components/profile/ProfileStepThree";
import ProfileStepFour from "../components/profile/ProfileStepFour";
import ProfileStepFive from "../components/profile/ProfileStepFive";

import "./ProfilePage.css";

type SectionId = "personal" | "nutrition" | "restrictions" | "health" | "preferences";

const sectionMeta: { id: SectionId; title: string; description: string; Icon: typeof UserRound }[] = [
  { id: "personal", title: "Личная информация", description: "Основные данные и образ жизни", Icon: UserRound },
  { id: "nutrition", title: "Цели и КБЖУ", description: "Цель питания и дневные показатели", Icon: Target },
  { id: "restrictions", title: "Пищевые ограничения", description: "Аллергии, непереносимости и нежелательные продукты", Icon: ShieldAlert },
  { id: "health", title: "Информация о здоровье", description: "Особенности, которые следует учитывать при подборе питания", Icon: HeartPulse },
  { id: "preferences", title: "Пищевые предпочтения", description: "Любимые кухни и условия приготовления", Icon: Utensils },
];

const activityLabels: Record<string, string> = {
  low: "Низкий", moderate: "Умеренный", high: "Высокий", very_high: "Очень высокий",
};
const sleepLabels: Record<string, string> = {
  "less-6": "Менее 6 часов", "6-7": "Около 6–7 часов", "7-8": "Около 7–8 часов",
  "8-9": "Около 8–9 часов", "more-9": "Более 9 часов", irregular: "Нерегулярный режим",
};
const mealLabels: Record<string, string> = {
  "2": "2 раза в день", "3": "3 раза в день", "4": "4 раза в день",
  "5": "5 и более раз в день", irregular: "Без определённого графика",
};
const workLabels: Record<string, string> = {
  computer: "В основном за компьютером", standing: "Преимущественно стоя", moving: "Постоянно в движении",
  physical: "Физическая работа", remote: "Удалённая работа", "not-working": "Не работаю / учусь",
};
const goalLabels: Record<string, string> = {
  lose: "Снижение веса", gain: "Набор веса", maintain: "Поддержание веса", balanced: "Сбалансированное питание",
};
const cookingLabels: Record<string, string> = {
  "15": "До 15 минут", "30": "До 30 минут", "60": "До 1 часа", any: "Без ограничений",
};
const healthLabels: Record<string, string> = {
  none: "Нет особенностей", has_details: "Есть особенности", prefer_not: "Не хочу указывать",
};
const valueOrEmpty = (value: string | number | null | undefined) =>
  value === "" || value === null || value === undefined ? "Не указано" : String(value);

function ProfilePage() {
  const [savedProfile, setSavedProfile] = useState<UserProfile>(() => loadProfile());
  const [draftProfile, setDraftProfile] = useState<UserProfile>(() => loadProfile());
  const [expandedSections, setExpandedSections] = useState<Set<SectionId>>(new Set());

  const hasChanges = useMemo(
    () => JSON.stringify(savedProfile) !== JSON.stringify(draftProfile),
    [savedProfile, draftProfile],
  );

  const updateSection = <K extends SectionId>(
    section: K,
    data: Partial<UserProfile[K]>,
  ) => {
    setDraftProfile((previous) => ({
      ...previous,
      [section]: { ...previous[section], ...data },
    }));
  };

  const toggleSection = (section: SectionId) => {
    setExpandedSections((previous) => {
      const next = new Set(previous);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const handleSave = () => {
    saveProfile(draftProfile);
    setSavedProfile(draftProfile);
    setExpandedSections(new Set());
  };

  const handleCancel = () => {
    setDraftProfile(savedProfile);
    setExpandedSections(new Set());
  };

  const renderSummary = (section: SectionId) => {
    switch (section) {
      case "personal": {
        const p = draftProfile.personal;
        return <div className="profile-summary-grid">
          <SummaryItem label="Пол" value={p.gender === "male" ? "Мужской" : p.gender === "female" ? "Женский" : "Не указано"} />
          <SummaryItem label="Возраст" value={p.age === null ? "Не указано" : `${p.age} лет`} />
          <SummaryItem label="Рост" value={p.height === null ? "Не указано" : `${p.height} см`} />
          <SummaryItem label="Вес" value={p.weight === null ? "Не указано" : `${p.weight} кг`} />
          <SummaryItem label="Активность" value={activityLabels[p.activity] ?? valueOrEmpty(p.activity)} />
          <SummaryItem label="Режим сна" value={sleepLabels[p.sleepSchedule] ?? valueOrEmpty(p.sleepSchedule)} />
          <SummaryItem label="График питания" value={mealLabels[p.mealSchedule] ?? valueOrEmpty(p.mealSchedule)} />
          <SummaryItem label="Рабочий режим" value={workLabels[p.workMode] ?? valueOrEmpty(p.workMode)} />
        </div>;
      }
      case "nutrition": {
        const n = draftProfile.nutrition;
        return <div className="profile-summary-grid">
          <SummaryItem label="Цель" value={goalLabels[n.goal] ?? valueOrEmpty(n.goal)} />
          <SummaryItem label="Калории" value={n.calories === null ? "Не указано" : `${n.calories} ккал/день`} />
          <SummaryItem label="Белки" value={n.proteins === null ? "Не указано" : `${n.proteins} г/день`} />
          <SummaryItem label="Жиры" value={n.fats === null ? "Не указано" : `${n.fats} г/день`} />
          <SummaryItem label="Углеводы" value={n.carbs === null ? "Не указано" : `${n.carbs} г/день`} />
        </div>;
      }
      case "restrictions": {
        const r = draftProfile.restrictions;
        if (r.noRestrictions) return <p className="profile-empty-value">Нет пищевых ограничений и нежелательных продуктов</p>;
        const groups = [
          { label: "Аллергии", values: r.allergies },
          { label: "Непереносимости", values: r.intolerances },
          { label: "Нежелательные продукты", values: r.stopProducts },
        ];
        return <div className="profile-tag-groups">{groups.map((group) => <div className="profile-tag-group" key={group.label}>
          <span className="profile-summary-label">{group.label}</span>
          {group.values.length ? <div className="profile-tags">{group.values.map((value) => <span className="profile-tag" key={value}>{value}</span>)}</div> : <span className="profile-empty-value">Не указано</span>}
        </div>)}</div>;
      }
      case "health": {
        const h = draftProfile.health;
        return <div className="profile-summary-grid">
          <SummaryItem label="Статус" value={healthLabels[h.status] ?? "Не указано"} />
          {h.status === "has_details" && <SummaryItem label="Дополнительная информация" value={h.details.trim() ? "Указана (скрыта)" : "Не указано"} />}
        </div>;
      }
      case "preferences": {
        const p = draftProfile.preferences;
        return <div className="profile-summary-grid">
          <div className="profile-summary-item profile-summary-wide"><span className="profile-summary-label">Предпочитаемые кухни</span>
            {p.cuisines.length ? <div className="profile-tags">{p.cuisines.map((value) => <span className="profile-tag" key={value}>{value}</span>)}</div> : <span className="profile-empty-value">Не указано</span>}
          </div>
          <SummaryItem label="Время приготовления" value={cookingLabels[p.cookingTime] ?? valueOrEmpty(p.cookingTime)} />
          <SummaryItem label="Дополнительные пожелания" value={p.additionalPreferences.trim() || "Не указано"} wide />
        </div>;
      }
    }
  };

  const renderEditor = (section: SectionId) => {
    switch (section) {
      case "personal": return <ProfileStepOne data={draftProfile.personal} onChange={(data) => updateSection("personal", data)} />;
      case "nutrition": return <ProfileStepTwo data={draftProfile.nutrition} onChange={(data) => updateSection("nutrition", data)} />;
      case "restrictions": return <ProfileStepThree data={draftProfile.restrictions} onChange={(data) => updateSection("restrictions", data)} />;
      case "health": return <ProfileStepFour data={draftProfile.health} onChange={(data) => updateSection("health", data)} />;
      case "preferences": return <ProfileStepFive data={draftProfile.preferences} onChange={(data) => updateSection("preferences", data)} />;
    }
  };

  const personal = draftProfile.personal;

  return <main className="profile-page">
    <header className="profile-page-header">
      <div>
        <h1>Мой профиль</h1>
        <p>Личные данные и настройки питания</p>
      </div>
      {expandedSections.size > 0 && <button type="button" className="profile-collapse-all" onClick={() => setExpandedSections(new Set())}>Свернуть всё <ChevronUp size={17} /></button>}
    </header>

    <section className="profile-overview">
      <div className="profile-overview-heading"><div className="profile-overview-icon"><UserRound size={25} /></div><div><h2>Общая информация</h2><p>Краткая сводка вашего профиля</p></div></div>
      <div className="profile-overview-stats">
        <OverviewStat label="Возраст" value={personal.age === null ? "—" : `${personal.age} лет`} />
        <OverviewStat label="Рост" value={personal.height === null ? "—" : `${personal.height} см`} />
        <OverviewStat label="Вес" value={personal.weight === null ? "—" : `${personal.weight} кг`} />
      </div>
      <div className="profile-overview-details">
        <span>{personal.gender === "male" ? "Мужской" : personal.gender === "female" ? "Женский" : "Пол не указан"}</span>
        <span>{activityLabels[personal.activity] ? `${activityLabels[personal.activity]} уровень активности` : "Активность не указана"}</span>
        <span>{sleepLabels[personal.sleepSchedule] ?? "Режим сна не указан"}</span>
        <span>{mealLabels[personal.mealSchedule] ?? "График питания не указан"}</span>
      </div>
    </section>

    <section className="profile-sections">
      {sectionMeta.map(({ id, title, description, Icon }) => {
        const expanded = expandedSections.has(id);
        return <article className={`profile-section-card ${expanded ? "expanded" : ""}`} key={id}>
          <button type="button" className="profile-section-trigger" onClick={() => toggleSection(id)} aria-expanded={expanded}>
            <span className="profile-section-icon"><Icon size={22} /></span>
            <span className="profile-section-heading"><strong>{title}</strong><small>{description}</small></span>
            <span className="profile-section-trigger-action">{expanded ? "Свернуть" : "Изменить"}{expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
          </button>
          <div className="profile-section-summary">{renderSummary(id)}</div>
          {expanded && <div className="profile-editor-content">{renderEditor(id)}</div>}
        </article>;
      })}
    </section>

    {hasChanges && <div className="profile-save-bar">
      <div className="profile-save-message"><span className="profile-unsaved-dot" />Есть несохранённые изменения</div>
      <div className="profile-save-actions">
        <button type="button" className="profile-cancel-button" onClick={handleCancel}><RotateCcw size={17} />Отменить изменения</button>
        <button type="button" className="profile-save-button" onClick={handleSave}><Save size={17} />Сохранить</button>
      </div>
    </div>}
  </main>;
}

function SummaryItem({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <div className={`profile-summary-item ${wide ? "profile-summary-wide" : ""}`}><span className="profile-summary-label">{label}</span><span className="profile-summary-value">{value}</span></div>;
}

function OverviewStat({ label, value }: { label: string; value: string }) {
  return <div className="profile-overview-stat"><strong>{value}</strong><span>{label}</span></div>;
}

export default ProfilePage;
