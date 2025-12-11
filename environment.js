const constants = require("./constants");

module.exports = {
  getOcApiHost: () => {
    const active_env = constants.environment.env;
    return (active_env === constants.environment.prod) ?
      constants.environment.wellgo_oc_api_svr : constants.environment.wellgo_dev_oc_api_svr;
  },
  getState: () => {
    const active_env = constants.environment.env;
    const client_url = (active_env === constants.environment.prod)
                        ? constants.client_url : constants.dev_client_url;
    const mongodb_svr_url = (active_env === constants.environment.prod)
                        ? process.env.MONGO_DB_PRODUCTION_URL : process.env.MONGO_DB_URL;
    const payment_processor = constants.stripe;
    const flights_api_provider = constants.duffel;
    const ticket_issuer = "SVR N/A"
    return {
      active_env,
      client_url,
      mongodb_svr_url,
      payment_processor,
      flights_api_provider,
      ticket_issuer,
    }
  }
}
