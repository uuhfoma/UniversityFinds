export interface User {
	_id: string
    username: string
	fname: string
	lname: string
	studentEmail: string
	password: string  
	dob: string
    age: number //auto calculated by DOB
    gender: string  //'male' or 'female' string
    school?: string
    class?: string
    major?: string[]
    minor?: string
    bio?: string
    pictures?: [string] //url format
    getToKnow?: any[]  // could be user
    likes?: any[]
    notifications?: string[]
    //system settings will be defined below

}