export const isRequiredField = (obj: any, key: string): boolean => {
	return obj[key].tests.some((item: any) => {
		return item.OPTIONS.name === "required"
	})
}
