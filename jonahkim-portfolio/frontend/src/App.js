import { Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "./sections/pages/Home";
import Projects from "./sections/pages/Projects";
import Education from "./sections/pages/Education";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/projects' element={<Projects />} />
      <Route path='/education' element={<Education />} />
    </Routes>
  );
}

export default App;



// home page - introduction (interests, etc) - resume? serve up using express
// projects page
// Education Details Page (UCLA, courses, certificates)

