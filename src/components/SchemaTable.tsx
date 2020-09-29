import { useQuery } from "@apollo/client"
import { omit, pull } from "lodash-es"
import React, { ReactElement } from "react"
import { Link } from "react-router-dom"
import schemas, { SchemaKeys } from "../lib/schema"
import LoadingTable from "./LoadingTable"

type Props = {
	schema: SchemaKeys
}

const QueryError = ({ message }: { message: string }) => (
	<div className="alert alert-danger filled-dm" role="alert">
		<h4 className="alert-heading">Query error</h4>
		{message}
	</div>
)

const NoData = (): ReactElement => (
	<div className="alert filled-dm" role="alert">
		<h4 className="alert-heading">No data found</h4>
		No results were found, try adding a record to this schema
	</div>
)

function SchemaTable({ schema }: Props): ReactElement {
	const { loading, error, data } = useQuery(schemas[schema].readAllQuery)

	if (loading) return <LoadingTable />

	if (error) return <QueryError message={error.message} />

	const TableHead = (): ReactElement => {
		const tableHeaderKeys = Object.keys(data[schema][0])
		pull(tableHeaderKeys, "__typename")

		return (
			<thead>
				<tr>
					{tableHeaderKeys.map((title) => (
						<th
							key={title}
							className={`text-capitalize ${
								title === schemas[schema].getPrimaryKey ? "w-100" : ""
							}`}
						>
							{title}
						</th>
					))}
					<th className="w-150">Actions</th>
				</tr>
			</thead>
		)
	}

	const TableBody = (): ReactElement => {
		const filteredData = data[schema].map((item: any) => {
			return omit(item, "__typename")
		})

		return (
			<tbody>
				{filteredData.map((item: any) => {
					const key = schemas[schema].getPrimaryKey

					return (
						<tr key={item[key]}>
							{Object.keys(item).map((k) => (
								<td key={`${item[key]}-${k}}`}>{item[k]}</td>
							))}
							<td>
								<div
									className="btn-group"
									role="group"
									aria-label="Row actions"
								>
									<Link
										className="btn btn-primary"
										to={`/${schema}/edit/${item[key]}`}
									>
										Edit
									</Link>
									<button className="btn">Delete</button>
								</div>
							</td>
						</tr>
					)
				})}
			</tbody>
		)
	}

	if (data?.[schema].length === 0) {
		return <NoData />
	}

	return (
		<table className="table table-striped">
			<TableHead />
			<TableBody />
		</table>
	)
}

export default SchemaTable
