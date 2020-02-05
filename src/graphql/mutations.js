/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProvider = `mutation CreateProvider(
  $input: CreateProviderInput!
  $condition: ModelProviderConditionInput
) {
  createProvider(input: $input, condition: $condition) {
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
export const updateProvider = `mutation UpdateProvider(
  $input: UpdateProviderInput!
  $condition: ModelProviderConditionInput
) {
  updateProvider(input: $input, condition: $condition) {
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
export const deleteProvider = `mutation DeleteProvider(
  $input: DeleteProviderInput!
  $condition: ModelProviderConditionInput
) {
  deleteProvider(input: $input, condition: $condition) {
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
export const createRoom = `mutation CreateRoom(
  $input: CreateRoomInput!
  $condition: ModelRoomConditionInput
) {
  createRoom(input: $input, condition: $condition) {
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
export const updateRoom = `mutation UpdateRoom(
  $input: UpdateRoomInput!
  $condition: ModelRoomConditionInput
) {
  updateRoom(input: $input, condition: $condition) {
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
export const deleteRoom = `mutation DeleteRoom(
  $input: DeleteRoomInput!
  $condition: ModelRoomConditionInput
) {
  deleteRoom(input: $input, condition: $condition) {
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
