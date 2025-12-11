module.exports = {
    duffel: "DUFFEL",
    amadeus: "AMADEUS",
    sabre: "SABRE",
    stripe: "STRIPE",
    dev: "DEVELOPMENT",
    prod: "PRODUCTION",
    duffel_sort_total_amount: "total_amount",
    duffel_max_connections: 1,
    default_pagination_page_limit: 100,
    client_url: "http://www.welldugo.com",
    dev_client_url: "http://localhost:3000",
    weather: {
        providers: {
            open_meteo: "open-meteo",
        }
    },
    price_markup_percentage: 15,
    price_markup_types: {
        percentage: "percentage",
        flat_rate: "flat_rate"
    },
    email: {
        automated_from: "adinanaries@outlook.com",
        admins_to: "welldugo.btc@gmail.com",
    },
    environment: {
        env: "production", // "development", // For Setting Current Evironment State -> [ production, development, staging ]
        prod: "production",
        dev: "development",
        stage: "staging",
        wellgo_oc_api_svr: "https://welldugo-oc-prod-backend-b7f63faaa3a9.herokuapp.com",
        wellgo_dev_oc_api_svr: "http://localhost:4000"
    },
    app_services_fees: {
        types: {
            all_products: -1,
            flights: 0,
            stays: 1,
            cars: 2,
            packages: 3,
            deals: 4
        }
    },
    ai: {
        openai: {
            topics: {

            }
        }
    }
}
