import React, { ComponentType } from "react"
import { useParams } from "react-router-dom"
import { hasBeenRegistered } from "../modules/schema/utils"
import InvalidSchema from "./InvalidSchema"

/**
 * A HOC to check if the schema has been registered.
 *
 * @template P
 * @param {ComponentType<P>} Component
 * @returns
 */
function withSchemaGuard<P extends object>(Component: ComponentType<P>) {
	return (props: P) => {
		const { schema } = useParams<{ schema: string }>()

		if (!hasBeenRegistered(schema)) {
			return <InvalidSchema />
		}

		return <Component {...props} />
	}
}

export default withSchemaGuard
