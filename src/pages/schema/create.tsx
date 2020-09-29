import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import withSchemaGuard from "../../components/withSchemaGuard"
import { schemaNiceName } from "../../modules/schema/utils"
import { Formik, FormikHelpers } from "formik"
import schemas, { SchemaKeys } from "../../lib/schema"
import FormikInput from "../../modules/formik/FormikInput"
import { ObjectSchema } from "yup"
import Schema from "../../modules/schema/Schema"
import { useMutation } from "@apollo/client"
import Alert from "../../components/Alert"
import { isRequiredField } from "../../modules/formik/utils"

const SchemaCreate = () => {
	const { schema } = useParams<{ schema: SchemaKeys }>()
	const [recordSchema] = useState<Schema>(schemas[schema])
	const [addRecord] = useMutation(recordSchema.createOneQuery)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState("")

	const validationSchema: ObjectSchema = recordSchema.validationSchema

	const createRecord = async (
		values: Record<string, string>,
		actions: FormikHelpers<Record<string, string>>
	) => {
		setSuccess(false)
		setError("")

		try {
			await addRecord({ variables: values })
			actions.resetForm()
			setSuccess(true)
		} catch (e) {
			console.error(e)
			setError(e.message)
		}
	}

	return (
		<>
			<Link to={`/${schema}`} className="btn btn-sm">
				&lt; Back
			</Link>
			<hr />
			<h1>
				Create a{" "}
				<span className="text-capitalize font-weight-bold">
					{schemaNiceName(schema)}
				</span>
			</h1>
			{success && (
				<Alert
					title="Record has been created"
					onClose={(e) => {
						e.preventDefault()
						setSuccess(false)
					}}
					type="success"
				/>
			)}
			{error && (
				<Alert
					title="An error occured"
					onClose={(e) => {
						e.preventDefault()
						setError("")
					}}
					type="danger"
					content={error}
				/>
			)}
			<Formik
				initialValues={recordSchema.toFormData()}
				onSubmit={createRecord}
				validationSchema={validationSchema}
			>
				{(props) => (
					<form onSubmit={props.handleSubmit}>
						{Object.keys(validationSchema?.fields || {}).map((key) => (
							<FormikInput
								name={key}
								value={props.values[key]}
								key={key}
								hidden={key === recordSchema.getPrimaryKey}
								required={isRequiredField(validationSchema?.fields, key)}
							/>
						))}

						<hr />
						<div>
							<button
								className="btn mr-5"
								type="reset"
								onClick={props.handleReset}
								disabled={props.isSubmitting}
							>
								Reset
							</button>
							<button
								className="btn btn-primary"
								type="submit"
								disabled={props.isSubmitting}
							>
								Create
							</button>
						</div>
					</form>
				)}
			</Formik>
		</>
	)
}

export default withSchemaGuard(SchemaCreate)
