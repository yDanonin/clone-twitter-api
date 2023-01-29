const { getPrismaClient } = require('../datasource/prisma-datasource')

const getProviderByApiKey = async (apiKey) => {
  try{
    const dbClient = getPrismaClient()
    return await dbClient.provider.findFirst({
      where: {
        apiKey: apiKey
      }
    })
  } catch (e) {
    return e
  }
}

const getApiKeys = async () => {
  try{
    const dbClient = getPrismaClient()
    return await dbClient.provider.findMany()
  } catch (e) {
    return e
  }

}


module.exports = {
  getProviderByApiKey,
  getApiKeys
}