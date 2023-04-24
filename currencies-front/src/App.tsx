import React from "react";
import Header from "./components/header";
import Nav from "./components/nav";

function App() {
  return (
    <div className="flex flex-col min-h-screen text-center bg-white dark:bg-gray-700">
      <Nav />
      <Header />
    </div>
  );
}

export default App;
