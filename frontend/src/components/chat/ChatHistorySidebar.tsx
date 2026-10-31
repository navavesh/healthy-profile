import { Plus, MessageSquare, Trash2 } from "lucide-react";

import "./ChatHistorySidebar.css";

export interface Chat {
  id: number;
  title: string;
  date: string;
}

interface ChatHistorySidebarProps {
  chats: Chat[];
  activeChatId: number | null;
  onNewChat: () => void;
  onSelectChat: (id: number) => void;
  onDeleteChat: (id: number) => void;
}

function ChatHistorySidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}: ChatHistorySidebarProps) {
  return (
    <aside className="chat-history-sidebar">
      <button
        className="chat-new-button"
        type="button"
        onClick={onNewChat}
      >
        <Plus size={19} />
        <span>Новый чат</span>
      </button>

      <div className="chat-history-heading">
        История переписок
      </div>

      <div className="chat-history-list">
        {chats.length === 0 ? (
          <div className="chat-history-empty">
            <MessageSquare size={24} />
            <p>У вас пока нет переписок</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-history-item ${
                activeChatId === chat.id ? "active" : ""
              }`}
            >
              <button
                type="button"
                className="chat-history-select"
                onClick={() => onSelectChat(chat.id)}
              >
                <MessageSquare size={17} />

                <span className="chat-history-title">
                  {chat.title}
                </span>
              </button>

              <button
                type="button"
                className="chat-history-delete"
                aria-label={`Удалить чат ${chat.title}`}
                title="Удалить чат"
                onClick={() => onDeleteChat(chat.id)}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default ChatHistorySidebar;