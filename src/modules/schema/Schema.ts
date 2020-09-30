import { DocumentNode, gql } from "@apollo/client"
import { ObjectSchema } from "yup"
import { create_one } from "./templates/create"
import { delete_by_pk } from "./templates/delete"
import { get_all, get_by_pk } from "./templates/read"

class Schema {
	private _validationSchema!: ObjectSchema
	public get validationSchema(): ObjectSchema {
		return this._validationSchema
	}

	private tableName!: string
	private schemaKeys: string[] = []

	private _primaryKey: string = "_id"

	public set primaryKey(value: string) {
		if (value.trim() !== "") {
			this._primaryKey = value.trim()
			this.generateCreateQueries()
		}
	}

	get getPrimaryKey(): string {
		return this._primaryKey
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

	get createOneQuery(): DocumentNode {
		return this._createOneQuery
	}
	//#endregion

	//#region Delete Queries
	private _deleteByPkQuery!: DocumentNode

	get deleteByPkQuery(): DocumentNode {
		return this._deleteByPkQuery
	}
	//#endregion

	private constructor(schema: ObjectSchema, tableName: string) {
		this._validationSchema = schema
		this.tableName = tableName

		this.generateSchemaKeys()
		this.generateReadQueries()
		this.generateCreateQueries()
		this.generateDeleteQueries()
	}

	private generateSchemaKeys() {
		this.schemaKeys = Object.keys(this._validationSchema?.fields || {})
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
	}

	private generateDeleteQueries() {
		this._deleteByPkQuery = gql`
			${delete_by_pk(this.tableName, this._primaryKey)}
		`
	}

	/**
	 * Constructs the form structure based on the schema keys without the primary key
	 *
	 * @returns {Record<string, string>}
	 * @memberof Schema
	 */
	public toFormData(): Record<string, string> {
		// TODO: this might need to change to the schema fields to use different types
		return this.schemaKeys.reduce((acc: Record<string, string>, cur) => {
			if (cur === this._primaryKey) return acc

			return { ...acc, [cur]: "" }
		}, {})
	}

	public static create(schema: ObjectSchema, tableName: string) {
		// TODO: Validation

		return new Schema(schema, tableName)
	}
}

export default Schema
