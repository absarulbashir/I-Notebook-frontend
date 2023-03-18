import { useContext, useState, useEffect } from "react";
import { Context } from "./context";
import Loading from "./Loading.gif";

export default function NotesArea() {
  const context = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [descAlert, setDescAlert] = useState("");
  const [data, setData] = useState(context.data);
  const localSt = JSON.parse(localStorage.getItem("detail"));

  useEffect(() => {
    if (localSt) {
      context.login(localSt.email, atob(localSt.password));
    }
  }, []);

  useEffect(() => {
    setData(context.data);
  }, [context.data]);

  const fillTitle = (event) => {
    setTitle(event.target.value);
  };

  const fillDesc = (event) => {
    setDesc(event.target.value);
  };

  const addNote = () => {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();
    if (desc.length < 1) {
      setDescAlert("Please add a description");
    } else if (context.email.length < 1) {
      setData(
        data.concat([
          { title: title, description: desc, date: `${date}/${month}/${year}` },
        ])
      );
      setTitle("");
      setDesc("");
    } else {
      context.addNote(title, desc, context.email, context.password);
      setData(
        data.concat([
          { title: title, description: desc, date: `${date}/${month}/${year}` },
        ])
      );
      setTitle("");
      setDesc("");
    }
  };

  if (localSt && context.islogin === false) {
    return <img src={Loading} alt="Loading..." className="loader" />;
  } else {
  }

  return (
    <>
      <div className="NotesCont">
        <div className="container">
          <input
            type="text"
            value={title}
            onChange={fillTitle}
            placeholder="Enter a title"
          />

          <textarea
            value={desc}
            onChange={fillDesc}
            placeholder="Enter a description"
          />
          <button className="logBtn" onClick={addNote}>
            Add Note
          </button>
        </div>
      </div>

      <div className="notesContainer">
        {data.map((el, index) => {
          return (
            <div className="notes" key={index}>
              <div>
                <p>{el.date}</p>
                <button
                  style={{ border: "none", background: "none" }}
                  onClick={() => {
                    if (context.email.length < 12) {
                      const newData = data.filter((el, ind) => {
                        return index !== ind;
                      });
                      setData(newData);
                    } else {
                      context.deleteNote(
                        context.email,
                        context.password,
                        index
                      );
                      const newData = data.filter((el, ind) => {
                        return index !== ind;
                      });
                      setData(newData);
                    }
                  }}
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
              <h2>{el.title}</h2>
              <p>{el.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
