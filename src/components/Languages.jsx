import React from "react";

const Languages = (props) => {
  const deleteLanguages = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/languages/" + props.language,
      { method: "DELETE" }
    );

    if (res.ok) {
      props.getData();
    } else {
      alert("Language delete failed");
    }
  };
  return (
    <div className="row">
      <div className="col-sm-3">{props.language}</div>
      <div className="col-sm-3">{props.created_at}</div>
      <button className="col-sm-2" onClick={deleteLanguages}>
        delete
      </button>
    </div>
  );
};

export default Languages;
