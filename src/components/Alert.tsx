import React, { MouseEvent, ReactElement } from "react"

interface AlertProps {
	type?: "primary" | "success" | "secondary" | "danger"
	title: string
	content?: string | ReactElement
	onClose?: (e: MouseEvent<HTMLButtonElement>) => void
	className?: string
}

export default function Alert({
	type,
	title,
	content,
	onClose,
	className = "",
}: AlertProps) {
	return (
		<div
			className={`alert filled-dm ${className} ${type && `alert-${type}`}`}
			role="alert"
		>
			{typeof onClose === "function" && (
				<button
					className="close"
					data-dismiss="alert"
					type="button"
					aria-label="Close"
					onClick={onClose}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			)}
			<h4 className={`alert-heading ${!content && "mb-0"}`}>{title}</h4>
			{typeof content === "string" ? content : ""}
		</div>
	)
}
