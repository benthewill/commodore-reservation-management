import {GraphQLClient, gql} from "graphql-request";

export default defineEventHandler(() => {
    async function main() {

        const {endpoint, headers} = useRuntimeConfig()

        const graphQLClient = new GraphQLClient(endpoint, {headers})

        const getAllLanes = gql`
            query getAllLanes {
                bowling_lanesCollection{
                    edges {
                        node {
                            lane_number
                            lane_id
                        }
                    }
                }
            }
        `

        const data = await graphQLClient.request(getAllLanes)

        return data

    }

    return main()
})