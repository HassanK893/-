import { useState } from 'react';
import AdminHeader from '../../../features/admin/AdminHeader';
import AddForm from '../../../features/admin/AddForm';
import '../../../shared/styles/common.css';
import '../Admin.css';

const API_URL = 'http://localhost:5000';

function getCategories() {
  return fetch(API_URL + '/category').then((response) => response.json()).then((json) => json.data || []);
}

function createCategory(categoryTitle: string, type: string) {
  return fetch(API_URL + '/category', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ categoryTitle, type }),
  }).then((response) => response.json()).then((json) => json.data);
}

function updateCategory(categoryId: string, categoryTitle: string, type: string) {
  return fetch(API_URL + '/category/' + categoryId, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ categoryTitle, type }),
  }).then((response) => {
    return response.text().then((text) => {
      return text ? JSON.parse(text).data : null;
    });
  });
}

function deleteCategory(categoryId: string) {
  return fetch(API_URL + '/category/' + categoryId, {
    method: 'DELETE',
  }).then((response) => {
    return response.text().then((text) => {
      return text ? JSON.parse(text).data : null;
    });
  });
}

function AdminAdd() {
  const [categories, setCategories] = useState<any>(null);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<any>(null);

  if (categories === null) {
    setCategories(false);
    getCategories().then(setCategories);
  }

  function reload() {
    getCategories().then(setCategories);
  }

  function handleCreateCategory(event: any) {
    event.preventDefault();
    const titleInputElement: any = document.getElementById('newCategoryTitle');
    const typeInputElement: any = document.getElementById('newCategoryType');

    createCategory(titleInputElement.value, typeInputElement.value).then(
      function () {
        setShowNewCategory(false);
        reload();
      },
    );
  }

  function handleEditSave() {
    if (!editingCategory) return;
    const titleInput: any = document.getElementById('editCategoryTitle');
    const typeInput: any = document.getElementById('editCategoryType');

    updateCategory(
      editingCategory.categoryId,
      titleInput.value,
      typeInput.value,
    ).then(function () {
      setEditingCategory(null);
      reload();
    });
  }

  function handleDeleteConfirm() {
    if (!deletingCategoryId) return;
    deleteCategory(deletingCategoryId).then(function () {
      setDeletingCategoryId(null);
      reload();
    });
  }

  if (!categories) return <div>Загрузка...</div>;

  return (
    <div className="flex-column" style={{ minHeight: '100vh' }}>
      <AdminHeader />
      <div className="add-page">
        <h1>Добавить экспонат</h1>

        <div
          style={{
            marginBottom: 30,
            padding: 15,
            background: '#f5f5f5',
            borderRadius: 8,
          }}
        >
          <h3>Категории</h3>

          {categories.map(function (categoryItem: any) {
            if (
              editingCategory &&
              editingCategory.categoryId === categoryItem.categoryId
            ) {
              return (
                <div
                  key={categoryItem.categoryId}
                  style={{
                    marginTop: 10,
                    display: 'flex',
                    gap: 10,
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <label style={{ fontSize: 12 }}>Название</label>
                    <input
                      id="editCategoryTitle"
                      type="text"
                      defaultValue={categoryItem.categoryTitle}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <label style={{ fontSize: 12 }}>Тип</label>
                    <input
                      id="editCategoryType"
                      type="text"
                      defaultValue={categoryItem.type}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div style={{ alignSelf: 'flex-end' }}>
                    <button onClick={handleEditSave}>Сохранить</button>
                    <button
                      onClick={function () {
                        setEditingCategory(null);
                      }}
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={categoryItem.categoryId}
                style={{
                  marginTop: 10,
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <span>
                  {categoryItem.categoryTitle} (
                  <small>#{categoryItem.type}</small>)
                </span>
                <button
                  onClick={function () {
                    setEditingCategory(categoryItem);
                  }}
                >
                  Изменить
                </button>
                <button
                  onClick={function () {
                    setDeletingCategoryId(categoryItem.categoryId);
                  }}
                  style={{ color: 'red' }}
                >
                  Удалить
                </button>
              </div>
            );
          })}

          {showNewCategory ? (
            <form
              onSubmit={handleCreateCategory}
              style={{
                marginTop: 15,
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: 1, minWidth: 150 }}>
                <label style={{ fontSize: 12 }}>Название</label>
                <input
                  id="newCategoryTitle"
                  name="title"
                  type="text"
                  required
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 150 }}>
                <label style={{ fontSize: 12 }}>Тип</label>
                <input
                  id="newCategoryType"
                  name="type"
                  type="text"
                  required
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ alignSelf: 'flex-end' }}>
                <button type="submit">Создать</button>
                <button
                  type="button"
                  onClick={function () {
                    setShowNewCategory(false);
                  }}
                >
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={function () {
                setShowNewCategory(true);
              }}
              style={{ marginTop: 15 }}
            >
              + Новая категория
            </button>
          )}
        </div>

        <AddForm categories={categories} onSuccess={reload} />
      </div>

      {deletingCategoryId && (
        <div
          className="admin-modal"
          onClick={function () {
            setDeletingCategoryId(null);
          }}
        >
          <div
            className="admin-modal-content"
            onClick={function (event) {
              event.stopPropagation();
            }}
          >
            <p>Удалить категорию?</p>
            <button onClick={handleDeleteConfirm} style={{ color: 'red' }}>
              Да
            </button>
            <button
              onClick={function () {
                setDeletingCategoryId(null);
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAdd;
