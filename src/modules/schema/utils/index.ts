import { has } from "lodash-es"
import schemas from "../../../lib/schema"

/**
 * Checks if a schema has been registered
 *
 * @param check
 * @return boolean
 */
export const hasBeenRegistered = (check: string): boolean => has(schemas, check)

/**
 * Formats the schema name to something nice. Tries to accomodate to
 * snake case and pascal case
 *
 * @param {string} name
 * @return string
 */
export const schemaNiceName = (name: string): string => {
	name = name.replace(/_/g, " ")
	const captialSplit = name.split(/(?=[A-Z])/)
	return captialSplit.join(" ").trim()
}
