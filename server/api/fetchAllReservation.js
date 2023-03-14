import {GraphQLClient, gql} from "graphql-request";

export default defineEventHandler(() => {
    async function main() {

        const {endpoint, headers} = useRuntimeConfig()

        const graphQLClient = new GraphQLClient(endpoint, {headers})

        const getAllReservations = gql`
            query getAllReservations ($after: Cursor){
                lane_reservationsCollection (after: $after) {
                    edges {
                        node {
                            reservation_id
                            reservation_date
                            time_added
                            staffs{
                                staff_first_name
                                staff_middle_name
                            }
                            lane_reservations_paymentsCollection{
                                edges{
                                    node{
                                        deposit
                                        balance
                                        amount_payment
                                        card_payment
                                        time_payment
                                        on_site_payment
                                        gift_card_payment
                                        time_payment
                                        staffs{
                                            staff_first_name
                                            staff_middle_name
                                            staff_last_name
                                        }
                                    }
                                }
                            }
                            guests {
                                guest_first_name
                                guest_middle_name
                                guest_last_name
                                guests_contacts_informationCollection {
                                    edges {
                                        node {
                                            guest_contact_phone
                                            guest_contact_fax
                                            guest_contact_email_address
                                        }
                                    }
                                }
                            }
                            lane_reservation_entriesCollection {
                                edges {
                                    node {
                                        bowling_lanes {
                                            lane_number
                                        }
                                        entry_time_from
                                        entry_time_to
                                    }
                                }
                            }
                            number_players
                            detail
                            active
                            removable
                        }
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                        hasPreviousPage
                        startCursor
                    }
                }
            }
        `

        let currentPaging = true
        let nextCursor = null
        let arr = []

        while(currentPaging) {
            const data = await graphQLClient.request(getAllReservations, {
                after: nextCursor
            })
            nextCursor = data.lane_reservationsCollection.pageInfo.endCursor
            arr.push(...data.lane_reservationsCollection.edges)
            currentPaging = data.lane_reservationsCollection.pageInfo.hasNextPage
        }

        return arr

    }

    return main()
})