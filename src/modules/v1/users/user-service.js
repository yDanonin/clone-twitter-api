const repository = require('../../../repository/user')
const crypto = require('crypto')

const createUser = async (user) => {
  try{
    user.password = _encriptyPassword(user.password)
    return await repository.insertUser(user)
  } catch(e) {
    throw new Error(e)
  }
}

const getAllUsers = async () => {
  try {
    return await repository.getAllUsers()
  } catch(e) {
    throw new Error(e)
  }
}

const _encriptyPassword = (password) => {
  return crypto.createHmac('sha256', process.env.SECRET_TO_PASSWORD).update(password).digest('hex')
}


module.exports = {
  createUser,
  getAllUsers
}