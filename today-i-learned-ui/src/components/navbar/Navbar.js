import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

/**
 * @name Navbar
 * @description Displays the navigation bar. This page will appear
 * at the top of every page on the website.
 * @return component
 */
function Navbar() {
  return (
    <div>
      <section className={styles.navbar}>
        <div className={styles.navlink}>
          <NavLink to="/why" activeClassName={styles.active}>
            <h3>Why Spaced Repetition?</h3>
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
