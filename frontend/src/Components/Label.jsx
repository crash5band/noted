import { FaTimes } from "react-icons/fa"

const Label = ({ text, deleteCallback }) => {
  return (
    <div className="label">
      <p className="label-text">{text}</p>
      <button className="btn label-delete" onClick={deleteCallback}>
        <FaTimes />
      </button>
    </div>
  )
}

export default Label