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
  allTripsData = await result.json();
  //* Uncomment this sort for use with coho localserver.
  allTripsData.sort((a, b) => {
    // https://levelup.gitconnected.com/sort-array-of-objects-by-two-properties-in-javascript-69234fa6f474
    if (a.startYear === b.startYear) {
      return a.startMonth < b.startMonth ? -1 : 1;
    } else {
      return a.startYear < b.startYear ? -1 : 1;
    }
  });
  return allTripsData;
}

export async function getAllMemories(authToken, tripId) {
  const result = await fetch(backend_base + `/tripMemories?parentTripId=${tripId}&sort=category,date`, {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer ' + authToken
    }
  });
  currentTripMemories = await result.json();
  //* Uncomment this sort for use with coho localserver.
  currentTripMemories.sort((a, b) => {
    // https://levelup.gitconnected.com/sort-array-of-objects-by-two-properties-in-javascript-69234fa6f474
    if (a.category === b.category) {
      return a.date < b.date ? -1 : 1;
    } else {
      return a.category < b.category ? -1 : 1;
    }
  });
  return currentTripMemories;
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
  currentTrip = await result.json();
  return currentTrip;
}

export async function getIndividualMemory(authToken, memoryId) {
  if (currentTripMemories) {
    let curMemory = allTripsData.find(memory => memory._id === memoryId);
    if (curMemory) {
      currentMemory = curMemory;
      return currentMemory;
    }
  }
  // If the above if statement does not successfully retrieve the data, then perform a database request.
  const result = await fetch(backend_base + `/tripMemories/${memoryId}`, {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer ' + authToken
    }
  });
  currentMemory = await result.json();
  return currentMemory;
}

export function updateTripsData(newTripsData) {
  allTripsData = newTripsData;
}

export function removeTrip(tripId) {
  const index = allTripsData.findIndex(trip => trip._id === tripId);
  allTripsData.splice(index, 1);
}

export function updateMemories(newMemories) {
  currentTripMemories = newMemories;
}

export function removeMemory(memoryId) {
  const index = currentTripMemories.findIndex(memory => memory._id === memoryId);
  currentTripMemories.splice(index, 1);
}

export function updateCurrentMemory(newMemory) {
  currentMemory = newMemory;
}