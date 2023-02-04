const { getPrismaClient } = require('../datasource/prisma-datasource')

const insertUser = async (user) => {
  try {
    const dbClient = getPrismaClient()
    return await dbClient.user.create({ data: user })
  } catch(e) {
    throw new Error(e)
  }
}

const getUserByEmail = async (email) => {
  try {
    const dbClient = getPrismaClient()
    return await dbClient.user.findUnique({ where: { email } })
  } catch(e) {
    throw new Error(e)
  }
}

const getUserByNameTag = async (nameTag) => {
  try {
    const dbClient = getPrismaClient()
    return await dbClient.user.findUnique({ where: { nameTag } })
  } catch(e) {
    throw new Error(e)
  }
}

const getUsersByName = async (name) => {
  try {
    const dbClient = getPrismaClient()
    return await dbClient.user.findMany({ where: { name }})
  } catch(e) {
    throw new Error(e)
  }
}

const getAllUsers = async () => {
  try {
    const dbClient = getPrismaClient()
    return await dbClient.user.findMany()
  } catch(e) {
    throw new Error(e)
  }
} 

const deleteUser = async (email) => {
  try {
    const dbClient = getPrismaClient()
    return await dbClient.user.delete({ where: { email } })
  } catch(e) {
    throw new Error(e)
  }
}


module.exports = {
  insertUser,
  getUserByEmail,
  getUserByNameTag,
  getUsersByName,
  deleteUser,
  getAllUsers
}
