import React from 'react'
import ProfPic from './ProfPic'

export function OtherMessage({ sender, data}) {
  return (
    <div className="message-block others">
      <ProfPic />
      <p className="message">{data}</p>
    </div>
  )
}

export function YourMessage({sender, data}) {
  return (
    <div className="message-block yours">
      <p className="message">{data}</p>
      <ProfPic />
    </div>
  )
}
