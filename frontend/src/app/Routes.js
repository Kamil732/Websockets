import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import ChatRoom from '../containers/ChatRoom'

import Home from '../containers/Home'

class Routes extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/:id" component={ChatRoom} />
				</Switch>
			</Router>
		)
	}
}

export default Routes
