import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_ENDPOINT}/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB_APPNAME}`

const dbName = process.env.MONGO_DB_NAME

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

/**
 * Returns list of Users
 *
 * @returns {Promise<[]>} - an array of user objects
 */
export async function getUsers() {
  const query = {}
  console.log(`Getting Users: ${JSON.stringify(query)}`)
  try {
    client.connect()
    const collection = client.db(dbName).collection(process.env.MONGO_DB_USER_COLLECTION)
    const data = await collection.find(query).toArray()
    console.debug(`Found ${data.length} user${data.length > 1 ? 's' : ''}: ${JSON.stringify(data)}`)
    return JSON.stringify(data)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Returns a single user by username
 *
 * @param {string} username - username
 * @returns {Promise<{}>} - user object
 */
export async function getSingleUserByUsername(username) {
  const query = { username }
  console.log(`Getting Users: ${JSON.stringify(query)}`)
  try {
    client.connect()
    const collection = client.db(dbName).collection(process.env.MONGO_DB_USER_COLLECTION)
    const data = await collection.find(query).toArray()
    console.debug(`Found ${data.length} user${data.length > 1 ? 's' : ''}: ${JSON.stringify(data)}`)
    return JSON.stringify(data)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Returns a single user by id
 *
 * @param {integer} id
 * @returns {Promise<{}>} - user object
 */
export async function getSingleUserById(id) {
  const query = { _id: id }
  console.log(`Getting Users: ${JSON.stringify(query)}`)
  try {
    client.connect()
    const collection = client.db(dbName).collection(process.env.MONGO_DB_USER_COLLECTION)
    const data = await collection.find(query).toArray()
    console.debug(`Found ${data.length} user${data.length > 1 ? 's' : ''}: ${JSON.stringify(data)}`)
    return JSON.stringify(data)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Returns a single user by email
 *
 * @param {integer} email - email address of user
 * @returns {Promise<{}>} - user object
 */
export async function getSingleUserByEmail(email) {
  const query = { email }
  console.log(`Getting Users: ${JSON.stringify(query)}`)
  try {
    client.connect()
    const collection = client.db(dbName).collection(process.env.MONGO_DB_USER_COLLECTION)
    const data = await collection.find(query).toArray()
    console.debug(`Found ${data.length} user${data.length > 1 ? 's' : ''}: ${JSON.stringify(data)}`)
    return JSON.stringify(data)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Adds a new user to the database
 * @param {object} user - user object
 * @returns {Promise<void>}
 */
export async function addUser(user) {
  // Check that the user object has the required fields for creating a new user
  for (const field of requiredFields) {
    if (!user[field]) {
      throw new Error(`Missing required field: ${field}`)
    }
  }

  // Check to see if the username has already been taken
  const existingUser = await getSingleUserByUsername(user.username)
  if (existingUser) {
    throw new Error(`User with username ${user.username} already exists`)
  }

  // Check to see if the email has already been taken
  const existingEmail = await getSingleUserByEmail(user.email)
  if (existingEmail) {
    throw new Error(`User with email ${user.email} already exists`)
  }

  // TODO: Check to see if a user has already registered with the same GitHub account
  // const existingGithubId = await getSingleUserByGithubId(user.githubId);
  // if (existingGithubId) {
  //   throw new Error(`User with GitHub ID ${user.githubId} already exists`);
  // };

  // Create the user if an error has not been thrown already
  const createdTimestamp = new Date().toISOString()
  const userDoc = {
    _id: (await getHighestUserId()) + 1,
    username: user.username,
    name: user.name,
    email: user.email,
    verified: false,
    status: 1,
    meta: {
      createdDate: createdTimestamp,
      updatedDate: createdTimestamp,
    },
    accounts: [],
  }

  // Insert into the database and return the result
  try {
    client.connect()
    const collection = client.db(dbName).collection(process.env.MONGO_DB_USER_COLLECTION)
    const result = await collection.insertOne(userDoc)
    console.log(`New user created with the following id: ${result.insertedId}`)
    return await getSingleUserById(result.insertedId)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Updates an existing user
 * @param {string} user - the username or id of the user to update
 * @param {object} userDoc - the user object to update
 * @return {Promise<void>} - the updated user object
 */
export async function updateUser(user, userDoc) {
  const updatedTimestamp = new Date().toISOString()
  const query = {}

  if (typeof user === 'string') {
    query.username = user
  } else if (typeof user === 'number') {
    query.id = user
  } else {
    throw new Error('Invalid user parameter')
  }

  const updateDoc = {
    $set: {
      ...userDoc,
      meta: {
        ...userDoc.meta,
        updatedDate: updatedTimestamp,
      },
    },
  }

  try {
    const result = await collection.updateOne(query, updateDoc)
    console.log(`User updated with the following id: ${result.upsertedId}`)
    return result
  } catch (err) {
    console.error(err)
  }
}

/**
 * get the highest user id in the user database
 *
 * @return {Promise<integer>} - highest user id
 */
async function getHighestUserId() {
  const query = {}
  const options = {
    sort: { id: -1 },
    limit: 1,
  }

  try {
    const result = await collection.find(query, options).toArray()
    if (result.length) {
      return result[0].id
    } else {
      return 999
    }
  } catch (err) {
    console.error(err)
  }
}

// Required Fields in order to create a new user
const requiredFields = ['username', 'name', 'email']
