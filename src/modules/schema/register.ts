import { ObjectSchema } from "yup"
import Schema from "./Schema"

type SchemasObject<K extends string> = Record<K, ObjectSchema>

/**
 * Allows a user to register multiple schemas at once. It will return
 * a object with the same keys but with the generated `Schema`.
 *
 * The `Schema.create` method may throw a error, be sure to wrap your
 * `registerSchemas` function in a `try/catch` block
 *
 * @template K
 * @param {SchemasObject<K>} schemas
 * @returns {Record<K, Schema>}
 */
function registerSchemas <K extends string>( schemas: SchemasObject<K>): Record<K, Schema> {
  try {
    const keys = Object.keys(schemas) as K[]

    return keys.reduce((acc, cur) => ({
      ...acc,
      [cur]: Schema.create(schemas[cur], cur)
    }), {} as Record<K, Schema>)
  }
  catch (e) {
    throw new Error(e)
  }
}

export default registerSchemas
