import { DeleteResult, ObjectId, UpdateResult, Document } from 'mongodb'
import client from 'mongodb/client'
import { Message } from './message-model'
const db = client.db()

export async function addMessage(message: Message): Promise<string> {
	const messages = db.collection<Message>('message')

	const { insertedId } = await messages.insertOne({ ...message })

	return insertedId
}

export async function getMessageById(messageId: string) {
	const messageCollection = db.collection<Message>('messages')
	return await messageCollection.findOne(
		{ _id: messageId }
		
	)
}

export async function getConversation(id_sender: string, id_receiver: string
  ): Promise<Message[]> { 
    const messagesCollection = db.collection<Message>('messages');
  
    // Create a query that finds messages where the sender and receiver match
    
    const query = {
      $or: [
        { from: id_sender, to: id_receiver },
        { from: id_receiver, to: id_sender }
      ]
    };
  
    // Execute the query and return the found messages
    const messages = await messagesCollection.find(query).toArray();
    //later could implement sort by date and time
    return messages;
  }
