import "../../shared/styles/contacts.css";

function Contacts() {
  return (
    <>
      <section className="flex-column w-stretch h-center max-width1300">
        <h1>Свяжитесь с нами</h1>
        <article className="contacts flex-column">
          <p><strong>Почта:</strong></p>
          <p>museum-omak@yandex.ru</p>
          <br />
          <p><strong>Телефон:</strong></p>
          <p>+7 (495) 682-42-22, доб.2260, Библиотека 147</p>
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
          <ol>
            <li>Доберитесь до метро Домодедовская, выход 7.</li>
            <li>Сядьте на автобус 858 до остановки Домодедовская улица 42.</li>
            <li>Пройдите 140 метров вперёд.</li>
            <li>Музей расположен на 1-м этаже в библиотеке 147.</li>
          </ol>
        </article>
      </section>
      <div className="yandex-map card levitate">
        <iframe title="Яндекс.Карта" src="https://yandex.ru/map-widget/v1/?um=constructor%3Abbb0e0223513ed5130932b2ab3eeb2f218379afef9c53e95cd456764da6084de&amp;source=constructor" frameBorder="0"></iframe>
      </div>
    </>
  );
}
export default Contacts;
