import { ObjectId } from 'mongodb'

export interface Message {
    _id: string
    from: string  //username
    to: string    //username
    dateAndTime: string 
    content: string
}

