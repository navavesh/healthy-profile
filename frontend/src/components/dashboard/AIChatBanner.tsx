import { ArrowRight, Bot } from "lucide-react";
import { Link } from "react-router-dom";

import "./AIChatBanner.css";

function AIChatBanner() {
return ( <section className="ai-chat-banner"> <div className="ai-chat-icon"> <Bot size={38} strokeWidth={2} /> </div>

  <div className="ai-chat-content">
    <h2>Задайте вопрос ИИ-помощнику</h2>

    <p>
      Например: «Что приготовить на ужин из курицы и брокколи?»
    </p>
  </div>

  <Link className="ai-chat-button" to="/chat">
    <span>Открыть чат</span>
    <ArrowRight size={19} />
  </Link>
</section>

);
}

export default AIChatBanner;