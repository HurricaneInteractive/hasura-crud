import React from "react"
import LoadingOval from "./LoadingOval"

export default function LoadingTable() {
	return (
		<table className="table table-striped">
			<thead>
				<tr>
					<th>
						<div className="fake-content m-0" />
					</th>
					<th>
						<div className="fake-content m-0" />
					</th>
					<th>
						<div className="fake-content m-0" />
					</th>
					<th>
						<div className="fake-content m-0" />
					</th>
					<th>
						<div className="fake-content m-0" />
					</th>
					<th>
						<div className="fake-content m-0" />
					</th>
					<th>
						<div className="fake-content m-0" />
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th colSpan={7}>
						<LoadingOval />
					</th>
				</tr>
			</tbody>
		</table>
	)
}
