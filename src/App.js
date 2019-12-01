import React, { Component } from 'react'
import { OtherMessage, YourMessage } from './Message'
import SendIcon from './SendIcon'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    
    this.chatBoxRef = React.createRef()

    this.state = {
      id: 'user1',
      newMessage: '',
      messages: [
        { sender: 'user1', data: 'hey' },
        { sender: 'user2', data: 'what is going on' },
        { sender: 'user1', data: 'not much hbu' },
      ],
    }
  }

  componentDidMount() {
    const socket = 'ws://localhost:5000/room'
    this.ws = new WebSocket(socket)
    this.ws.onmessage = this.receive
  }

  componentDidUpdate(prevProps, prevState) {
    const newMessageCount = this.state.messages.length - prevState.messages.length
    if (newMessageCount) {
      this.chatBoxRef.current.scrollTop = this.chatBoxRef.current.scrollHeight
    }
  }

  receive = (e) => {
    const data = JSON.parse(e.data)
    if (data.type === 'USERID') {
      this.setState({ id: data.data })
    } else if (data.type === 'MESSAGE') {
      this.setState((state) => ({ messages: [...state.messages, data] }))
    }
  }

  handleTyping = e => {
    this.setState({ newMessage: e.target.value })
  }

  handleKeySubmit = e => {
    if (e.key === 'Enter' && this.state.newMessage.length) {
      this.handleSubmit(e)
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(`Sending: ${this.state.newMessage}`)
    this.ws.send(this.state.newMessage)
    this.setState({ newMessage: '' })
  }

  render() {
    return (
      <div className="chatter">
        <section className="title-row">
          <h1 className="title">CHATTER</h1>
        </section>
        <section className="messages-row" ref={this.chatBoxRef}>
          {this.state.messages.map(mes => {
            if (mes.sender === this.state.id) {
              return <YourMessage {...mes} />
            } else {
              return <OtherMessage {...mes} />
            }
          })}
        </section>
        <section className="input-row">
          <input
            className="message-input"
            value={this.state.newMessage}
            onChange={this.handleTyping}
            onKeyPress={this.handleKeySubmit}
            type="text" />
          <SendIcon onClick={this.handleSubmit} />
        </section>
      </div>
    )
  }
}

export default App
