import { getRefreshTokenByToken } from "../../db/refreshTokens";
import { decodeRefreshToken, generateTokens } from "../../utils/jwt";
import { getUserById } from "../../db/users";
export default defineEventHandler(async (event) => {
    const refreshToken = getCookie(event, 'refresh_token');

    if(!refreshToken){
        sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }

    const rToken = await getRefreshTokenByToken(refreshToken);

    if(!rToken){
        sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }

    const token = decodeRefreshToken(refreshToken);

    try {
        const user = await getUserById(token.userId);

        const { accessToken } = generateTokens(user);
        return {
            accessToken
        }
    } catch (error) {
        sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        }))
    }
})