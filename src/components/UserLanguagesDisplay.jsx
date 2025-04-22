import React, { useEffect, useState } from "react";
import UserLanguagesDel from "./UserLanguagesDel";

const UserLanguagesDisplay = () => {
  const [userLanguages, setUserLanguages] = useState([]);
  const [userId, setUserId] = useState("");
  const [language, setLanguage] = useState("");

  const getData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/lab/users/languages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("API Response: ", data);
        setUserLanguages(data);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
  };

  const addUserLanguages = async () => {
    if (!userId || !language) {
      alert("Please provide both user ID and language.");
      return;
    }

    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          language: language,
        }),
      }
    );

    const result = await res.json();
    console.log("Add response:", result);

    if (res.ok) {
      getData();
      setLanguage("");
    } else {
      console.log("Error:", result);
      alert("an error has occurred");
    }
  };

  useEffect(() => {
    if (userId) {
      getData();
    }
  }, [userId]);

  return (
    <>
      <div className="container">
        <h1>User Language</h1>

        <div className="row">
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
            className="col-md-3"
          />

          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Language"
            className="col-md-3"
          />
          <button className="col-md-3" onClick={addUserLanguages}>
            Add
          </button>

          {userLanguages.map((language, index) => (
            <UserLanguagesDel
              key={index}
              languages={language}
              userId={userId}
              getData={getData}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserLanguagesDisplay;
