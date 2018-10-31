// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';

// import { auth } from '../firebase';
// import * as routes from '../constants/routes'

// function SignInPage({ history }) {
//   return (
//     <div>
//       <h1>Sign In</h1>
//       <SignInForm history={history} />
//     </div>
//   )
// }

// const stateSetter = (propName, value) => ({
//   [propName]: value,
// });

// const initial_state = {
//   email: '',
//   password: '',
//   error: null,
// }

// class SignInForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { ...initial_state };
//   }

//   // arrow function remembers the context
//   onSubmit = (event) => {
//     const {
//       email,
//       password,
//     } = this.state;

//     const {
//       history,
//     } = this.props;

//     auth.doSignInWithEmailAndPassword(email, password)
//       .then(authUser => {
//         console.log(authUser);
//         this.setState({...initial_state});
//         history.push(routes.HOME);
//       }).catch(error => {
//         this.setState(stateSetter('error', error));
//       })

//     event.preventDefault();
//   }

//   handleChange(event, property) {
//     return this.setState(stateSetter(property, event.target.value));
//   }

//   render() {

//     const {
//       email,
//       password,
//       error
//     } = this.state;

//     const isInvalid = email === '' || password === '';

//     return (
//       <form onSubmit={this.onSubmit}>
//         <input
//           value={email}
//           type='text'
//           placeholder='Email Address'
//           onChange={event => this.handleChange(event, 'email')}
//         />
//         <input
//           value={password}
//           type='password'
//           placeholder='Password'
//           onChange={event => this.handleChange(event, 'password')}
//         />
//         <button disabled={isInvalid} type='submit'>
//           Sign In
//         </button>

//         {error && <p>{error.message}</p>}
//       </form>
//     );
//   }
// }

// export default withRouter(SignInPage);

// export {
//   SignInForm,
// }
