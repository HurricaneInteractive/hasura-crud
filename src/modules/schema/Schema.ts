import { DocumentNode, gql } from "@apollo/client"
import { ObjectSchema } from "yup"
import { create_multiple, create_one } from "./templates/create"
import { get_all, get_by_pk } from "./templates/read"

class Schema {
	private validationSchema!: ObjectSchema

	private tableName!: string
	private schemaKeys: string[] = []
	private _primaryKey: string = "_id"

	public set primaryKey(value: string) {
		if (value.trim() !== "") {
			this._primaryKey = value.trim()
			this.generateCreateQueries()
		}
	}

	//#region Read Queries
	private _readAllQuery!: DocumentNode
	private _readByPKQuery!: DocumentNode

	get readAllQuery(): DocumentNode {
		return this._readAllQuery
	}

	get readByPKQuery(): DocumentNode {
		return this._readByPKQuery
	}
	//#endregion

	//#region Create Queries
	private _createOneQuery!: DocumentNode
	private _createMultipleQuery!: DocumentNode

	get createOneQuery(): DocumentNode {
		return this._createOneQuery
	}

	get createMultipleQuery(): DocumentNode {
		return this._createMultipleQuery
	}
	//#endregion

	private constructor(schema: ObjectSchema, tableName: string) {
		this.validationSchema = schema
		this.tableName = tableName

		this.generateSchemaKeys()
		this.generateReadQueries()
		this.generateCreateQueries()
	}

	private generateSchemaKeys() {
		this.schemaKeys = Object.keys(this.validationSchema?.fields || {})
	}

	private generateReadQueries() {
		this._readAllQuery = gql`
			${get_all(this.tableName, this.schemaKeys)}
		`
		this._readByPKQuery = gql`
			${get_by_pk(this.tableName, this.schemaKeys, this._primaryKey)}
		`
	}

	private generateCreateQueries() {
		this._createOneQuery = gql`
			${create_one(this.tableName, this.schemaKeys, this._primaryKey)}
		`
		// this._createMultipleQuery = gql`${create_multiple()}`
	}

	public static create(schema: ObjectSchema, tableName: string) {
		// TODO: Validation

		return new Schema(schema, tableName)
	}
}

export default Schema
