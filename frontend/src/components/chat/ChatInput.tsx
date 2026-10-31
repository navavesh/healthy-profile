import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Send } from "lucide-react";

import "./Chat.css";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = value.trim();

    if (!message || disabled) return;

    onSend(message);
    setValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Спросите что-нибудь о питании..."
        rows={1}
        disabled={disabled}
        aria-label="Ваше сообщение"
      />

      <button
        type="submit"
        disabled={!value.trim() || disabled}
        aria-label="Отправить сообщение"
      >
        <Send size={21} />
      </button>
    </form>
  );
}

export default ChatInput;