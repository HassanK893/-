const API_URL = 'http://localhost:5000';

function createCard(categoryId: string, formData: FormData) {
  return fetch(API_URL + '/category/' + categoryId + '/cards', {
    method: 'POST',
    body: formData,
  }).then((response) => response.json()).then((json) => json.data);
}

function AddForm({
  categories,
  onSuccess,
}: {
  categories: any[];
  onSuccess?: () => void;
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const categoryId = (formData.get('categoryId') as string) || '';
    formData.set('refCategoryId', categoryId);
    formData.delete('categoryId');
    const file = formData.get('myFile') as File | null;
    if (file && file.name) formData.set('imageSrc', 'placeholder');
    createCard(categoryId, formData).then(function () {
      form.reset();
      if (onSuccess) onSuccess();
    });
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label>Название экспоната *</label>
      <input
        type="text"
        name="cardTitle"
        required
        placeholder="Введите название"
      />
      <label>Категория *</label>
      <select name="categoryId" required>
        <option value="">Выберите категорию</option>
        {categories.map( (cat)=> {
          return (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryTitle}
            </option>
          );
        })}
      </select>
      <label>Изображение</label>
      <input type="file" name="myFile" accept="image/*" />
      <label>Описание</label>
      <textarea name="description" placeholder="Необязательно" />
      <label>Событие</label>
      <input type="text" name="link" placeholder="Необязательно" />
      <button type="submit" className="submit-btn">
        Добавить экспонат
      </button>
    </form>
  );
}

export default AddForm;
