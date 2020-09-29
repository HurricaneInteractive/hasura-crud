import React, { useMemo } from "react"
import { useFormikContext } from "formik"
import { has } from "lodash-es"

interface InputProps {
	name: string
	value: string
	required?: boolean
	hidden?: boolean
}

export default function FormikInput({
	name,
	value,
	required = false,
	hidden = false,
}: InputProps) {
	const { isSubmitting, errors, handleChange } = useFormikContext<any>()

	const hasError = useMemo(() => {
		return has(errors, name)
	}, [errors, name])

	return (
		<div
			className={`form-group ${hasError && "is-invalid"} ${hidden && "d-none"}`}
		>
			<label
				htmlFor={name}
				className={`text-capitalize ${required && "required"}`}
			>
				{name}
			</label>
			<input
				type="text"
				className="form-control"
				id={name}
				name={name}
				required={required}
				disabled={isSubmitting}
				onChange={handleChange}
				value={value}
			/>
			<span className="text-danger">{hasError && errors[name]}</span>
		</div>
	)
}
