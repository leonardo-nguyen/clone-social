import {prisma} from "."
import bcrypt from "bcrypt"

export const createUser = (userData) => {
    return prisma.user.create({
        data: {
            ...userData,
            password: bcrypt.hashSync(userData.password,10)
        }
    })
}

export const getUserByUsername = (username) => {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}

export const getUserById = (id) => {
    return prisma.user.findUnique({
        where: {
            id
        }
    })
}