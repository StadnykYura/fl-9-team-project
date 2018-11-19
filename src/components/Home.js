import React, { Component } from 'react';

import HomepageNavTop from '../features/home-page/homepage-nav-top/homepage-nav-top';
import HomepageNavBottom from '../features/home-page/homepage-nav-bottom/homepage-nav-bottom';
//import FlatView from '../features/home-page/flat-view/flat-view';
import FlatViewLoader from '../features/home-page/flat-view/FlatViewLoader/FlatViewLoader';

import { firebase } from '../firebase';
//import LivingRoom from '../features/home-page/flat-view/livingRoom';
import Flat from '../features/home-page/flat-view/flat';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomsData: null,
      isLoading: false,
    };

    this.handleGlobalLightChange = this.handleGlobalLightChange.bind(this);
  }

  handleGlobalLightChange() {
    this.setState({
      isLoading: true,
    });
    this.firebaseApiGetRoomsWithStateChange();
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    this.firebaseApiGetRoomsWithStateChange();
  }

  firebaseApiGetRoomsWithStateChange() {
    const uid = this.props.auth.userUID;
    let roomsData = [];
    if (uid) {
      firebase.db
        .collection('users')
        .doc(uid)
        .collection('rooms')
        .get()
        .then(documents => {
          documents.docs.forEach(document => {
            roomsData.push({
              roomID: document.id,
              roomInfo: document.data(),
            });
          });
          this.setState({
            roomsData: roomsData,
            isLoading: false,
          });
        });
    }
  }

  render() {
    const { roomsData, isLoading } = this.state;
    return (
      <React.Fragment>
        <div className="page">
          <div className="home-nav-wrapper">
            <HomepageNavTop />
          </div>
          <div className="flat-container">
            {isLoading ? (
              <FlatViewLoader />
            ) : (
              //<FlatView
              <Flat roomsData={roomsData} userUID={this.props.auth.userUID} />
            )}
          </div>
          <div className="home-nav-wrapper">
            <HomepageNavBottom
              globalLightChange={this.handleGlobalLightChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Home;

// import React, { Component } from 'react';

// import HomepageNavTop from '../features/home-page/homepage-nav-top/homepage-nav-top';
// import HomepageNavBottom from '../features/home-page/homepage-nav-bottom/homepage-nav-bottom';
// import FlatView from '../features/home-page/flat-view/flat-view';
// import FlatViewLoader from '../features/home-page/flat-view/FlatViewLoader/FlatViewLoader';

// import { firebase } from '../firebase';
// class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       roomsData: null,
//       isLoading: false,
//     };

//     this.handleGlobalLightChange = this.handleGlobalLightChange.bind(this);
//   }

//   handleGlobalLightChange() {
//     this.setState({
//       isLoading: true,
//     });
//     this.firebaseApiGetRoomsWithStateChange();
//   }

//   componentDidMount() {
//     this.setState({
//       isLoading: true,
//     });
//     this.firebaseApiGetRoomsWithStateChange();
//   }

//   firebaseApiGetRoomsWithStateChange() {
//     const uid = this.props.auth.userUID;
//     let roomsData = [];
//     if (uid) {
//       firebase.db
//         .collection('users')
//         .doc(uid)
//         .collection('rooms')
//         .get()
//         .then(documents => {
//           documents.docs.forEach(document => {
//             roomsData.push({
//               roomID: document.id,
//               roomInfo: document.data(),
//             });
//           });
//           this.setState({
//             roomsData: roomsData,
//             isLoading: false,
//           });
//         });
//     }
//   }

//   render() {
//     const { roomsData, isLoading } = this.state;
//     return (
//       <React.Fragment>
//         <div className="page">
//           <div className="home-nav-wrapper">
//             <HomepageNavTop />
//           </div>
//           <div className="flat-container">
//             {isLoading ? (
//               <FlatViewLoader />
//             ) : (
//               <FlatView
//                 roomsData={roomsData}
//                 userUID={this.props.auth.userUID}
//               />
//             )}
//           </div>
//           <div className="home-nav-wrapper">
//             <HomepageNavBottom
//               globalLightChange={this.handleGlobalLightChange}
//             />
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default Home;
