import { API } from 'aws-amplify';
import * as videos from './videos';

export async function CallGraphQlWithAPIKey(query, variables) {

    const payload = {
        query: query,
        authMode: 'API_KEY'
    }

    if (variables) {
        payload.variables = variables
    }

    try {
        const res = await API.graphql(payload)
        console.log(res)
        return res
    }
    catch (e) {
        if (e.errors.length > 0) {
            e.errors.forEach(element => {
                console.log(element.message, 'error')
            });
        }
        return false
    }
}

export default AllAPI = {
    videos
}