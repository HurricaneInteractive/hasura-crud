import { DocumentNode, gql } from "@apollo/client";
import { ObjectSchema } from "yup"

class Schema {
  private validationSchema!: ObjectSchema;
  private tableName!: string;

  private schemaKeys: string[] = [];

  private getQuery!: DocumentNode;

  get allRecords(): DocumentNode {
    return this.getQuery;
  }

  private constructor(schema: ObjectSchema, tableName: string) {
    this.validationSchema = schema;
    this.tableName = tableName;

    this.generateSchemaKeys();
    this.generateGetQuery();
  }

  private generateSchemaKeys() {
    this.schemaKeys = Object.keys(this.validationSchema?.fields || {})
  }

  private generateGetQuery() {
    const queryString = `
      query Get {
        ${this.tableName} {
          ${this.schemaKeys.join("\n")}
        }
      }
    `

    this.getQuery = gql`${queryString}`
  }

  public static create(schema: ObjectSchema, tableName: string) {
    // TODO: Validation

    return new Schema(schema, tableName)
  }
}

export default Schema
