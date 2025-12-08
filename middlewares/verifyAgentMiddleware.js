const asyncHandler = require("express-async-handler");
const { getOcApiHost } = require("../environment");
const { make_get_request } = require("../fetch_request/fetch_request");

const approveTransaction = asyncHandler(async (req, res, next)=>{
    try{

        const {
            oc_user_id,
        } = req.body.activity;

        let path = "\\api\\agents\\public\\verify-agent-account-status\\";
        let url = (getOcApiHost()+path+oc_user_id);
        let agent_status_info = await make_get_request(url);
        console.log(agent_status_info);
        let res_message="";
        const {
            is_account_approved,
            is_wallet_ok,
            is_price_bound_profit_ok,
            is_compliant,
            is_compliance_documents_ok,
            is_data_supplier_set,
            is_business_info_ok,
            is_business_bank_ok,
            wallet_current_balance,
        } = agent_status_info;

        if(!is_account_approved){
            res_message="Agent account is not approved";
            res.status(401);
            res.send({message: res_message, status: 401});
            return;
        }
        if(!is_wallet_ok){
            res_message="Agent wallet is not yet setup or has no balance remaining";
            res.status(401);
            res.send({message: res_message, status: 401});
            return;
        }
        if(!is_compliant /*|| !is_compliance_documents_ok*/){
            res_message="Agent account doesn't meet legal compliance";
            res.status(401);
            res.send({message: res_message, status: 401});
            return;
        }

        if(is_account_approved &&
            is_wallet_ok &&
            is_compliant /*&&
            is_compliance_documents_ok*/){
            next();
        }
            
    } catch(err) {
        console.log(err);
        res.status(401);
        res.send({message: "Error during agent status verification", status: 401});
    }
});

const isAgentVerified = asyncHandler(async (req, res, next)=>{
    try{

        const {
            oc_user_id,
        } = req.body.activity;

        let path = "\\api\\agents\\public\\verify-agent-account-status\\";
        let url = (getOcApiHost()+path+oc_user_id);
        let agent_status_info = await make_get_request(url);
        
        let res_message="";
        const {
            is_account_approved,
        } = agent_status_info;

        if(!is_account_approved){
            res_message="Agent account is not approved";
            res.status(401);
            res.send({message: res_message, status: 401});
            return;
        }

        if(is_account_approved){
            next();
        }
            
    } catch(err) {
        console.log(err);
        res.status(401);
        res.send({message: "Error during agent status verification", status: 401});
    }
});

module.exports = {
   approveTransaction,
   isAgentVerified
}
