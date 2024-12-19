const constants = require("./constants");

module.exports = {
  getState: () => {
    const active_env = constants.environment.env;
    const client_url = (active_env === constants.environment.prod)
                        ? constants.client_url : constants.dev_client_url;
    const mongodb_svr_url = (active_env === constants.environment.prod)
                        ? process.env.MONGO_DB_PRODUCTION_URL : process.env.MONGO_DB_URL;
    return {
      active_env,
      client_url,
      mongodb_svr_url,
    }
  }
}
