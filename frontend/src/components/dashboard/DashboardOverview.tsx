import { ArrowRight, ClipboardList, Plus, Salad, ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

import "./DashboardOverview.css";

function DashboardOverview() {
return ( <section className="dashboard-overview"> <article className="overview-card"> <header className="overview-card-header"> <div className="overview-icon"> <ClipboardList size={34} /> </div>

      <div>
        <h2>Сегодня в дневнике</h2>
        <p>Отслеживайте своё питание и достигайте целей</p>
      </div>
    </header>

    <div className="overview-empty-illustration" aria-hidden="true">
      <Salad size={82} strokeWidth={1.2} />
    </div>

    <div className="overview-empty-content">
      <h3>Вы ещё не добавляли приёмы пищи</h3>
      <p>Добавьте первый приём пищи, чтобы увидеть статистику за день</p>
    </div>

    <Link className="overview-action" to="/diary">
      Добавить еду <Plus size={19} />
    </Link>
  </article>

  <article className="overview-card">
    <header className="overview-card-header">
      <div className="overview-icon">
        <ShoppingBasket size={34} />
      </div>

      <div>
        <h2>Мои продукты</h2>
        <p>Добавляйте ингредиенты, которые есть у вас дома</p>
      </div>
    </header>

    <div
      className="overview-empty-illustration overview-basket"
      aria-hidden="true"
    >
      <ShoppingBasket size={88} strokeWidth={1.2} />
    </div>

    <div className="overview-empty-content">
      <h3>Вы ещё не добавляли продукты</h3>
    </div>

    <Link className="overview-action" to="/products">
      Добавить продукт <Plus size={19} />
    </Link>
  </article>

  <Link className="overview-recipes-link" to="/recipes">
    <span>Перейти к моим рецептам</span>
    <ArrowRight size={18} />
  </Link>
</section>

);
}

export default DashboardOverview;