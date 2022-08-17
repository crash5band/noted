import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNote, updateNote, deleteNote } from "../features/notes/notesSlice"
import { FaTrashAlt, FaCopy, FaPaste } from "react-icons/fa"
import { toast } from "react-toastify"
import Label from "./Label"

const NoteEditor = ({ editNote, setOpen }) => {
  const dispatch = useDispatch()

  const [note, setNote] = useState({
    title: "",
    text: "",
    labels: [],
  })

  const [labelAdd, setLabelAdd] = useState("")

  const onChange = e => {
    setNote(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onLabelChange = e => {
    setLabelAdd(e.target.value)
  }

  const onLabelKeyDown = e => {
    if (e.key === "Enter" && labelAdd.trim().length > 0) {
      setNote({
        ...note,
        labels: [...note.labels, e.target.value]
      })

      setLabelAdd("")
    }
  }

  const onLabelDelete = index => {
    setNote({
      ...note,
      labels: [...note.labels.slice(0, index), ...note.labels.slice(index + 1)]
    })
  }

  const onDelete = () => {
    if (note._id) {
      // exisiting note
      dispatch(deleteNote(note._id))
    }

    setOpen(false)
  }

  const onCopy = () => {
    navigator.clipboard.writeText(note.text)
  }

  const onPaste = async () => {
    const pasteText = await navigator.clipboard.readText()
    setNote({
      ...note,
      text: note.text + pasteText
    })
  }

  const onClose = () => {
    if (note._id) {
      // exisitng note
      dispatch(updateNote(note))
    } else {
      // new note
      if (note.text.length > 0 || note.title.length > 0) {
        dispatch(createNote(note))
      }
    }

    setOpen(false)
  }

  useEffect(() => {
    setNote(editNote)
  }, [editNote])

  return (
    <div className="modal"> 
      <div className="editor-container">
        <input type="text" name="title" id="title" value={note.title} onChange={(onChange)} placeholder="Title" />
        <textarea name="text" id="editor" cols="30" rows="10" value={note.text} onChange={onChange}/>
        <div className="label-controls">
          <div className="labels-container">
            {note.labels.length > 0 ? (
            <>
              {note.labels.map((l, index) => <Label key={index} text={l} deleteCallback={() => onLabelDelete(index)} />)}
            </>
            ) : (
              <p className="no-labels">No labels added.</p>
            )}
          </div>
          <input type="text" name="label" id="label" value={labelAdd} onChange={onLabelChange} onKeyDown={onLabelKeyDown} placeholder="Add a label" />
        </div>
        <div className="editor-actions">
          <div className="editor-toolbar">
            <button className="btn btn-outline" onClick={onCopy}><FaCopy /></button>
            <button className="btn btn-outline" onClick={onPaste}><FaPaste /></button>
            <button className="btn btn-outline" onClick={onDelete}><FaTrashAlt /></button>
          </div>
          <div className="editor-toolbar">
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteEditor
