import React from "react"
import { useParams } from "react-router-dom"
import InvalidSchema from "../../components/InvalidSchema"
import { hasBeenRegistered, schemaNiceName } from "../../modules/schema/utils"

type Params = {
	schema: string
}

export default function SchemaIndex() {
	const { schema } = useParams<Params>()

	if (!hasBeenRegistered(schema)) {
		return <InvalidSchema />
	}

	return (
		<h1>
			"<span className="text-capitalize">{schemaNiceName(schema)}</span>" Schema
		</h1>
	)
}
