export const get_all = (tableName: string, keys: string[]): string => {
  return `
    query GetAll {
      ${tableName} {
        ${keys.join('\n')}
      }
    }
  `
}

export const get_by_pk = (tableName: string, keys: string[], pk: string): string => {
  return `
    query GetByPK($id: Int!) {
      ${tableName}_by_pk(${pk}: $id) {
        ${keys.join('\n')}
      }
    }
  `
}
