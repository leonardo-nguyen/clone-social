import jwt_decode from "jwt-decode"

export default () => {
    const useAuthToken = () => useState('auth_token');
    const useAuthUser = () => useState('auth_user');
    const useAuthLoading = () => useState('auth_loading', () => true);

    const setToken = (newToken) => {
        const authToken = useAuthToken();
        authToken.value = newToken;
    }

    const setUser = (newUser) => {
        const authUser = useAuthUser();
        authUser.value = newUser;
    }

    const setIsAuthLoading = (value) => {
        const authLoading = useAuthLoading();
        authLoading.value = value;
    }
    const refreshToken = async () => {
        try {
            const data = await $fetch("/api/auth/refresh");
            setToken(data.accessToken);
        } catch (error) {
            throw error
        }
    }

    const getUser = async () => {
        try {
            const data = await useFetchApi("/api/auth/user");
            setUser(data.user);
        } catch (error) {
            throw error
        }
    }

    const reRefreshAccessToken = () => {
        const authToken = useAuthToken();

        if(!authToken) return

        const decoded = jwt_decode(authToken.value);
        
        const newRefreshTime = decoded.exp;

        setTimeout(async () => {
            await refreshToken();
            reRefreshAccessToken();
        }, newRefreshTime);
    }

    const initAuth = async () => {
        try {
            setIsAuthLoading(true);
            await refreshToken();
            await getUser();

            reRefreshAccessToken();
        } catch (error) {
            
        } finally {
            setIsAuthLoading(false);
        }
    }

    const login = async ({username, password}) => {
        try{
            const data = await $fetch('/api/auth/login', {
                method: 'POST',
                body: {
                    username,
                    password
                }
            })
            setToken(data.accessToken);
            setUser(data.user);

            console.log(data);
        }
        catch(error){

        }
    }

    const logout = async () => {
        try {
            await useFetchApi('/api/auth/logout', {
                method: 'POST'
            })
            setToken(null);
            setUser(null)
        } catch (error) {
            throw error
        }
    }

    return {
        login,
        useAuthUser,
        useAuthToken,
        useAuthLoading,
        initAuth,
        logout
    }
}