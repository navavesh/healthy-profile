import {
  Utensils,
  CalendarDays,
  Calculator,
} from "lucide-react";

import "./ChatWelcome.css";

interface ChatWelcomeProps {
  onSuggestionClick: (message: string) => void;
}

const suggestions = [
  {
    icon: Utensils,
    title: "Что приготовить\nиз моих продуктов?",
    message:
      "Что я могу приготовить из имеющихся у меня продуктов?",
  },
  {
    icon: CalendarDays,
    title: "Подбери рецепты на\nнеделю",
    message:
      "Подбери мне рецепты на неделю с учётом моих целей питания.",
  },
  {
    icon: Calculator,
    title: "Помоги рассчитать\nКБЖУ",
    message:
      "Помоги рассчитать мои индивидуальные цели по КБЖУ.",
  },
];

function ChatWelcome({ onSuggestionClick }: ChatWelcomeProps) {
  return (
    <div className="chat-welcome">
      <div className="chat-welcome-content">

        <img
          className="chat-welcome-illustration"
          src="/chat-bot.png"
          alt="ИИ-помощник Здорового профиля"
        />

        <h1>Чем могу помочь?</h1>

        <p className="chat-welcome-description">
          Задайте любой вопрос о питании, рецептах или вашем рационе.
          <br />
          Я учитываю ваши цели, ограничения и доступные продукты
        </p>

        <div className="chat-welcome-suggestions">
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon;

            return (
              <button
                key={suggestion.message}
                type="button"
                className="chat-suggestion-card"
                onClick={() =>
                  onSuggestionClick(suggestion.message)
                }
              >
                <Icon size={35} strokeWidth={1.5} />

                <span>
                  {suggestion.title.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      {index === 0 && <br />}
                    </span>
                  ))}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default ChatWelcome;