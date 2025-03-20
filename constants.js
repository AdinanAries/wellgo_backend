module.exports = {
    duffel: "DUFFEL",
    stripe: "STRIPE",
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
    email: {
        automated_from: "adinanaries@outlook.com",
        admins_to: "welldugo.btc@gmail.com",
    },
    environment: {
      env: "production", // For Setting Current Evironment State -> [ production, development, staging ]
      prod: "production",
      dev: "development",
      stage: "staging",
    },
    ai: {
        openai: {
            topics: {

            }
        }
    }
}
