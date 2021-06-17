import { gql } from "@apollo/client";

export const CREATE_STATE = gql`
  mutation createState($statecode: String!, $statename: String!, $id: Int!) {
    createState(statecode: $statecode, statename: $statename, id: $id) {
      success
      message
    }
  }
`;
export const DELETE_STATE = gql`
  mutation DeleteState($id: Int!) {
    DeleteState(id: $id) {
      success
      message
    }
  }
`;
export const Update_STATE = gql`
  mutation UpdateState($statecode: String!, $statename: String!, $id: Int!) {
    UpdateState(statecode: $statecode, statename: $statename, id: $id) {
      success
      message   
    }
  }
`;
