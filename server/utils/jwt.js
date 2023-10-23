import jwt from "jsonwebtoken"

const generateAccessToken = (user) => {
    const runtimeConfig = useRuntimeConfig();

    return jwt.sign({userId: user.id}, runtimeConfig.jwtAccessSecret, {
        expiresIn: '10m'
    })
}

const generateRefreshToken = (user) => {
    const runtimeConfig = useRuntimeConfig();

    return jwt.sign({userId: user.id}, runtimeConfig.jwtRefreshSecret, {
        expiresIn: '4h'
    })
}

export const decodeRefreshToken = (token) => {
    const runtimeConfig = useRuntimeConfig();

    try {
        return jwt.verify(token, runtimeConfig.jwtRefreshSecret)
    } catch (error) {
        return null;
    }
}

export const decodeAccessToken = (token) => {
    const runtimeConfig = useRuntimeConfig();

    try {
        return jwt.verify(token, runtimeConfig.jwtAccessSecret)
    } catch (error) {
        return null;
    }
}

export const generateTokens = (user) => {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return {
        accessToken,
        refreshToken
    }
}

export const sendRefreshToken = (event, token) => {
    setCookie(event, 'refresh_token', token, {
        httpOnly: true,
        sameSite: true
    })
}