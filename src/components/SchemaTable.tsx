import { useMutation, useQuery } from "@apollo/client"
import { omit, pull } from "lodash-es"
import React, { MouseEvent, ReactElement, useState } from "react"
import { Link } from "react-router-dom"
import schemas, { SchemaKeys } from "../lib/schema"
import Alert from "./Alert"
import LoadingTable from "./LoadingTable"

type Props = {
	schema: SchemaKeys
}

const QueryError = ({ message }: { message: string }) => (
	<Alert title="Query error" content={message} type="danger" />
)

const NoData = (): ReactElement => (
	<Alert
		title="No data found"
		content="No results were found, try adding a record to this schema"
	/>
)

function SchemaTable({ schema }: Props): ReactElement {
	const { loading, error, data, refetch } = useQuery(
		schemas[schema].readAllQuery
	)
	const [deleteByPk] = useMutation(schemas[schema].deleteByPkQuery)
	const [deleting, setDeleting] = useState(false)

	if (loading) return <LoadingTable />

	if (error) return <QueryError message={error.message} />

	const deleteRecord = (id: string) => async (
		e: MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault()

		// eslint-disable-next-line no-restricted-globals
		if (confirm("Are you sure you want to delete this record?")) {
			setDeleting(true)

			try {
				await deleteByPk({
					variables: {
						id,
					},
				})
				await refetch()
			} catch (e) {
				console.error(e)
				alert(e.message)
			} finally {
				setDeleting(false)
			}
		}
	}

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
									<button
										className="btn"
										onClick={deleteRecord(item[key])}
										disabled={deleting}
									>
										Delete
									</button>
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
