/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProvider = `query GetProvider($id: ID!) {
  getProvider(id: $id) {
    id
    name
    contactNumber
    picture {
      bucket
      region
      key
    }
    onCall
    providerType
    role
    todaysRole
  }
}
`;
export const listProviders = `query ListProviders(
  $filter: ModelProviderFilterInput
  $limit: Int
  $nextToken: String
) {
  listProviders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      contactNumber
      picture {
        bucket
        region
        key
      }
      onCall
      providerType
      role
      todaysRole
    }
    nextToken
  }
}
`;
export const getRoom = `query GetRoom($id: ID!) {
  getRoom(id: $id) {
    id
    roomNumber
    contactNumber
    providerName
    picture {
      bucket
      region
      key
    }
    dummyPic {
      bucket
      region
      key
    }
  }
}
`;
export const listRooms = `query ListRooms(
  $filter: ModelRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      roomNumber
      contactNumber
      providerName
      picture {
        bucket
        region
        key
      }
      dummyPic {
        bucket
        region
        key
      }
    }
    nextToken
  }
}
`;
export const searchProviders = `query SearchProviders(
  $filter: SearchableProviderFilterInput
  $sort: SearchableProviderSortInput
  $limit: Int
  $nextToken: String
) {
  searchProviders(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      contactNumber
      picture {
        bucket
        region
        key
      }
      onCall
      providerType
      role
      todaysRole
    }
    nextToken
    total
  }
}
`;
