export interface Location {
  type: string
  coordinates: number[]
}

export interface Person {
  id: string
  forename: string
  surname: string
  dob: string
  ssn: string
  issuedDateAndTime: string
  friends: string[]
  image: string
  primaryLocation: Location
}
