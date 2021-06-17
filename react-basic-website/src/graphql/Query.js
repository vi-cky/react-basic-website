import { gql } from "@apollo/client";

export const Load_StateData = gql`
  query {
    getStateData {
      id
      statecode
      statename
    }
  }
`;
