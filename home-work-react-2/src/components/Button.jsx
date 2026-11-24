import './Button.css'

export const Button = (props) => {
  return (
    <button className="button" type="button">
      {props.text}
    </button>
  )
}
