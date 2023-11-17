import { DeleteResult, ObjectId, UpdateResult, Document, InferIdType } from 'mongodb'
import client from 'mongodb/client'
import { User } from './user-model'
import { webcrypto } from 'crypto'
const db = client.db()

export async function generateAuthToken() {
	let tokenUnique = false
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
	let result = ''

	while (!tokenUnique) {
		result = ''
		for (let i = 0; i < 10; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * characters.length)
			)
		}
		const AuthCollection = db.collection('userAuthentication')
		const checkAuthExists = await AuthCollection.findOne({ token: result })
		if (checkAuthExists == null) {
			tokenUnique = true
		}
	}

	return result
}

export async function createUser(userData: User) {
	try {
		console.log(userData)

		userData.password = await hash(userData.password)
		
		
		const usersCollection = db.collection<User>('users')
		const result = await usersCollection.insertOne(userData)
		const authToken = await generateAuthToken()
		const AuthCollection = db.collection('userAuthentication')
		await AuthCollection.insertOne({
			user: result.insertedId,
			token: authToken,
		})

		return { id: result.insertedId, token: authToken }
	} catch (e) {
		console.log(e)
		return null
	}
}

//LOGIN TO ACCOUNT
export async function userLogin(userLogin: User) {
	try {
		const usersCollection = db.collection<User>('users')
		const email = userLogin.studentEmail
		const password = await hash(userLogin.password)
		console.log('PASSWORD: ' + password)
		const result = await usersCollection.findOne({
			studentEmail: email,
			password: password,
		})

		if (result == null) {
			console.log('no account found')
			return 'xxx'
		} else {
			console.log('ACCOUNT EXISTS')
			const authToken = await generateAuthToken()
			const AuthCollection = db.collection('userAuthentication')
			await removeAuthTokens(result._id)
			await AuthCollection.insertOne({
				user: result._id,
				token: authToken,
			})
			return authToken
		}
	} catch (e) {
		console.log(e)
		return null
	}
}

async function hash(password: string) {
	const utf8 = new TextEncoder().encode(password)
	const hashBuffer = await webcrypto.subtle.digest('SHA-256', utf8)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	const hashHex = hashArray
		.map((bytes) => bytes.toString(16).padStart(2, '0'))
		.join('')

	return hashHex
}
//LOGOUT OF ACCOUNT
export async function userLogout(authToken: string) {
	try {
		const AuthCollection = db.collection('userAuthentication')
		return await AuthCollection.deleteOne({ token: authToken })
	} catch (e) {
		console.log(e)
		return null
	}
}

//REMOVE EXISTING USER TOKEN
export async function removeAuthTokens(userID: InferIdType<User>) {
	try {
		const AuthCollection = db.collection('userAuthentication')
		return await AuthCollection.deleteOne({ user: userID })
	} catch (e) {
		console.log(e)
		return null
	}
}

//query database to get an account by email, returns if is found
export async function getUserByEmail(email: string) {
	try {
		const usersCollection = db.collection<User>('users')
		const result = await usersCollection.findOne({ studentEmail: email })
		if (result == null) {
			console.log('no email found')
			return false
		} else {
			console.log('EMAIL EXISTS')
			return true
		}
	} catch (e) {
		console.log(e)
		return null
	}
}

// export async function addUser(user: User): Promise<string |ObjectId> {
// 	const users = db.collection<User>('users')
// 	const { insertedId } = await users.insertOne({ ...user })
// 	return insertedId
// }

//used for profile card stack
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