import Note from "../Components/Note"
import NoteEditor from "../Components/NoteEditor"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import React from "react"
import { FaThLarge, FaThList } from "react-icons/fa"
import { getNotes, deleteNote, reset } from "../features/notes/notesSlice"

const emptyNote = {
  title: "",
  text: "",
  labels: [],
}

const Dashboard = () => {
  const dispatch = useDispatch()

  const [editorOpen, setEditorOpen] = useState(false)
  const [editNote, setEditNote] = useState(emptyNote)
  const [viewMode, setViewMode] = useState("grid")
  const { notes, isLoading, isSuccess, isError, message } = useSelector(state => state.notes)
  const { user } = useSelector(state => state.auth)

  const onNewNote = () => {
    setEditNote(emptyNote)
    setEditorOpen(!editorOpen)
  }

  const onDeleteNote = id => {
    dispatch(deleteNote(id))
  }
  
  useEffect(() => {
    if (user) {
      dispatch(getNotes())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, dispatch])

  const containerClass = "notes-container " + viewMode

  return (
    <>
      <section className="toolbar">
        <button className="btn btn-outline" name="stack" onClick={() => setViewMode("stack")}><FaThList /></button>
        <button className="btn btn-outline" name="grid" onClick={() => setViewMode("grid")}><FaThLarge /></button>
        <button className="btn" onClick={onNewNote}>New Note</button>
      </section>
      { notes.length > 0 ? (
        <section className={containerClass}>
          { notes.map(n => (<Note key={n._id} note={n} setCurrent={setEditNote} openEditor={setEditorOpen} deleteNote={onDeleteNote}/>))}
        </section>
      ) : (
        <h3 className="no-notes">No notes to display📝</h3>
      )}

      { editorOpen && <NoteEditor editNote={editNote} setOpen={setEditorOpen}/> }
    </>
  )
}

export default Dashboard