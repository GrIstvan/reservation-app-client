import axios from "axios"
import {getAccessToken} from '../auth/auth'


export function getAllProviders(pageIdx: number, searchTerm: string) {

    const token = getAccessToken();

    return (axios.get('http://localhost:3000/api/providers', {
        params: {
            page: pageIdx,
            limit: 10,
            search: searchTerm
        },headers: {Authorization: "Bearer " + token}
    }))
}

