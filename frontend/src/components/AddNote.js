import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotesService from "../services/NotesService";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("programming");
  const [errors, setError] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const saveNote = (e) => {
    e.preventDefault();
    if (!title || !body) {
      setError(true);
      return;
    }
    const note = { id, title, body, category };
    if (id) {
      // call service update method
      NotesService.update(note)
        .then((response) => {
          console.log("Note updated successfully", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    } else {
      // call service create method
      NotesService.create(note)
        .then((response) => {
          console.log("Note added successfully", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      NotesService.get(id)
        .then((response) => {
          setTitle(response.data.title);
          setBody(response.data.body);
          setCategory(response.data.category);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  }, []);

  return (
    <div className="create">
      <div className="text-center">
        <h5>{id ? "Update a Note" : "Add a new Note"}</h5>
        {errors && (
          <span style={{ color: "red", fontStyle: "italic" }}>
            Please enter the mandatory fields
          </span>
        )}
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="title">
            Note Title: <sup>*</sup>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">
            Note Description: <sup>*</sup>
          </label>
          <textarea
            className="form-control"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">
            Note Category: <sup>*</sup>
          </label>
          <select
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="programming">Programming</option>
            <option value="vacation">Vacation</option>
            <option value="meeting">Meeting</option>
            <option value="blogging">Blogging</option>
          </select>
        </div>

        <div className="text-center">
          <button onClick={saveNote}>{id ? "Update Note" : "Add Note"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
