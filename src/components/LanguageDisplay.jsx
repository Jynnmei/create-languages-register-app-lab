import React, { useEffect, useRef, useState } from "react";
import Languages from "./Languages";

const LanguageDisplay = () => {
  const [languages, setLanguages] = useState([]);
  const languageRef = useRef();
  const createdAtRef = useRef();

  const getData = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages");

      if (res.ok) {
        const data = await res.json();
        setLanguages(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addLanguage = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: languageRef.current.value,
        created_at: createdAtRef.current.value,
      }),
    });

    if (res.ok) {
      getData();
      languageRef.current.value = "";
      createdAtRef.current.value = "";
    } else {
      alert("an error has occurred");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h1>Language Type</h1>
      <div className="row">
        <input
          type="text"
          ref={languageRef}
          placeholder="language"
          className="col-md-3"
        ></input>
        <input
          type="text"
          ref={createdAtRef}
          placeholder="created-at"
          className="col-md-3"
        ></input>
        <button className="col-md-3" onClick={addLanguage}>
          add
        </button>
      </div>

      <div className="row">
        <div className="col-md-3">
          <strong>Language</strong>
        </div>
        <div className="col-md-3">
          <strong>Created at</strong>
        </div>
      </div>

      {languages.map((item, index) => (
        <Languages
          key={index}
          language={item.language}
          createdAt={item.created_at}
          getData={getData}
        />
      ))}
    </div>
  );
};

export default LanguageDisplay;
