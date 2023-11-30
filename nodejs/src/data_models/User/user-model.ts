import { ObjectId } from 'mongodb'

export interface User {
	_id: ObjectId | string
    username: string
	fname: string
	lname: string
	studentEmail: string
	password: string  
	dob: string
    age: number //auto calculated by DOB
    gender: string  //'male' or 'female' string
    school?: string
    class_?: string
    major?: string[]
    minor?: string
    bio?: string
    pictures: [string] //url format
    getToKnow?: User[]  // matches (update when a match is found in explore)
    likes?: User[]
    notifications?: string[]
    //system settings will be defined below

}

export interface Session {
	_id: ObjectId
	user: ObjectId
	token: string
}
