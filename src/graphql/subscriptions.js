/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProvider = `subscription OnCreateProvider {
  onCreateProvider {
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
export const onUpdateProvider = `subscription OnUpdateProvider {
  onUpdateProvider {
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
export const onDeleteProvider = `subscription OnDeleteProvider {
  onDeleteProvider {
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
export const onCreateRoom = `subscription OnCreateRoom {
  onCreateRoom {
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
export const onUpdateRoom = `subscription OnUpdateRoom {
  onUpdateRoom {
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
export const onDeleteRoom = `subscription OnDeleteRoom {
  onDeleteRoom {
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
