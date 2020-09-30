export const delete_by_pk = (tableName: string, pk: string) => {
	return `
    mutation DeleteByPk($id: Int!) {
      delete_${tableName}_by_pk(${pk}: $id) {
        ${pk}
      }
    }
  `
}
