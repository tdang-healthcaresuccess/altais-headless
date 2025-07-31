import { gql } from "@apollo/client";
import Link from "next/link";
import style from "../styles/header.module.css";

export default function Header({ siteTitle, siteDescription, menuItems }) {
  // Limit to 7 menu items
  const displayedMenuItems = Array.isArray(menuItems) ? menuItems.slice(0, 7) : [];
  return (
    <header className={style.header}>
      <div className={`container ${style.container}`}>
        {/* Logo on the left */}
        <Link href="/" className={style.logo}>
          
        </Link>

        {/* Site title and description */}
        <div className={style.brand}>
          <h2 className={style.siteTitle}>{siteTitle}</h2>
          <p className={style.siteDescription}>{siteDescription}</p>
        </div>

        {/* Navigation menu */}
        <nav className={style.nav}>
          <ul className={style.menuList}>
            {displayedMenuItems.map((item) => (
              <li key={item.id}>
                <Link href={item.uri}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side buttons */}
        <div className={style.actions}>
          <Link href="/find-care">
            <button className={style.findCareBtn}>Find Care</button>
          </Link>
          <button className={style.searchBtn} aria-label="Search">
            {/* Simple magnifier icon SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

Header.fragments = {
  entry: gql`
    fragment HeaderFragment on RootQuery {
      generalSettings {
        title
        description
      }
      primaryMenuItems: menuItems(where: { location: PRIMARY }) {
        nodes {
          id
          uri
          path
          label
          parentId
          cssClasses
          menu {
            node {
              name
            }
          }
        }
      }
    }
  `,
};
