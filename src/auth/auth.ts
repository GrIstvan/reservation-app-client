let _accessToken: string | null = null 

export const setAccessToken = (accessToken: string | null) => {
    _accessToken = accessToken
}

export const getAccessToken = () => {
    return _accessToken
}