import { useEffect } from 'react'
import './Modal.css'

export const Modal = (props) => {
  const onClose = props.onClose

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__window" onClick={(event) => event.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}
