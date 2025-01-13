import { IContext } from "../Types/IContext";

const CreatePaymentRequest = (AppContext:IContext) => {

  const { create_transaction_response, credit_card_data } = AppContext

    return{
    reference: create_transaction_response.reference,
    tokenId: credit_card_data.token_id,
    installments: credit_card_data.installments,
    acceptanceToken: create_transaction_response.acceptanceToken.acceptance_token,
    personalDataToken: create_transaction_response.personalDataToken.acceptance_token,
  }
}

export default CreatePaymentRequest;