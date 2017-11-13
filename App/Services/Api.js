import FirebaseConfig from '../Config/FirebaseConfig'
import firebase from 'firebase'
import 'firebase/firestore'

// https://github.com/firebase/firebase-js-sdk/issues/183
global.Image = function () {}
firebase.initializeApp(FirebaseConfig)

const db = firebase.firestore()
const storage = firebase.storage()

const waypointsRef = db.collection('waypoints')
const directionsRef = db.collection('directions')
const pavesRef = db.collection('paves')

// const picturesStorageRef = storage.ref('pictures')
// const mapThumbnailsStorageRef = storage.ref('mapThumbnails')

const loginAnonymously = () =>
  new Promise((resolve, reject) => {
    firebase.auth().signInAnonymously()
  })

const getDirection = (id) =>
  directionsRef.doc(id).get()
    .then(doc => {
      if (!doc.exists) {
        throw new Error('EMPTY')
      }
      return doc.data()
    })
    .catch(error => ({ error }))

const getPave = (paveId) =>
  pavesRef.doc(paveId).get()
    .then(doc => {
      if (!doc.exists) {
        throw new Error('EMPTY')
      }
      return doc.data()
    })
    .catch(error => ({ error }))

const getWaypoint = (waypointId) =>
  waypointsRef.doc(waypointId).get()
    .then(doc => {
      if (!doc.exists) {
        throw new Error('EMPTY')
      }
      return doc.data()
    })
    .catch(error => ({ error }))

// const getPictureUrl = (filename) =>
//   picturesStorageRef.child(filename).getDownloadURL()
//     .then(url => ({ url }))
//     .catch(error => ({ error }))
//
// const getMapThumbnailUrl = (filename) =>
//   mapThumbnailsStorageRef.child(filename).getDownloadURL()
//     .then(url => ({ url }))
//     .catch(error => ({ error }))

const saveDirection = (directionId, data) => {

}

const savePave = (paveId, data) => {

}

const saveWaypoint = (waypointId, data) => {

}

const searchLocations = (query) => {

}

const searchRoutes = (from, to, filters) => {

}

export default {
  loginAnonymously,

  getDirection,
  getPave,
  getWaypoint,

  // getPictureUrl,

  saveDirection,
  savePave,
  saveWaypoint,

  searchLocations,
  searchRoutes
}
