import React from "react"
import { Link } from "react-router-dom"
import Alert from "./Alert"

export default function InvalidSchema() {
	return (
		<>
			<Alert
				type="danger"
				title="Schema not found"
				content={
					<>
						The requested schema has not been added. Add a new schema under{" "}
						<code>lib/schema/index.tsx</code>.
						<br />
						To see all schema, do to the <Link to="/">home page</Link>.
					</>
				}
			/>
		</>
	)
}
