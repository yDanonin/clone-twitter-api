const { getPrismaClient } = require('../datasource/prisma-datasource')

const insertUser = async (user) => {
  try {
    const dbClient = getPrismaClient()
    return await dbClient.user.create({ data: user })
  } catch(e) {
    return e
  }
}

const getUserByEmail = async (email) => {
  try {
    const dbClient = getPrismaClient()
    return await dbClient.user.findUnique({ where: { email } })
  } catch(e) {
    return e
  }
}

const getUserByNameTag = async (nameTag) => {
  try {
    const dbClient = getPrismaClient()
    return await dbClient.user.findUnique({ where: { nameTag } })
  } catch(e) {
    return e
  }
}

const getUsersByName = async (name) => {
  try {
    const dbClient = getPrismaClient()
    return await dbClient.user.findMany({ where: { name }})
  } catch(e) {
    return e
  }
}

const getAllUsers = async () => {
  try {
    const dbClient = getPrismaClient()
    return await dbClient.user.findMany()
  } catch(e) {
    return e
  }
} 

const deleteUser = async (email) => {
  try {
    const dbClient = getPrismaClient()
    return await dbClient.user.delete({ where: { email } })
  } catch(e) {
    return e
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
