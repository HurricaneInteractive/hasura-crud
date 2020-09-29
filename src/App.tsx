import React from "react"
import "halfmoon/css/halfmoon-variables.min.css"
import "./App.css"
import { Route, Switch } from "react-router-dom"

import Home from "./pages/home"
import SchemaIndex from "./pages/schema"
import AppSidebar from "./components/AppSidebar"
import SchemaCreate from "./pages/schema/create"

function App() {
	return (
		<div className="page-wrapper with-navbar with-sidebar">
			<nav className="navbar"></nav>
			<AppSidebar />
			<div className="content-wrapper pt-20 px-20">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/:schema">
						<SchemaIndex />
					</Route>
					<Route path="/:schema/create">
						<SchemaCreate />
					</Route>
				</Switch>
			</div>
		</div>
	)
}

export default App
