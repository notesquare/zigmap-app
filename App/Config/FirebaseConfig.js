import DebugConfig from './DebugConfig'

const firebaseTestConfig = {
  apiKey: 'AIzaSyAS5D1rosTtExI6mdnWMjG_mjbT9amjdmM',
  authDomain: 'opendirection-1508138057112.firebaseapp.com',
  databaseURL: 'https://opendirection-1508138057112.firebaseio.com',
  projectId: 'opendirection-1508138057112',
  storageBucket: 'opendirection-1508138057112.appspot.com',
  messagingSenderId: '337173353921'
}

const firebaseProdConfig = {
  apiKey: 'AIzaSyAS5D1rosTtExI6mdnWMjG_mjbT9amjdmM',
  authDomain: 'opendirection-1508138057112.firebaseapp.com',
  databaseURL: 'https://opendirection-1508138057112.firebaseio.com',
  projectId: 'opendirection-1508138057112',
  storageBucket: 'opendirection-1508138057112.appspot.com',
  messagingSenderId: '337173353921'
}

export default DebugConfig.useFirebaseTestServer
  ? firebaseTestConfig
  : firebaseProdConfig
