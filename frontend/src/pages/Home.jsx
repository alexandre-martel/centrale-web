import {useState, useEffect, use} from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";


function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchNotes();
    }, []);
    
    const fetchNotes = async () => {
        try {
            const response = await api.get("/api/notes/");
            setNotes(response.data);
            console.log("Fetched notes:", response.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const deleteNote = async (id) => {
        try {
            const response = await api.delete(`/api/notes/delete/${id}/`);
            if (response.status === 204) {
                setNotes(notes.filter(note => note.id !== id));
                console.log("Note deleted:", id);
            } else {
                console.error("Error deleting note:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };
    
    const createNote = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/notes/", {
                content,
                title,
            });
            if (response.status === 201) {
                setNotes([...notes, response.data]);
                setTitle("");
                setContent("");
                console.log("Note created:", response.data);
            } else {
                console.error("Error creating note:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating note:", error);
        }
    }
    

    return (
    <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br />
            <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor="content">Content:</label>
            <br />
            <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />
            <input type="submit" value="Submit"></input>
        </form>
    </div>
    )
}

export default Home;