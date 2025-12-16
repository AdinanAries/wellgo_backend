const {
    getOcApiHost
} = require("../environment");
const { make_post_request, make_get_request } = require("../fetch_request/fetch_request");

const SVR_URL = getOcApiHost();
const TRANS_SERVER_API_END_POINT = "\\api\\wallets\\agent\\transaction\\create\\";

const commit_api_call_transaction = async ({
    oc_user_id,
    unit_quantity,
    unit_action_point_quantity,
    description,
}) => {
    const TRANS_TYPE_CONST = 100000; // Trans type of Server API Calls
    let url = (SVR_URL+TRANS_SERVER_API_END_POINT);
    let _res = await make_post_request(
        url,
        {
            oc_user_id,
            transaction_type_constant: TRANS_TYPE_CONST,
            unit_quantity,
            unit_action_point_quantity,
            description,
        }
    );
    return _res;
}

const commit_email_sent_transaction = async ({
    oc_user_id,
    unit_quantity,
    unit_action_point_quantity,
    description,
}) => {
    const TRANS_TYPE_CONST = 1000; // Trans type of Email Sent
    let url = (SVR_URL+TRANS_SERVER_API_END_POINT);
    let _res = await make_post_request(
        url,
        {
            oc_user_id,
            transaction_type_constant: TRANS_TYPE_CONST,
            unit_quantity,
            unit_action_point_quantity,
            description,
        }
    );
    return _res;
}

const commit_cloud_storage_cost_per_gb_transaction = async ({
    oc_user_id,
    unit_quantity,
    unit_action_point_quantity,
    description,
}) => {
    const TRANS_TYPE_CONST = 10000; // Trans type of Cloud Storage Cost Per GB
    let url = (SVR_URL+TRANS_SERVER_API_END_POINT);
    let _res = await make_post_request(
        url,
        {
            oc_user_id,
            transaction_type_constant: TRANS_TYPE_CONST,
            unit_quantity,
            unit_action_point_quantity,
            description,
        }
    );
    return _res;
}

const commit_standard_ai_request_transaction = async ({
    oc_user_id,
    unit_quantity,
    unit_action_point_quantity,
    description,
}) => {
    const TRANS_TYPE_CONST = 1000000; // Trans Type For Standard AI Request
    let url = (SVR_URL+TRANS_SERVER_API_END_POINT);
    let _res = await make_post_request(
        url,
        {
            oc_user_id,
            transaction_type_constant: TRANS_TYPE_CONST,
            unit_quantity,
            unit_action_point_quantity,
            description,
        }
    );
    return _res;
}

module.exports = {
    commit_api_call_transaction,
    commit_email_sent_transaction,
    commit_cloud_storage_cost_per_gb_transaction,
    commit_standard_ai_request_transaction,
}