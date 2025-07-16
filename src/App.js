import React from "react";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import PostList from "./components/PostList/PostList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <PostList />
    </div>
  );
}

export default App;
