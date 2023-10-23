import { getUserByUsername } from "../../db/users";
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "../../utils/jwt";
import { userTransformer } from "../../transformers/user";
import { createRefreshToken } from "../../db/refreshTokens";
export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {username, password} = body;

    if(!username || !password){
        return sendError(event, createError({
            statusCode: 400, statusMessage: 'Invalid Params'
        }))
    }

    // Is the user registered
    const user = await getUserByUsername(username);

    if(!user){
        return sendError(event, createError({
            statusCode: 400, statusMessage: 'User is invalid'
        }))
    }

    // Compare passwords
    const doesThePasswordMatch = await bcrypt.compare(password, user.password);

    if(!doesThePasswordMatch){
        return sendError(event, createError({
            statusCode: 400, statusMessage: 'Password is incorrect'
        }))
    }

    // Generate Tokens
    // Access Token
    // Refresh Token
    const { accessToken, refreshToken} = generateTokens(user);

    // Save it inside db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    // Add http only cookie
    sendRefreshToken(event, refreshToken);

    return {
        accessToken,
        user: userTransformer(user)
    }
})