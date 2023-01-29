require('dotenv').config()
const { getPrismaClient } = require('../datasource/prisma-datasource')
const prismaClient = getPrismaClient()

const main = async () => {
  const user = {
    name: process.env.MYNAME,
    apiKey: process.env.API_KEY
  }

  await prismaClient.provider.create({ data: user })  
}

main()
  .catch((e) => {
    console.error(e)
    throw e
  })
  .finally(async () => {
    await prismaClient.$disconnect()
    process.exit(0)
  })
