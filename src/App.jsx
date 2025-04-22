import React from "react";
import UserLanguagesDisplay from "./components/UserLanguagesDisplay";
import LanguageDisplay from "./components/LanguageDisplay";
import UsersDisplay from "./components/UsersDisplay";

function App() {
  return (
    <>
      <LanguageDisplay />
      <UsersDisplay />
      <UserLanguagesDisplay />
    </>
  );
}

export default App;
