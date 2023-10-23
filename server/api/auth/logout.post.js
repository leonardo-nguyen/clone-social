import { removeRefreshToken } from "../../db/refreshTokens"

export default defineEventHandler(async (event) => {
    try {
        const refreshToken = getCookie(event, 'refresh_token')
        // removeRefreshToken
        await removeRefreshToken(refreshToken);
    } catch (error) {
        throw error
    }

    sendRefreshToken(event,null)

    return {
        message: 'Done'
    }
})