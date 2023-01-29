const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

const getPrismaClient = () => {
  return client
}

module.exports = {
  getPrismaClient
}