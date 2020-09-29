import React from "react"
import { Link, NavLink } from "react-router-dom"
import schemas from "../lib/schema"
import { schemaNiceName } from "../modules/schema/utils"

export default function AppSidebar() {
	const schemaNavItems = () => {
		return Object.keys(schemas).map((key) => (
			<NavLink
				to={`/${key}`}
				key={key}
				className="sidebar-link text-capitalize"
				activeClassName="active"
			>
				{schemaNiceName(key)}
			</NavLink>
		))
	}

	return (
		<div className="sidebar">
			<div className="sidebar-menu">
				<Link to="/" className="sidebar-brand">
					Home
				</Link>
				<div className="sidebar-content mx-0">
					<h5 className="sidebar-title">Schemas</h5>
					<div className="sidebar-divider"></div>
					{schemaNavItems()}
				</div>
			</div>
		</div>
	)
}
