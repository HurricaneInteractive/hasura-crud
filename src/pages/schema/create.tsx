import React from "react"
import { useParams } from "react-router-dom"
import withSchemaGuard from "../../components/withSchemaGuard"
import { schemaNiceName } from "../../modules/schema/utils"

const SchemaCreate = () => {
	const { schema } = useParams<{ schema: string }>()

	return (
		<h1>
			Create a{" "}
			<span className="text-capitalize font-weight-bold">
				{schemaNiceName(schema)}
			</span>
		</h1>
	)
}

export default withSchemaGuard(SchemaCreate)
