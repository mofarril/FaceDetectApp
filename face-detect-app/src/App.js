import React from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import SignInNavigation from './components/Navigation/SignInNavigation';
import SignInForm from './components/SignInForm/SignInForm';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'


const app = new Clarifai.App({
  apiKey: '2f93a00613d243e994651cbd94f48d29'
});

const particleOptions = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: ('signIn'),
      isSignedIn: false
    }
  }
  calculateFaceLocation = (data) => {

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  };

  boxFace = (box) => {
        this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.boxFace(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState({isSignedIn: false})
    } else if ( route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state; 
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
        />

        <SignInNavigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onImputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signIn' ?
              <SignInForm onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
          )

        }
      </div>
    );
  }
}

export default App;