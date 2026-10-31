import { Bot, UserRound } from "lucide-react";
import "./Chat.css";

export interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
}

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <article
      className={`chat-message ${isAssistant ? "assistant" : "user"}`}
    >
      <div className="chat-message-avatar">
        {isAssistant ? <Bot size={21} /> : <UserRound size={21} />}
      </div>

      <div className="chat-message-body">
        <div className="chat-message-header">
          <strong>{isAssistant ? "ИИ-помощник" : "Вы"}</strong>
          <span>{message.time}</span>
        </div>

        <div className="chat-message-text">
          {message.content}
        </div>
      </div>
    </article>
  );
}

export default ChatMessage;