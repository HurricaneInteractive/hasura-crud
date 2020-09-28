import { object, string } from "yup";
import registerSchemas from "../../modules/schema/register";

//#region Basic User Definition
export const BasicUserSchema = object().shape({
  username: string().required(),
  _id: string().notRequired()
})

const BasicUserTableName = "basic_user"
//#endregion

const schemas = registerSchemas({
  [BasicUserTableName]: BasicUserSchema
})

export default schemas
