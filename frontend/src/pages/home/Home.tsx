import { NavLink } from "react-router-dom";
import "../../shared/styles/index.css";
import "../../shared/styles/cards.css";
import "../../shared/styles/contacts.css";

function Home() {
  return (
    <>
      <section className="flex-column w-stretch h-center max-width1300">
        <h1>Кратко о нашем музее</h1>
        <article className="index-about flex-column">
          <div className="flex-row flex-center">
            <img src="/images/logo.png" alt="logo" />
            <img src="/images/region-logo.png" alt="region" />
          </div>
          <div className="flex-column">
            <p>Общественный музей космонавтики и авиации - это уникальное учреждение культуры, посвященное истории освоения неба и звезд. Здесь можно увидеть редкие экспонаты из мира авиации и космоса. Выставка представляет развитие авиации от первых самолетов до современных реактивных машин. Особенно интересны модели ракет и космических кораблей. Музей рассказывает о достижениях советских космонавтов и современных исследований. Посетители могут увидеть имитацию контроля полета и симулятор космического путешествия. Для детей предусмотрены интерактивные игровые зоны. В музее проводятся лекции и экскурсии для школьников. Здесь также представлены достижения мировой космонавтики и авиации. Музей является важным центром пропаганды знаний о космосе и авиации среди населения.</p>
            <br />
            <NavLink to="/about" className="button h-center">Подробнее</NavLink>
          </div>
        </article>
      </section>

      <section className="flex-column w-stretch h-center max-width1300">
        <h1>Последние новости</h1>
        <article className="card-list flex-column">
          <div className="flex-row flex-wrap flex-center">
            <article className="card news-card vertical-card levitate flex-column">
              <img src="/images/news/news1.jpg" alt="news1" />
              <div className="news-content">
                <h3><strong>Музей отмечает юбилей - 25 лет со дня основания!</strong></h3>
                <p>Уважаемые посетители! Наш музей отмечает юбилей - <b>25 лет со дня основания</b>! С этим праздником нас поздравляет Черных Л.В. - директор музея РКК "ЭНЕРГИЯ" им. С.П.Королёва. <br /><br /><a href="https://disk.yandex.ru/i/QJRwjiHfYicrsA">Нажмите сюда, чтобы посмотреть поздравление!</a></p>
                <div className="news-meta flex-row">
                  <p className="date">07.12.2025</p>
                </div>
              </div>
            </article>
            <article className="card news-card vertical-card levitate flex-column">
              <img src="/images/news/news1.jpg" alt="news2" />
              <div className="news-content">
                <h3><strong>Запуск официального сайта музея авиации и космонавтики!</strong></h3>
                <p>Уважаемые посетители! Мы рады сообщить, что наш музей авиации и космонавтики запустил свой официальный интернет-портал. Теперь вы можете узнать обо всех наших экспозициях, ближайших мероприятиях и получить подробную информацию о нашей коллекции прямо из дома. Присоединяйтесь к нам в виртуальном путешествии по истории авиации и космонавтики!</p>
                <div className="news-meta flex-row">
                  <p className="date">10.04.2025</p>
                </div>
              </div>
            </article>
          </div>
        </article>
      </section>

      <section className="flex-column w-stretch h-center max-width1300">
        <h1>Свяжитесь с нами</h1>
        <article className="contacts flex-column">
          <p><strong>Почта:</strong></p>
          <p>museum-omak@yandex.ru</p>
          <br />
          <p><strong>Телефон:</strong></p>
          <p>+7 (495) 682-42-22, доб.2260, Библиотека №147</p>
          <p>+7 (906) 076-38-63, директор музея Кузьмин Георгий Кузьмич</p>
        </article>
      </section>

      <section className="flex-column w-stretch h-center max-width1300">
        <h1>Приходите к нам</h1>
        <article className="adress flex-column">
          <p><strong>Адрес:</strong></p>
          <p>г. Москва, р-н Орехово-Борисово-Южное, Домодедовская ул., д.44</p>
          <br />
          <p><strong>График:</strong></p>
          <p>Вторник - Пятница, с 12:00 до 19:00.</p>
          <br />
          <p><strong>Как добраться:</strong></p>
          <p>
            <ol>
              <li>Доберитесь до метро «Домодедовская», выход №7.</li>
              <li>Сядьте на автобус №858 в направлении «6-й микрорайон Орехово-Борисова» до 3-ей остановки - «Домодедовская улица, 42».</li>
              <li>Пройдите 140 метров вперёд.</li>
              <li>Музей расположен на 1-м этаже жилого дома (ул. Домодедовская, 44) в библиотеке №147 имени С. С. Орлова.</li>
            </ol>
          </p>
          <br />
          <div className="yandex-map card levitate">
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Abbb0e0223513ed5130932b2ab3eeb2f218379afef9c53e95cd456764da6084de&amp;source=constructor" title=" map" frameBorder="0"></iframe>
          </div>
        </article>
      </section>
    </>
  );
}
export default Home;
