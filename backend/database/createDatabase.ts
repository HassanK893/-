import { sqlRun } from '../src/utils/dbFunctions/dbConnection.js';

class createTables {
  async init() {

    await sqlRun('PRAGMA foreign_keys = ON;');

    await this.createCategoryTable();
    await this.createCardsTable();
  }

  private async createCardsTable(): Promise<void> {
    try {
      await sqlRun(`
            CREATE TABLE IF NOT EXISTS cards (
    card_id TEXT PRIMARY KEY NOT NULL,
    cardTitle TEXT NOT NULL,
    ref_category_id TEXT NOT NULL,
    image_src TEXT,
    description TEXT,
    link TEXT,
    event_date DATE,
    FOREIGN KEY (ref_category_id) REFERENCES category(category_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
      
            `);
    } catch (err) {
      console.error(
        `В момент создания таблицы карточки произошла ошибка: ${err}`,
      );
    }
  }

  private async createCategoryTable(): Promise<void> {
    try {
      await sqlRun(`CREATE TABLE IF NOT EXISTS category
            (
            category_id TEXT PRIMARY KEY  ,
            title TEXT NOT NULL,
            type TEXT NOT NULL
            )
            `);
    } catch (err) {
      console.error(
        `В момент создания таблицы категории произошла ошибка: ${err}`,
      );
    }
  }
}
export default createTables;
