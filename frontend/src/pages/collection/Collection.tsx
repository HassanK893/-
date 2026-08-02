import { useState, useEffect } from 'react';
import '../../shared/styles/cards.css';

const API_URL = 'http://localhost:5000';

function getCategories() {
  return fetch(API_URL + '/category').then((response) => response.json()).then((json) => json.data || []);
}

function getCategoryById(categoryId: string) {
  return fetch(API_URL + '/category/' + categoryId).then((response) => response.json()).then((json) => json.data || []);
}

function Collection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    getCategories().then((cats) => {
      if (cats.length === 0) {
        setLoading(false);
        return;
      }
      const results = [];
      let i = 0;
      const next = () => {
        if (i >= cats.length) {
          setData(results);
          setLoading(false);
          return;
        }
        getCategoryById(cats[i].categoryId).then((d) => {
          results.push({ category: cats[i], cards: d.cards || [] });
          i++;
          next();
        });
      };
      next();
    });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const onScroll = () => {
      for (let i = data.length - 1; i >= 0; i--) {
        const el = document.getElementById(data[i].category.type);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(data[i].category.type);
          return;
        }
      }
      setActiveSection(data[0].category.type);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [data]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <>
      <nav className="page-nav">
        {data.map((item) => (
          <a
            key={item.category.categoryId}
            href={'#' + item.category.type}
            className={activeSection === item.category.type ? 'active' : ''}
          >
            {item.category.categoryTitle}
          </a>
        ))}
      </nav>
      {data.map((item) => (
        <section key={item.category.categoryId} id={item.category.type}>
          <h1>{item.category.categoryTitle}</h1>
          <div className="card-list">
            {item.cards.map((card) => (
              <article
                key={card.cardId}
                className="card collection-item vertical-card levitate flex-column"
              >
                <a href={card.link || '#'}>
                  {card.imageSrc ? (
                    <img src={API_URL + '/uploads/' + card.imageSrc} alt="" />
                  ) : (
                    <div style={{ height: 180, background: '#ccc' }}>
                      Нет фото
                    </div>
                  )}
                </a>
                <div className="content">
                  <h3>
                    <strong>{card.cardTitle}</strong>
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

export default Collection;
