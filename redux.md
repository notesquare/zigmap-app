### Redux architecture ###

## Reducers ##
```yaml
waypoint:
  {waypointId}:
    fetched:
    fetching:
    fetchError:
    saved: #!tf  
    # once saved -> immutable
    saving: #!tf
    saveError:
    name:
    text:
    location:
    mapThumbnailUrl:
    type:

direction:
  {directionId}:
    fetching:
    fetchError:
    # 'from waypoint' and direction to the 'to waypoint'
    saved: #!tf  
    # once saved -> immutable
    saving: #!tf
    saveError:
    editing: #!tf
    editError:
    from: {waypointId}
    to: {waypointId}
    type:
    time: #in minutes
    imageUrl:
    directionVector:

pave:
  {paveId}:
    fetching:
    fetchError:
    saved: #!tf  
    # once saved -> immutable
    saving: #!tf
    saveError:
    editing: #!tf
    editError:
    updating: #!tf
    updateError:

    from: {waypointId}
    to: {waypointId}
    directions:
      - directionId

current:
  newPaveCreating: #!tf
  newPaveCreateError: #!tf
  newPaveId: {paveId}

  newDirectionCreating: #!tf
  newDirectionCreateError: #!tf
  newDirectionId: {directionId}

  directions:
    - directionId
  paveId: {paveId}

  directionsList:
    -
      - {directionId}
  paveIdList:
    - {paveId}

search:
  location:
    searching: #!tf
    searchError:
    query:
    results:
      - {address}
      - {or waypoint}
  route:
    searching: #!tf
    searchError:
    from:
    to:
    filters:
    results:
      {searchType e.g. fastest}:
        - {customDirection}
        - {or directionId }
  pave:
    searching:
    searchError:
    results:
      - {paveId}
```

## Actions ##
```yaml
waypoint:
  - getWaypointRequest(waypointId)
  - getWaypointSuccess(waypointId, data)
  - getWaypointFailure(waypointId)
  - saveWaypointRequest(waypointId)
  - saveWaypointSuccess(waypointId)
  - saveWaypointFailure(waypointId)
  - setWaypoint(waypointId, data)

direction:
  - getDirectionRequest(directionId)
  - getDirectionSuccess(directionId, data)
  - getDirectionFailure(directionId)
  - saveDirectionRequest(directionId)
  - saveDirectionSuccess(directionId)
  - saveDirectionFailure(directionId)
  - setDirection(directionId, data)
  - editDirectionRequest(directionId)
    # 1. create a new directionId
    # 2. copy direction data to the new direction (setDirection)
    # 3. return new directionId
  - editDirectionSuccess(directionId)
  - editDirectionFailure(directionId)

pave:
  - getPaveRequest(paveId)
  - getPaveSuccess(paveId, data)
  - getPaveFailure(paveId)
  - savePaveRequest(paveId)
    # must update matching direction
  - savePaveSuccess(paveId)
  - savePaveFailure(paveId)
  - updatePaveRequest(paveId, update)
    # update : {append: {index, data}}
    # update : {set: {index, data}}
    # 1. create a new direction (editDirectionRequest)
    # 2. set data (setDirection)
    # 3. store new directionId (updatePaveSuccess)
  - updatePaveSuccess(paveId, data)
  - updatePaveFailure(paveId, data)
  - setPave(paveId, data)
  - editPaveRequest(directionId)
    # 1. create a new paveId
    # 2. copy pave data to the new pave (setPave)
    # 3. return new paveId
  - editPaveSuccess(directionId)
  - editPaveFailure(directionId)

current:
  - openDirections
    # set currentDirections
  - openPave
  - createDirectionRequest
    # retrieve a new directionId
  - createDirectionSuccess
  - createDirectionFailure
  - createPaveRequest
    # retrieve a new paveId
  - createPaveSuccess
  - createPaveFailure
  - addEmptyDirection(index)
  - removeDirection(directionId)
  - setDirections(directions)

search:
  - searchLocationsRequest(query)
  - searchLocationsSuccess(results)
  - searchLocationsFailure
  - searchRoutesRequest(from, to, filters)
  - searchRoutesSuccess(results)
  - searchRoutesFailure
  - setSearchData
```
