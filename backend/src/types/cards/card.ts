interface Card {
  cardId: string;
  cardTitle: string;
  imageSrc: string | null;
  description: string | null;
  link: string | null;
  event_date: string | null;
  refCategoryId: string;
};

export default Card