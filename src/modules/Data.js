const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export let allTripsData = [];
export let currentTrip = null;
export let currentTripMemories = [];
export let currentMemory = null;

export async function getAllTrips(authToken) {
  const result = await fetch(backend_base + '/tripFolders?sort=startYear,startMonth', {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer ' + authToken
    }
  });
  if (!result.ok) {
    return null;
  }
  allTripsData = await result.json();
  //* Uncomment this sort for use with coho localserver.
  // allTripsData.sort((a, b) => {
  //   // https://levelup.gitconnected.com/sort-array-of-objects-by-two-properties-in-javascript-69234fa6f474
  //   if (a.startYear === b.startYear) {
  //     return a.startMonth < b.startMonth ? -1 : 1;
  //   } else {
  //     return a.startYear < b.startYear ? -1 : 1;
  //   }
  // });
  return allTripsData;
}

export async function getIndividualTrip(authToken, tripId) {
  if (allTripsData) {
    let curTrip = allTripsData.find(trip => trip._id === tripId);
    if (curTrip) {
      currentTrip = curTrip;
      return currentTrip;
    }
  }
  // If the above if statement does not successfully retrieve the data, then perform a database request.
  const result = await fetch(backend_base + `/tripFolders/${tripId}`, {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer ' + authToken
    }
  });
  if (!result.ok) {
    return null;
  }
  currentTrip = await result.json();
  return currentTrip;
}

export async function addTrip(authToken, data) {
  const response = await fetch(backend_base + '/tripFolders', {
    'method': 'POST',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(data)
  });
  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  return result;
}

export async function editDesiredTrip(authToken, tripID, data) {
  const response = await fetch(backend_base + `/tripFolders/${tripID}`, {
    'method': 'PATCH',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(data)
  });
  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  updateCurrentTrip(result);
  return result;
}

export async function deleteDesiredTrip(authToken, tripID) {
  const response = await fetch(backend_base + `/tripFolders/${tripID}`, {
    'method': 'DELETE',
    'headers': {
      'Authorization': 'Bearer ' + authToken
    }
  });
  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  return result;
}

export async function deleteTripMemories(authToken, tripID) {
  const response = await fetch(backend_base + `/deleteMemories?trip=${tripID}`, {
    'method': 'DELETE',
    'headers': {
      'Authorization': 'Bearer ' + authToken
    }
  });
  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  return result;
}

export async function getAllMemories(authToken, tripId) {
  const result = await fetch(backend_base + `/tripMemories?parentTripId=${tripId}&sort=category,date`, {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer ' + authToken
    }
  });
  if (!result.ok) {
    return null;
  }
  currentTripMemories = await result.json();
  //* Uncomment this sort for use with coho localserver.
  // currentTripMemories.sort((a, b) => {
  //   // https://levelup.gitconnected.com/sort-array-of-objects-by-two-properties-in-javascript-69234fa6f474
  //   if (a.category === b.category) {
  //     return a.date < b.date ? -1 : 1;
  //   } else {
  //     return a.category < b.category ? -1 : 1;
  //   }
  // });
  return currentTripMemories;
}

export async function getIndividualMemory(authToken, memoryID) {
  if (currentTripMemories) {
    let curMemory = currentTripMemories.find(memory => memory._id === memoryID);
    if (curMemory) {
      currentMemory = curMemory;
      return currentMemory;
    }
  }
  // If the above if statement does not successfully retrieve the data, then perform a database request.
  const result = await fetch(backend_base + `/tripMemories/${memoryID}`, {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer ' + authToken
    }
  });
  if (!result.ok) {
    return null;
  }
  currentMemory = await result.json();
  return currentMemory;
}

export async function addMemory(authToken, data) {
  const response = await fetch(backend_base + '/tripMemories', {
    'method': 'POST',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(data)
  });
  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  return result;
}

export async function deleteMemory(authToken, memoryID) {
  const response = await fetch(backend_base + `/tripMemories/${memoryID}`, {
    'method': 'DELETE',
    'headers': {
      'Authorization': 'Bearer ' + authToken
    }
  });
  if (!response.ok) {
    return null;
  }
  const result = await response.json();
  removeMemory(memoryID);
  return result;
}

export async function updateMemory(authToken, memoryID, data) {
  const response = await fetch (backend_base + `/tripMemories/${memoryID}`, {
    'method': 'PATCH',
    'headers': {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(data)
  });
  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  updateCurrentMemory(result);
  return currentMemory;
}

export function updateTripsData(newTripsData) {
  allTripsData = newTripsData;
}

export function updateCurrentTrip(newTrip) {
  currentTrip = newTrip;
}

export function removeTrip(tripId) {
  const index = allTripsData.findIndex(trip => trip._id === tripId);
  allTripsData.splice(index, 1);
}

export function updateMemories(newMemories) {
  currentTripMemories = newMemories;
}

export function updateCurrentMemory(newMemory) {
  currentMemory = newMemory;
}

export function removeMemory(memoryId) {
  const index = currentTripMemories.findIndex(memory => memory._id === memoryId);
  currentTripMemories.splice(index, 1);
}