import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Moment from "react-moment";
import NotesService from "../services/NotesService";

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentNote, setCurrentNote] = useState("");

  useEffect(() => {
    NotesService.get(id)
      .then((response) => {
        setCurrentNote(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  }, []);

  const handleEdit = () => {
    navigate(`/notes/edit/${id}`);
  };

  const handleDelete = () => {
    NotesService.remove(id)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  return (
    <div className="note-details main-content">
      {currentNote && (
        <div>
          <article>
            <h5 className="text-capitalize primary-color">
              {currentNote.title}
            </h5>
            <div className="mb-3 font-italic metadata">
              <Moment fromNow>{currentNote.updatedAt}</Moment>
              <span className="text-capitalize">, {currentNote.category}</span>
            </div>
            <div className="mb-3">{currentNote.body}</div>
          </article>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete} className="ml-3">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteDetails;
