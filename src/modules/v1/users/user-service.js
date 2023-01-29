const repository = require('../../../repository/provider')

const getApiKeys = async () => {
  try{
    return await repository.getApiKeys()
  } catch(e) {
    throw new Error(e)
  }
}

module.exports = {
  getApiKeys
}