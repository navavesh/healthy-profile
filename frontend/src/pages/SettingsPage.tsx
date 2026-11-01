import { Globe2, Palette, ChevronRight } from "lucide-react";
import "./CollectionPages.css";

function SettingsPage(){
 return <main className="collection-page"><header className="collection-header"><div><span className="eyebrow">ПРИЛОЖЕНИЕ</span><h1>Настройки</h1><p>Персональные настройки интерфейса.</p></div></header>
 <section className="settings-list"><article className="setting-card"><div className="setting-icon"><Globe2 size={22}/></div><div className="setting-copy"><strong>Язык интерфейса</strong><span>Выбор языка приложения</span></div><div className="setting-value">Русский <ChevronRight size={17}/></div></article><article className="setting-card"><div className="setting-icon"><Palette size={22}/></div><div className="setting-copy"><strong>Тема оформления</strong><span>Светлая или тёмная тема</span></div><div className="setting-value">Светлая <ChevronRight size={17}/></div></article><p className="settings-hint">Настройки пока находятся в разработке. Переключатели станут доступны в одной из следующих версий.</p></section>
 </main>;
}
export default SettingsPage;
