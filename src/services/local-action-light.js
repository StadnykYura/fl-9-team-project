import { firebase } from '../firebase';

import lightLogo from '../assets/icons/light-bulb-on.svg';
import noLightLogo from '../assets/icons/light-bulb-off.svg';

function turnOnOffLightInRoom(target, roomId, userID) {
  const uid = userID;
  if (uid) {
    let roomRef = firebase.db
      .collection('users')
      .doc(uid)
      .collection('rooms')
      .doc(roomId);

    roomRef
      .get()
      .then(function(doc) {
        let currentLightState = doc.data().turnOnOffLight;
        console.log(currentLightState);
        roomRef
          .update({
            turnOnOffLight: !currentLightState,
          })
          .then(function() {
            target.setAttributeNS(
              'http://www.w3.org/1999/xlink',
              'href',
              !currentLightState ? lightLogo : noLightLogo
            );
          });
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      });
  }
}

export default turnOnOffLightInRoom;
