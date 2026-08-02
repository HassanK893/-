import { useState } from "react";

const API_URL = 'http://localhost:5000';

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

function EditList({ categoryData, onRefresh }: { categoryData: any[]; onRefresh: () => void }) {
  var [editCard, setEditCard] = useState<any>(null);
  var [deleteCardItem, setDeleteCardItem] = useState<any>(null);

  function findCategoryByCard(cardId: string) {
    return categoryData.find( (item) => {
      return item.cards.find(function (card: any) {
        return card.cardId === cardId;
      });
    });
  }

  var allCards: any[] = [];
  for (var catIndex = 0; catIndex < categoryData.length; catIndex++) {
    var cards = categoryData[catIndex].cards;
    for (var cardIndex = 0; cardIndex < cards.length; cardIndex++) {
      allCards.push(cards[cardIndex]);
    }
  }

  function handleSave(event) {
    event.preventDefault();
    if (!editCard) return;
    var category = findCategoryByCard(editCard.cardId);
    if (!category) return;
    updateCard(category.category.categoryId, editCard.cardId, new FormData(event.target)).then(function () {
      setEditCard(null);
      onRefresh();
    });
  }

  function handleDelete() {
    if (!deleteCardItem) return;
    var category = findCategoryByCard(deleteCardItem.cardId);
    if (!category) return;
    deleteCard(category.category.categoryId, deleteCardItem.cardId).then(() => {
      setDeleteCardItem(null);
      onRefresh();
    });
  }

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {allCards.map((card) =>{
          return (
            <article key={card.cardId} style={{ width: 200, border: "1px solid #ccc", borderRadius: 8, overflow: "hidden" }}>
              {card.imageSrc
                ? <img src={API_URL + "/uploads/" + card.imageSrc} style={{ width: "100%", height: 150, objectFit: "cover" }} alt={card.cardTitle} />
                : <div style={{ height: 150, background: "#eee" }}>Нет фото</div>}
              <div style={{ padding: 10 }}>
                <h3>{card.cardTitle}</h3>
                <button onClick={ () => { setEditCard(card); }}>Изменить</button>
                <button onClick={ () => { setDeleteCardItem(card); }}>Удалить</button>
              </div>
            </article>
          );
        })}
      </div>

      {editCard && (
        <div className="admin-modal" onClick={ () => { setEditCard(null); }}>
          <div className="admin-modal-content" onClick={ (event) => { event.stopPropagation(); }}>
            <form onSubmit={handleSave}>
              <label>Название</label>
              <input name="cardTitle" defaultValue={editCard.cardTitle} required />
              <label>Описание</label>
              <textarea name="description" defaultValue={editCard.description || ""} />
              <label>Ссылка</label>
              <input name="link" defaultValue={editCard.link || ""} />
              <button type="submit">Сохранить</button>
              <button type="button" onClick={ () => { setEditCard(null); }}>Отмена</button>
            </form>
          </div>
        </div>
      )}

      {deleteCardItem && (
        <div className="admin-modal" onClick={function () { setDeleteCardItem(null); }}>
          <div className="admin-modal-content" onClick={function (event) { event.stopPropagation(); }}>
            <p>Удалить {deleteCardItem.cardTitle}?</p>
            <button onClick={handleDelete}>Да</button>
            <button onClick={function () { setDeleteCardItem(null); }}>Отмена</button>
          </div>
        </div>
      )}
    </>
  );
}

export default EditList;