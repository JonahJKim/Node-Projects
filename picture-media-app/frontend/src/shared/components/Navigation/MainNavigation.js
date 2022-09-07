import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import MainHeader from './MainHeader';
import './MainNavigation.css';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => setDrawerIsOpen(true)
  const closeDrawerHandler = () => setDrawerIsOpen(false)

  return (
    <React.Fragment>
      {drawerIsOpen ? <Backdrop onClick={closeDrawerHandler} /> : null}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
