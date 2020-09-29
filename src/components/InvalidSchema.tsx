import React from "react"
import { Link } from "react-router-dom"

export default function InvalidSchema() {
	return (
		<div className="alert alert-danger filled-dm" role="alert">
			<h4 className="alert-heading">Schema not found</h4>
			The requested schema has not been added. Add a new schema under{" "}
			<code>lib/schema/index.tsx</code>.
			<br />
			To see all schema, do to the <Link to="/">home page</Link>.
		</div>
	)
}
