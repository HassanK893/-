import { NavLink } from 'react-router-dom';
import '../styles/header.css';

const pages = [
  { path: '/', label: 'Главная' },
  { path: '/about', label: 'О нас' },
  { path: '/collection', label: 'Коллекция' },
  { path: '/contacts', label: 'Контакты' },
];

function Header() {
  return (
    <>
      <header>
        <nav>
          {pages.map((page) => {
            return (
              <NavLink key={page.path} to={page.path}>
                {page.label}
              </NavLink>
            );
          })}
        </nav>
        <h1>
          Общественный музей <br /> <strong>авиации и космонавтики</strong>
        </h1>
      </header>
    </>
  );
}

export default Header;
