import { DeleteResult, ObjectId, UpdateResult, Document } from 'mongodb'
import client from 'mongodb/client'
import { User } from './user-model'
const db = client.db()

export async function getUsersExcept(ids: Array<ObjectId | string>) {
    const usersCollection = db.collection<User>('users');
  
    // Convert string IDs to ObjectId if necessary
    const objectIds = ids.map(id => typeof id === 'string' ? new ObjectId(id) : id);
  
    // Find all users where _id is not in the list of provided IDs
    const users = await usersCollection.find({
      _id: { $nin: objectIds }
    }).toArray();
  
    return users;
}

export async function getUserById(userId: string) {
	const usersCollection = db.collection<User>('users')
	return await usersCollection.findOne(
		{ _id: new ObjectId(userId) },
		{ projection: { password: 0 } }
	)
}

export async function updateUserById(
	id: string | ObjectId,
	user: User
){
	const users = db.collection<User>('users')

	return await users.findOneAndUpdate(
		{ _id: new ObjectId(id) },
		{
			$set: {
                username: user.username,
                fname: user.fname,
                lname: user.lname,
                studentEmail: user.studentEmail,
                password: user.password,
                dob: user.dob,
                age: user.age, 
                gender: user.gender,  
                school: user.school,
                class: user.class,
                major: user.major,
                minor: user.minor,
                bio: user.bio,
                pictures: user.pictures, 
                getToKnow: user.getToKnow,  
                likes: user.likes,
                notifications: user.notifications,
				
			},
		},
    { returnDocument: 'after' }
	)
}

export async function deleteUserById(
	id: string | ObjectId
): Promise<DeleteResult> {
	const users = db.collection<User>('users')

	return await users.deleteOne({
		_id: new ObjectId(id),
	})
}