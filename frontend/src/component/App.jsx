import React from "react";
import { BrowserRouter ,Routes , Route } from "react-router-dom";
import Home from "./Home"
import Login from "./Login"
import NotFoundPage from "./NotFound";
import Register from "./Register";
import PrivateRoute from "../Routing/PrivateRoute";
import Post from "./Post";
import HomePage from "./HomePage"
import { ToastContainer, toast } from 'react-toastify';
import FindPeople from "./FindPeople";
import Profile from "./Profile";
import EditProfile from './EditProfile'

import Join from './Join'

import { HashRouter } from 'react-router-dom'

const App = () => {
  
  return (
    <>
   <ToastContainer />
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/" element={<Login />} />
=======
        <Route path="/" element={<Home/>} />
>>>>>>> 9a4abe8a2d5dfee95913f4db632c5b15fc8850db
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Routes>
<<<<<<< HEAD
          <Route path="/home" element={<HomePage />} />
=======
          <Route path="/s" element={<HomePage />} />
>>>>>>> 9a4abe8a2d5dfee95913f4db632c5b15fc8850db
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/user/edit/:id" element={<EditProfile />} />
          <Route path="/chat/join" element={<Join />} />
          <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>

    </>
  );
}

const Public = () => <div>public</div>;
const Private = () => <div>private</div>;


export default App;