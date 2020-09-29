import React from "react"
import { Link, useParams } from "react-router-dom"
import SchemaTable from "../../components/SchemaTable"
import withSchemaGuard from "../../components/withSchemaGuard"
import { SchemaKeys } from "../../lib/schema"
import { schemaNiceName } from "../../modules/schema/utils"

const SchemaIndex = () => {
	const { schema } = useParams<{ schema: string }>()

	return (
		<>
			<h1>
				<span className="text-capitalize font-weight-bold">
					{schemaNiceName(schema)}
				</span>{" "}
				Schema
			</h1>
			<div className="navbar mb-20">
				<div className="d-flex ml-auto">
					<Link to={`/${schema}/create`} className="btn btn-primary">
						Create
					</Link>
				</div>
			</div>
			<SchemaTable schema={schema as SchemaKeys} />
		</>
	)
}

export default withSchemaGuard(SchemaIndex)
