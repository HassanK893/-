import { useState, useEffect } from 'react';
import AdminHeader from '../../../features/admin/AdminHeader';
import '../../../shared/styles/cards.css';
import '../Admin.css';

const API_URL = 'http://localhost:5000';

function getCategories() {
  return fetch(API_URL + '/category').then((response) => response.json()).then((json) => json.data || []);
}

function getCategoryById(categoryId: string) {
  return fetch(API_URL + '/category/' + categoryId).then((response) => response.json()).then((json) => json.data || []);
}

function updateCard(categoryId: string, cardId: string, formData: FormData) {
  return fetch(API_URL + '/category/' + categoryId + '/cards/' + cardId, {
    method: 'PUT',
    body: formData,
  }).then((response) => {
    return response.text().then((text) => {
      return text ? JSON.parse(text).data : null;
    });
  });
}

function deleteCard(categoryId: string, cardId: string) {
  return fetch(API_URL + '/category/' + categoryId + '/cards/' + cardId, {
    method: 'DELETE',
  }).then((response) => {
    return response.text().then((text) => {
      return text ? JSON.parse(text).data : null;
    });
  });
}

function AdminEdit() {
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [editCard, setEditCard] = useState<any>(null);
  const [deleteCardItem, setDeleteCardItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    getCategories().then((categoriesList: any[]) => {
      if (categoriesList.length === 0) {
        setCategoriesData([]);
        setLoadingStatus(false);
        return;
      }
      const resultsArray: any[] = [];
      let pendingRequests = categoriesList.length;
      for (
        let categoryIndex = 0;
        categoryIndex < categoriesList.length;
        categoryIndex++
      ) {
        getCategoryById(categoriesList[categoryIndex].categoryId).then(
          (categoryDataResponse: any) => {
            resultsArray.push({
              category: categoriesList[categoryIndex],
              cards: categoryDataResponse.cards || [],
            });
            pendingRequests--;
            if (pendingRequests === 0) {
              setCategoriesData(resultsArray);
              setLoadingStatus(false);
            }
          },
        );
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sectionsList = document.querySelectorAll('section[id]');
      let currentSectionId = '';
      sectionsList.forEach((sectionElement) => {
        const elementRect = sectionElement.getBoundingClientRect();
        if (elementRect.top < window.innerHeight / 2) {
          currentSectionId = sectionElement.id;
        }
      });
      if (currentSectionId) {
        setActiveSection(currentSectionId);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categoriesData]);

  const reload = () => {
    getCategories().then((categoriesList: any[]) => {
      if (categoriesList.length === 0) {
        setCategoriesData([]);
        return;
      }
      const resultsArray: any[] = [];
      let pendingRequests = categoriesList.length;
      for (
        let categoryIndex = 0;
        categoryIndex < categoriesList.length;
        categoryIndex++
      ) {
        getCategoryById(categoriesList[categoryIndex].categoryId).then(
          (categoryDataResponse: any) => {
            resultsArray.push({
              category: categoriesList[categoryIndex],
              cards: categoryDataResponse.cards || [],
            });
            pendingRequests--;
            if (pendingRequests === 0) {
              setCategoriesData(resultsArray);
            }
          },
        );
      }
    });
  };

  const handleSave = (event: any) => {
    event.preventDefault();
    if (!editCard) return;

    let targetCategoryGroup: any = null;
    for (let groupIndex = 0; groupIndex < categoriesData.length; groupIndex++) {
      const currentGroup = categoriesData[groupIndex];
      let containsCard = false;
      for (
        let cardIndex = 0;
        cardIndex < currentGroup.cards.length;
        cardIndex++
      ) {
        if (currentGroup.cards[cardIndex].cardId === editCard.cardId) {
          containsCard = true;
          break;
        }
      }
      if (containsCard) {
        targetCategoryGroup = currentGroup;
        break;
      }
    }

    if (!targetCategoryGroup) return;

    const titleInputElement: any =
      document.getElementById('editCardTitleInput');
    const descriptionInputElement: any = document.getElementById(
      'editCardDescriptionInput',
    );
    const linkInputElement: any = document.getElementById('editCardLinkInput');
    const FormDataType = FormData;
    const cardUpdatePayload = new FormDataType();
    cardUpdatePayload.append('cardTitle', titleInputElement.value);
    cardUpdatePayload.append('description', descriptionInputElement.value);
    cardUpdatePayload.append('link', linkInputElement.value);

    updateCard(
      targetCategoryGroup.category.categoryId,
      editCard.cardId,
      cardUpdatePayload,
    ).then(() => {
      setEditCard(null);
      reload();
    });
  };

  const handleDelete = () => {
    if (!deleteCardItem) return;

    let targetCategoryGroup: any = null;
    for (let groupIndex = 0; groupIndex < categoriesData.length; groupIndex++) {
      const currentGroup = categoriesData[groupIndex];
      let containsCard = false;
      for (
        let cardIndex = 0;
        cardIndex < currentGroup.cards.length;
        cardIndex++
      ) {
        if (currentGroup.cards[cardIndex].cardId === deleteCardItem.cardId) {
          containsCard = true;
          break;
        }
      }
      if (containsCard) {
        targetCategoryGroup = currentGroup;
        break;
      }
    }

    if (!targetCategoryGroup) return;

    deleteCard(
      targetCategoryGroup.category.categoryId,
      deleteCardItem.cardId,
    ).then(() => {
      setDeleteCardItem(null);
      reload();
    });
  };

  const filteredCategoriesData = categoriesData
    .map((categoryGroup) => {
      let matchingCards = categoryGroup.cards;
      if (searchQuery) {
        matchingCards = categoryGroup.cards.filter((cardItem: any) => {
          if (!cardItem.cardTitle) return false;
          const lowerCardTitle = cardItem.cardTitle.toLowerCase();
          const lowerSearchQuery = searchQuery.toLowerCase();
          return lowerCardTitle.indexOf(lowerSearchQuery) !== -1;
        });
      }
      return {
        category: categoryGroup.category,
        cards: matchingCards,
      };
    })
    .filter((categoryGroup) => categoryGroup.cards.length > 0);

  if (loadingStatus)
    return (
      <div>
        <AdminHeader />
        <div style={{ padding: 40, textAlign: 'center' }}>Загрузка...</div>
      </div>
    );

  return (
    <div>
      <AdminHeader />
      <nav className="page-nav">
        {categoriesData.map((categoryGroup) => (
          <a
            key={categoryGroup.category.categoryId}
            href={'#' + categoryGroup.category.type}
            className={
              activeSection === categoryGroup.category.type ? 'active' : ''
            }
          >
            {categoryGroup.category.categoryTitle}
          </a>
        ))}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            onClick={() => setSearchOpen(!searchOpen)}
            title="Поиск"
            style={{
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              transition: 'background 0.2s',
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="white"
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </div>
          {searchOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: 'white',
                padding: '12px',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                border: '1px solid var(--border-color)',
                minWidth: '250px',
                zIndex: 100,
              }}
            >
              <input
                type="text"
                placeholder="Поиск по коллекции..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid var(--border-color)',
                  borderRadius: '6px',
                  fontSize: '11pt',
                  background: 'white',
                  color: 'var(--text-color)',
                }}
              />
            </div>
          )}
        </div>
      </nav>
      {filteredCategoriesData.map((categoryGroup) => (
        <section
          key={categoryGroup.category.categoryId}
          id={categoryGroup.category.type}
        >
          <h2
            style={{
              padding: '40px 20px 20px',
              color: 'var(--accent-color)',
              textAlign: 'center',
            }}
          >
            {categoryGroup.category.categoryTitle}
          </h2>
          <div className="card-list">
            {categoryGroup.cards.map((cardItem: any) => (
              <div key={cardItem.cardId} className="admin-card">
                {cardItem.imageSrc ? (
                  <img src={API_URL + '/uploads/' + cardItem.imageSrc} alt="" />
                ) : (
                  <div style={{ height: 150, background: '#eee' }}>
                    Нет фото
                  </div>
                )}
                <div className="admin-card-content">
                  <h4>{cardItem.cardTitle}</h4>
                  <div className="admin-card-buttons">
                    <button
                      className="admin-btn admin-btn-edit"
                      onClick={() => setEditCard(cardItem)}
                    >
                      Изменить
                    </button>
                    <button
                      className="admin-btn admin-btn-delete"
                      onClick={() => setDeleteCardItem(cardItem)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {editCard && (
        <div className="admin-modal" onClick={() => setEditCard(null)}>
          <div
            className="admin-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <h3>Редактировать</h3>
            <form onSubmit={handleSave}>
              <label>Название</label>
              <input
                id="editCardTitleInput"
                name="cardTitle"
                defaultValue={editCard.cardTitle}
                required
              />
              <label>Описание</label>
              <textarea
                id="editCardDescriptionInput"
                name="description"
                defaultValue={editCard.description || ''}
              />
              <label>Ссылка</label>
              <input
                id="editCardLinkInput"
                name="link"
                defaultValue={editCard.link || ''}
              />
              <div className="admin-modal-buttons">
                <button type="submit" className="admin-btn admin-btn-edit">
                  Сохранить
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-cancel"
                  onClick={() => setEditCard(null)}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteCardItem && (
        <div className="admin-modal" onClick={() => setDeleteCardItem(null)}>
          <div
            className="admin-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <p>
              Удалить <strong>{deleteCardItem.cardTitle}</strong>?
            </p>
            <div className="admin-modal-buttons">
              <button
                className="admin-btn admin-btn-delete"
                onClick={handleDelete}
              >
                Да
              </button>
              <button
                className="admin-btn admin-btn-cancel"
                onClick={() => setDeleteCardItem(null)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEdit;
