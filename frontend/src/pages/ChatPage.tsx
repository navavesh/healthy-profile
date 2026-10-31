import { useState } from "react";

import ChatHistorySidebar, {
  type Chat,
} from "../components/chat/ChatHistorySidebar";

import ChatWelcome from "../components/chat/ChatWelcome";
import ChatMessage, {
  type Message,
} from "../components/chat/ChatMessage";

import ChatInput from "../components/chat/ChatInput";

import "./ChatPage.css";

interface ChatConversation extends Chat {
  messages: Message[];
}

function getCurrentTime() {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

function ChatPage() {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

  const activeChat = conversations.find(
    (chat) => chat.id === activeChatId,
  );

  function createChat() {
    setActiveChatId(null);
  }

  function handleSend(content: string) {
    let chatId = activeChatId;

    if (chatId === null) {
      chatId = Date.now();

      const newChat: ChatConversation = {
        id: chatId,
        title: content.length > 30
          ? `${content.slice(0, 30)}...`
          : content,
        date: getCurrentTime(),
        messages: [],
      };

      setConversations((previous) => [...previous, newChat]);
      setActiveChatId(chatId);
    }

    const message: Message = {
      id: Math.random(),
      role: "user",
      content,
      time: getCurrentTime(),
    };

    setConversations((previous) =>
      previous.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
            }
          : chat,
      ),
    );
  }

  function deleteChat(id: number) {
    setConversations((previous) =>
      previous.filter((chat) => chat.id !== id),
    );

    if (activeChatId === id) {
      setActiveChatId(null);
    }
  }

  return (
    <div className="chat-page">
      <ChatHistorySidebar
        chats={conversations}
        activeChatId={activeChatId}
        onNewChat={createChat}
        onSelectChat={setActiveChatId}
        onDeleteChat={deleteChat}
      />

      <section className="chat-workspace">
        {activeChat && activeChat.messages.length > 0 ? (
          <div className="chat-messages">
            {activeChat.messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
              />
            ))}
          </div>
        ) : (
          <ChatWelcome onSuggestionClick={handleSend} />
        )}

        <div className="chat-composer">
          <ChatInput onSend={handleSend} />

          <p className="chat-disclaimer">
            ИИ может допускать ошибки. Проверяйте важную информацию.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ChatPage;