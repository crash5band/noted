import Label from "./Label"

const Note = ({ note, setCurrent, openEditor, deleteNote }) => {
  const onSelect = () => {
    setCurrent(note)
    openEditor(true)
  } 

  return (
    <div className="note" onClick={onSelect}>
      <div className="note-title">{note.title}</div>
      <div className="note-body">{note.text}</div>
      <div className="note-labels">
        {/* show only first three labels */}
        {note.labels.slice(0, 3).map((l, index) =>  <div key={index} className="label">{l}</div>)}
      </div>
    </div>
  )
}

export default Note