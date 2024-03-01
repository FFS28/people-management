import express, { Request, Response } from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import morgan from 'morgan'

import { Person } from './types'
import { readData, writeData } from './readWriteData'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// e: Fetch People
// method: GET
// endpoint: /people
app.get('/people', async (_req: Request, res: Response) => {
  try {
    const peopleData = await readData() // Read People data from `data/people.json`
    console.log(peopleData.length)
    res.json(peopleData)
  } catch (error: any) {
    res.status(500).send({ message: 'Server error', error: error.message })
  }
})

// e: Add Person
// method: POST
// endpoint: /people
// body: Person
app.post('/people', async (req: Request, res: Response) => {
  try {
    const newPerson: Person = {
      id: uuidv4(), // Generate a unique ID for the new person
      ...req.body,
    }

    // Basic validation
    if (!newPerson.forename || !newPerson.surname) {
      return res
        .status(400)
        .send({ message: 'Forename and surname are required.' })
    }

    const people = await readData()
    people.push(newPerson) // Add the new person to the array

    await writeData(people) // Write the updated array back to the file

    res.status(201).send(newPerson)
  } catch (error: any) {
    res.status(500).send({ message: 'Server error', error: error.message })
  }
})

// e: Edit Person
// method: PUT
// endpoint: /people/:id
// params: id
// body: Person
app.put('/people/:id', async (req: Request, res: Response) => {
  try {
    const people = await readData()

    // Check if the specified person is exist
    const index = people.findIndex((p) => p.id === req.params.id)
    if (index === -1) {
      return res.status(404).send({ message: 'Person not found' })
    }

    people[index] = { ...people[index], ...req.body } // Update the specified person

    await writeData(people) // Write the updated array back to the file

    res.send(people[index])
  } catch (error: any) {
    res.status(500).send({ message: 'Server error', error: error.message })
  }
})

// e: Delete Person by Id
// method: DELETE
// endpoint: /people/:id
// params: id
app.delete('/people/:id', async (req: Request, res: Response) => {
  try {
    const people = await readData()

    const personIndex = people.findIndex((p) => p.id === req.params.id)
    if (personIndex === -1) {
      return res.status(404).send({ message: 'Person not found.' })
    }

    people.splice(personIndex, 1) // Remove the person from the array
    await writeData(people)

    res.status(200).send({ message: `Person deleted successfully.` })
  } catch (error: any) {
    res.status(500).send({ message: 'Server error', error: error.message })
  }
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server is listening on port ${port}`))
