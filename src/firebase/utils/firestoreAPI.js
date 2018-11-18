import * as firebase_constants from './firebase-constants';
import { firebase } from '../../firebase';

export const getAllDevicesDataForRoom = (uid, roomId) => {
  return firebase.db
    .collection(firebase_constants.USERS)
    .doc(uid)
    .collection(firebase_constants.ROOMS)
    .doc(roomId)
    .collection(firebase_constants.DEVICES)
    .get();
};

export const getDeviceDataFromRoom = (uid, roomId, deviceId) => {
  return firebase.db
    .collection(firebase_constants.USERS)
    .doc(uid)
    .collection(firebase_constants.ROOMS)
    .doc(roomId)
    .collection(firebase_constants.DEVICES)
    .doc(deviceId)
    .get();
};

export const getDeviceRef = (uid, roomId, deviceId) => {
  return firebase.db
    .collection(firebase_constants.USERS)
    .doc(uid)
    .collection(firebase_constants.ROOMS)
    .doc(roomId)
    .collection(firebase_constants.DEVICES)
    .doc(deviceId);
};
