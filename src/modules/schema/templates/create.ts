export const create_one = (
	tableName: string,
	keys: string[],
	pk: string
): string => {
	const keysCopy = [...keys]
	const pkIndex = keysCopy.indexOf(pk)
	keysCopy.splice(pkIndex, 1)

	const mutationVariables = keysCopy.reduce((acc: string[], cur) => {
		// TODO: Need to account for other types
		return acc.concat(`$${cur}: String!`)
	}, [])

	const object = keysCopy.reduce((acc: string[], cur) => {
		return acc.concat(`${cur}: $${cur}`)
	}, [])

	return `
    mutation CreateOne(${mutationVariables.join(",")}) {
      insert_${tableName}_one(object: {${object.join(",")}}) {
        ${keys.join("\n")}
      }
    }
  `
}

// TODO: Implement
export const create_multiple = (): string => {
	return ""
}
