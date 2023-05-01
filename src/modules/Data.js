const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// Cached data.
export let allTripsData = [];
export let currentTrip = null;
export let currentTripMemories = [];
export let currentMemory = null;

// Retrieves all trips, updates the cached trips, then returns it.
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

// If all of the trips are cached, then search through them for the requested trip. If the
// requested trip is found, update the cached trip then return it. If the requested trip
// is not found in the cache, then perform a database request for the individual trip, then
// update the currentTrip cache and return it.
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

// Add a trip to the database.
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

// Edit the requested trip, update the cached trip, then return the result.
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

// Delete the requested trip. Then return the _id.
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

// Delete all memories associated with a specified trip. This only runs after a 
// trip has been deleted to delete that trip's memories.
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

// Retrieves all memories, updates the cached memories, then returns it.
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

// If all of the memories for a trip are cached, then search through them for the requested memory. 
// If the requested memory is found, update the cached memory then return it. If the requested memory
// is not found in the cache, then perform a database request for the individual memory, then
// update the currentMemory cache and return it.
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

// Add a memory to the database.
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

// Delete the requested memory from the database. Then update the currentMemories cache.
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

// Update the requested memory.
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

// Update the cached trips.
export function updateTripsData(newTripsData) {
  allTripsData = newTripsData;
}

// Update the cached current trip.
export function updateCurrentTrip(newTrip) {
  currentTrip = newTrip;
}

// Remove a trip from the cached trips.
export function removeTrip(tripId) {
  const index = allTripsData.findIndex(trip => trip._id === tripId);
  allTripsData.splice(index, 1);
}

// Update the cached memories.
export function updateMemories(newMemories) {
  currentTripMemories = newMemories;
}

// Update the cached current memory.
export function updateCurrentMemory(newMemory) {
  currentMemory = newMemory;
}

// Remove a memory from the cached memories.
export function removeMemory(memoryId) {
  const index = currentTripMemories.findIndex(memory => memory._id === memoryId);
  currentTripMemories.splice(index, 1);
}