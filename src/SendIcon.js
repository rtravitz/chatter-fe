import React from 'react'

function SendIcon({onClick}) {
  return (
  <div onClick={onClick} className="send-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#FFCE3C"><path class="heroicon-ui" d="M13 5.41V21a1 1 0 0 1-2 0V5.41l-5.3 5.3a1 1 0 1 1-1.4-1.42l7-7a1 1 0 0 1 1.4 0l7 7a1 1 0 1 1-1.4 1.42L13 5.4z" /></svg>
  </div>
  )
}

export default SendIcon
