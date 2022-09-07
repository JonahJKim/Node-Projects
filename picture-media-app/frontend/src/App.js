import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users/>} exact></Route>
          <Route path="/:userId/places" element={<UserPlaces />}></Route>
          <Route path="/places/new" element={<NewPlace/>} exact></Route>
          <Route path="*" element={<Navigate to='/'/>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
