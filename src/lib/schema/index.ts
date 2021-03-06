import { object, string } from "yup"
import registerSchemas from "../../modules/schema/register"

//#region Basic User Definition
export const BasicUserSchema = object().shape({
	_id: string().notRequired(),
	username: string().required(),
	name: string().notRequired(),
	email: string().required(),
})

const BasicUserTableName = "basic_user"
//#endregion

const schemas = registerSchemas({
	[BasicUserTableName]: BasicUserSchema,
})

export type SchemaKeys = keyof typeof schemas

export default schemas
