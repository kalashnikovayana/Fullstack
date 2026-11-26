import './Button.css'

export const Button = (props) => {
  const darkClass = props.isDark ? 'button--dark' : ''
  const smallClass = props.isSmall ? 'button--small' : ''
  const className = `button ${darkClass} ${smallClass}`

  return (
    <button
      className={className}
      type={props.type || 'button'}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}
