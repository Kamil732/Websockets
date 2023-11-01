import React, { Component } from 'react'

import moment from 'moment'

class ChatRoom extends Component {
	constructor(props) {
		super(props)

		const roomName = this.props.match.params.id
		this.chatSocket = new WebSocket(
			`ws://localhost:8000/ws/chat/${roomName}/`
		)

		this.state = {
			messages: [],
			message: '',
		}

		this.sendMsg = this.sendMsg.bind(this)
	}

	sendMsg = (e) => {
		e.preventDefault()
		this.chatSocket.send(JSON.stringify({ message: this.state.message }))
		this.setState({ message: '' })
	}

	componentDidMount() {
		this.chatSocket.onmessage = (e) => {
			var data = JSON.parse(e.data)

			var message = {
				text: data.message,
				date: data.utc_time,
			}
			message.date = moment(message.date)
				.local()
				.format('YYYY-MM-DD HH:mm:ss')

			this.setState({
				messages: [...this.state.messages, message],
			})
		}

		this.chatSocket.onclose = (e) => {
			console.error('Chat socket closed unexpectedly')
		}
	}

	render() {
		return (
			<form onSubmit={this.sendMsg}>
				{this.state.messages.map((item, i) => (
					<div key={i} id="message" className="card">
						<div className="cell large-4">{item.text}</div>
						<div className="cell large-2 text-right">
							<small>{item.date}</small>
						</div>
					</div>
				))}

				<textarea
					cols="100"
					value={this.state.message}
					onChange={(e) => this.setState({ message: e.target.value })}
				/>
				<br />
				<button type="submit">Send</button>
			</form>
		)
	}
}

export default ChatRoom
