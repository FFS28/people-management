import fs from 'fs'

import { Person } from './types'

// Utility function to read and write to the JSON file
export const readData = async (): Promise<Person[]> => {
  const data = await fs.promises.readFile('data/people.json', 'utf8')
  const jsonData = JSON.parse(data)
  return jsonData.people
}

export const writeData = async (data: Person[]): Promise<void> => {
  const jsonData = { people: data }
  await fs.promises.writeFile(
    'data/people.json',
    JSON.stringify(jsonData, null, 2),
    'utf8'
  )
}
