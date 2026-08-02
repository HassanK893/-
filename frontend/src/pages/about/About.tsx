import { useState, useEffect } from 'react';
import '../../shared/styles/about.css';
import '../../shared/styles/person.css';
import '../../shared/styles/common.css';

function About() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const setActiveLink = () => {
      const sections = document.querySelectorAll('section');
      let activeSection = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2) {
          activeSection = section.id;
        }
      });
      if (activeSection) setActiveSection(activeSection);
    };

    setActiveLink();
    window.addEventListener('scroll', setActiveLink);
    return () => window.removeEventListener('scroll', setActiveLink);
  }, []);

  return (
    <>
      <nav className="page-nav">
        <a href="#story" className={activeSection === 'story' ? 'active' : ''}>
          История музея
        </a>
        <a
          href="#leaders"
          className={activeSection === 'leaders' ? 'active' : ''}
        >
          Попечительский совет
        </a>
      </nav>

      <main className="flex-column flex-grow">
        <section
          id="story"
          className="flex-column w-stretch h-center max-width1300"
        >
          <h1>История музея</h1>
          <article className="story flex-column">
            <p>
              В мае 2000 года в московской газете «Юг Столицы» вышла заметка
              «Новому тысячелетию – новый музей!», в которой сообщалось о
              подготовке к открытию «Общественного музея авиации и
              космонавтики», о взаимодействии с заинтересованными организациями,
              закупке стеллажей для экспонатов и планах на будущее.
            </p>
            <p>
              <strong>
                Основная цель – популяризация истории отечественной космонавтики
                среди школьников и молодёжи, расширение связей с профильными
                музеями, а также организациями и предприятиями авиационной и
                ракетно-космической отраслями, воспитание патриотизма.
              </strong>
            </p>
            <p>
              Инициатором создания музея были Рубцов Пётр Иванович, гвардии
              полковник авиации в отставке, и районный Совет ветеранов, на
              письма которого об оказании содействия откликнулись районные и
              городские власти, руководители предприятий и организаций,
              ветераны, все неравнодушные.
            </p>
            <p>
              В декабре 1999 – феврале 2000 года провели ремонт помещения для
              музея, был разработан план экспозиции и макет буклета будущего
              музея. 18 января 2000 года П.И. Рубцов передал в дар музею
              тематическую подборку книг, фотографий и модель ракетоносца.
            </p>
            <p>
              «Общественный музей авиации и космонавтики» официально был открыт
              7 декабря 2000 года (в Международный день гражданской авиации) на
              юге Москвы в помещении детской библиотеки №83 (ул. Домодедовская,
              д.44).
            </p>
            <div className="flex-row space-between">
              <img
                className="h-center levitate card"
                src="/images/about/1.jpg"
                alt="Музей"
              />
              <img
                className="h-center levitate card"
                src="/images/about/2.jpg"
                alt="Музей"
              />
            </div>
            <p>
              Музей является органом общественной самодеятельности, работает под
              руководством избранного Попечительского совета, в координации с
              планами Центральной библиотечной системы (ЦБС), Совета ветеранов и
              Управы района Орехово-Борисово Южное (ОБЮ). Сейчас председателем
              попечительского совета музея является Сергей Васильевич Авдеев,
              Герой Российской Федерации, лётчик-космонавт РФ.
            </p>
            <p>
              Музей является подразделением Библиотеки №147 им. С.С. Орлова, и
              его возглавляет со дня открытия Кузьмин Георгий Кузьмич, кандидат
              педагогических наук.
            </p>
            <img
              className="h-center levitate card"
              src="/images/about/4.jpg"
              alt="Музей"
            />
            <p>
              Музей стал привлекателен для посетителей, но особенно - в День
              космонавтики. Об одной из таких встреч, состоявшейся 11 апреля
              2003 г., можно узнать из заметки в районной газете, в которой
              только перечисление гостей вызывает восхищение: районная
              организация ветеранов, Федерация космонавтики России, МИФИ, ЦБС
              №1, управа района Орехово-Борисово Южное, муниципалитет, депутаты
              Госдумы и Московской городской думы, районное отделение партии
              «Единая Россия». Особенным гостем стал в тот день лётчик-космонавт
              СССР, Герой Советского Союза Соловьёв Анатолий Яковлевич, который
              передал в фонды музея фотографии из личного архива, образцы
              космического питания и материалов, используемых для изготовления
              специальной одежды космонавтов. Свой вклад внесли и другие
              дарители – у музея появились красочные буклеты, комплект крупных
              авиамоделей, телескоп.
            </p>
            <img
              className="h-center levitate card"
              src="/images/about/3.jpg"
              alt="Музей"
            />
            <p>
              В ежегодных ключевых мероприятиях музея участвовали
              лётчики-космонавты: Попович П.Р., Горбатко В.В., Соловьёв А.Я.,
              Авдеев С.В., а также космонавты-испытатели Шеффер Ю.П., Бурдаев
              М.Н., заслуженный испытатель авиакосмической техники, средств
              спасения и жизнеобеспечения лётчиков и космонавтов, Герой
              Российской Федерации Костин В.К., заместитель главного
              конструктора проекта НПО им. Лавочкина Белов О.А.. В музее перед
              школьниками выступали академики и профессора МИФИ, другие видные
              учёные-космисты.
            </p>
            <p>
              Среди участников мероприятий Музея - ветераны-авиаторы и
              ракетчики, моряки и танкисты, представители других родов войск,
              генералы и депутаты, руководители района и ЦБС. При их содействии
              школьники и ветераны района дважды посетили Звёздный городок,
              Мемориальный музей космонавтики, Центральный дом авиации и
              космонавтики, Центральный музей вооружённых сил, подмосковные
              музеи в Монино и Кубинке и другие значимые места.
            </p>
            <p>
              Благодаря шефской помощи ряда авиакосмических организаций и
              предприятий, а также дарениям частным лиц музей имеет интересную
              экспозицию с разделами по авиации, космонавтике, астрономии,
              фантастике, истории и патриотическому воспитанию.
            </p>
            <hr />
            <h2>Публикации в СМИ о музее</h2>
            <p>
              <ol>
                <li>
                  Кузьмин Г.К. Новому тысячелетию – новый музей!/ О подготовке к
                  открытию Общественного музея авиации и Космонавтики/ Москва,
                  «Юг Столицы». №14. МАЙ 2000, с.4.
                </li>
                <li>
                  Музей космонавтики. Москва, «Юг Столицы». №32-2000. Выпуск
                  №21-22, с.3.
                </li>
                <li>
                  Колесникова И. Музей принимает гостей. Москва, «Юг Столицы».
                  №07 (107), апрель 2003, с.4.
                </li>
                <li>
                  Кириченко А., Красина Н. Космос – НАШ! Москва, Южный
                  административный округ, «Орехово-Борисово Южное». Апрель 2007,
                  №4, с.3.
                </li>
                <li>
                  Кузьмин Г. Музей авиации и космонавтики. «Инженер-физик»
                  /Газета Национального исследовательского ядерного университета
                  «МИФИ». Москва, №14-15, Октябрь 2010, с.1.
                </li>
                <li>
                  «Созвездие Гагарина». Москва, «Южные горизонты» №7-8, 11-17
                  апреля 2011г., с.16.
                </li>
                <li>
                  Костюк Я.Н., Кузин Г.К. Общественный музей авиации и
                  космонавтики в Москве: люди, события, экспонаты /ХLIX
                  Академические Чтения по космонавтике, посвященные памяти
                  академика С. П. Королёва и других выдающихся отечественных
                  ученых – пионеров освоения космического пространства. Сборник
                  тезисов. 28-31 января 2025. Том 1, с. 388-389.
                </li>
              </ol>
            </p>
            <hr />
            <h2>Экспозиция музея</h2>
            <h2>
              <div className="expo">
                <a href="/images/about/expo1.jpg">
                  <img
                    className="h-center levitate card"
                    src="/images/about/expo1.jpg"
                    alt="Экспозиция"
                  />
                </a>
                <a href="/images/about/expo2.jpg">
                  <img
                    className="h-center levitate card"
                    src="/images/about/expo2.jpg"
                    alt="Экспозиция"
                  />
                </a>
                <a href="/images/about/expo3.jpg">
                  <img
                    className="h-center levitate card"
                    src="/images/about/expo3.jpg"
                    alt="Экспозиция"
                  />
                </a>
                <a href="/images/about/expo4.jpg">
                  <img
                    className="h-center levitate card"
                    src="/images/about/expo4.jpg"
                    alt="Экспозиция"
                  />
                </a>
                <a href="/images/about/expo5.jpg">
                  <img
                    className="h-center levitate card"
                    src="/images/about/expo5.jpg"
                    alt="Экспозиция"
                  />
                </a>
                <a href="/images/about/expo6.jpg">
                  <img
                    className="h-center levitate card"
                    src="/images/about/expo6.jpg"
                    alt="Экспозиция"
                  />
                </a>
                <a href="/images/about/expo7.jpg">
                  <img
                    className="h-center levitate card"
                    src="/images/about/expo7.jpg"
                    alt="Экспозиция"
                  />
                </a>
                <a href="/images/about/expo8.jpg">
                  <img
                    className="h-center levitate card"
                    src="/images/about/expo8.jpg"
                    alt="Экспозиция"
                  />
                </a>
                <a href="/images/about/expo9.jpg">
                  <img
                    className="h-center levitate card"
                    src="/images/about/expo9.jpg"
                    alt="Экспозиция"
                  />
                </a>
                <a href="/images/about/expo10.jpg">
                  <img
                    className="h-center levitate card"
                    src="/images/about/expo10.jpg"
                    alt="Экспозиция"
                  />
                </a>
              </div>
            </h2>
          </article>
        </section>

        <section
          id="leaders"
          className="flex-column w-strech h-center max-width1300"
        >
          <h1> Попечительский совет </h1>
          <article className="card-list flex-column">
            <div className="flex-row flex-wrap flex-center">
              <article className="person flex-column card levitate flex-grow">
                <div className="flex-column flex-center">
                  <h3>Авдеев Сергей Васильевич</h3>
                  <p>Председатель, лётчик-космонавт РФ, герой РФ. </p>
                </div>
              </article>
              <article className="person flex-column card levitate flex-grow">
                <div className="flex-column flex-center">
                  <h3>Блинов Олег Владимирович</h3>
                  <p>Заместитель Председателя, космонавт-испытатель. </p>
                </div>
              </article>
              <article className="person flex-column card levitate flex-grow">
                <div className="flex-column flex-center">
                  <h3>Кузьмин Георгий Кузьмич</h3>
                  <p>
                    Секретарь, директор «Общественного музея авиации и
                    космонавтики».
                  </p>
                </div>
              </article>
              <article className="person flex-column card levitate flex-grow">
                <div className="flex-column flex-center">
                  <h3>Айнуллина Гульнара Шамильевна</h3>
                  <p>
                    Заместитель Главы управы Орехово-Борисово Южное ЮАО г.
                    Москвы по работе с населением.
                  </p>
                </div>
              </article>
              <article className="person flex-column card levitate flex-grow">
                <div className="flex-column flex-center">
                  <h3>Архимандритова Ирина Вячеславовна</h3>
                  <p>
                    Руководитель районного отделения партии «Единая Россия» в
                    Орехово-Борисово Южное ЮАО г. Москвы.
                  </p>
                </div>
              </article>
              <article className="person flex-column card levitate flex-grow">
                <div className="flex-column flex-center">
                  <h3>Костюк Ярослав Николаевич</h3>
                  <p>Ветеран космонавтики. </p>
                </div>
              </article>
              <article className="person flex-column card levitate flex-grow">
                <div className="flex-column flex-center">
                  <h3>Кузнецов Василий Иванович</h3>
                  <p>Генеральный директор Федерации космонавтики России. </p>
                </div>
              </article>
              <article className="person flex-column card levitate flex-grow">
                <div className="flex-column flex-center">
                  <h3>Кузнецов Василий Фёдорович</h3>
                  <p>
                    Член Совета ветеранов Орехово-Борисово Южное ЮАО г. Москвы.
                  </p>
                </div>
              </article>
              <article className="person flex-column card levitate flex-grow">
                <div className="flex-column flex-center">
                  <h3>Мартынова Наталья Андреевна</h3>
                  <p>
                    Преподаватель «Корпоративного университета московского
                    образования», Департамент образования и науки г. Москвы.
                  </p>
                </div>
              </article>
              <article className="person flex-column card levitate flex-grow">
                <div className="flex-column flex-center">
                  <h3>Марусев Александр Сергеевич</h3>
                  <p>
                    Исполнительный директор Ассоциации музеев космонавтики РФ.
                  </p>
                </div>
              </article>
              <article className="person flex-column card levitate flex-grow">
                <div className="flex-column flex-center">
                  <h3>Суров Владимир Сергеевич</h3>
                  <p>
                    Общественный советник Москвы по району Орехово-Борисово
                    Южное.
                  </p>
                </div>
              </article>
              <article className="person flex-column card levitate flex-grow">
                <div className="flex-column flex-center">
                  <h3>Яковлева Светлана Александровна</h3>
                  <p>Руководитель Совета ветеранов Орехово-Борисово Южного. </p>
                </div>
              </article>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
export default About;
