import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			chatId: '',
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange = (e) => this.setState({ [e.target.name]: e.target.value })

	onSubmit = (e) => {
		e.preventDefault()

		this.props.history.push(`/${this.state.chatId}`)
	}

	render() {
		const { chatId } = this.state

		return (
			<form onSubmit={this.onSubmit}>
				<input
					type="text"
					name="chatId"
					placeholder="Enter chat id..."
					value={chatId}
					onChange={this.onChange}
				/>

				<button type="submit">Submit</button>
			</form>
		)
	}
}

export default withRouter(Home)
