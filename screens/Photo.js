import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { FaceDetector } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const pictureSize = 150;

const imageInfo = []

export default class Photo extends React.Component {
  state = {
    selected: false,
    faces: [],
    image: null,
  };
  _mounted = false;


  componentDidMount() {
    console.log(this.state.image)
    this._mounted = true;
  }

  componentWillUnmount() {
    console.log(this.state.image)
    this._mounted = false;
  }

  toggleSelection = () => {
    this.setState(
      { selected: !this.state.selected },
      () => this.props.onSelectionToggle(this.props.uri, this.state.selected)
    );
  }

  generateStats = () =>
    //one If function that says
    //'If this part of the image id string exists
    //Then do not run this and throw an error that says
    //'You already got stats for this guy

    //else, generate stats and drop that in a db
    //LOOK UP: React-Redux react-native? or do i just do it on
    //the component? i don't mind making that call
    //but yeah i'd prefer not to lol

    //Create another component though that passes
    //Everything in the database and we show the stats
    //With the pictures next to it?

    //Let's definitely juice up the
    //component display though for REAL

    //SO: 1. Look up what kind of db connections
    //we can make with REact Native (ask the group?)
    //1a. Read about FileSystem on expo, which
    //seems to fucntion as a db(?)
    //2. Set that up, figure out how to grab that
    //hash number
    //3. Built that component so it works
    //4. Make it look pretty AND do something else?
    // ^ this will depend on the time we have
    FaceDetector.detectFacesAsync(this.props.uri, {
      detectLandmarks: FaceDetector.Constants.Landmarks.none,
      runClassifications: FaceDetector.Constants.Classifications.all,
    })
      .then(this.facesDetected)
      .catch(this.handleFaceDetectionError);

  facesDetected = ({ image, faces }) => {
    this.setState({
      faces,
      image,
    });

    console.log('photos state?', this.props.photos)
    console.log('image', this.state.image)
    console.log('uri', this.props.uri)

    function getStat() {
      return Math.floor(Math.random() * Math.floor(18));
    }
    console.log({
      Str: `Str: ${getStat()}`,
      Dex: `Dex: ${getStat()}`,
      Con: `Con: ${getStat()}`,
      Int: `Int: ${getStat()}`,
      Wis: `Wis: ${getStat()}`,
      Cha: `Cha: ${getStat()}`,
    })
  }

  detectFace = () => {
    FaceDetector.detectFacesAsync(this.props.uri, {
      detectLandmarks: FaceDetector.Constants.Landmarks.none,
      runClassifications: FaceDetector.Constants.Classifications.all,
    })
      .then(this.facesDetected)
      .catch(this.handleFaceDetectionError);
  }

  getImageDimensions = ({ width, height }) => {
    if (width > height) {
      const scaledHeight = pictureSize * height / width;
      return {
        width: pictureSize,
        height: scaledHeight,

        scaleX: pictureSize / width,
        scaleY: scaledHeight / height,

        offsetX: 0,
        offsetY: (pictureSize - scaledHeight) / 2,
      };
    } else {
      const scaledWidth = pictureSize * width / height;
      return {
        width: scaledWidth,
        height: pictureSize,

        scaleX: scaledWidth / width,
        scaleY: pictureSize / height,

        offsetX: (pictureSize - scaledWidth) / 2,
        offsetY: 0,
      };
    }
  };

  handleFaceDetectionError = error => console.warn(error);

  renderFaces = () => this.state.image && this.state.faces && this.state.faces.map(this.renderFace);

  renderFace = (face, index) => {
    const { image } = this.state;
    const { scaleX, scaleY, offsetX, offsetY } = this.getImageDimensions(image);
    const layout = {
      top: offsetY + face.bounds.origin.y * scaleY,
      left: offsetX + face.bounds.origin.x * scaleX,
      width: face.bounds.size.width * scaleX,
      height: face.bounds.size.height * scaleY,
    };

    return (
      <View
        key={index}
        style={[styles.face, layout]}
        transform={[
          { perspective: 600 },
          { rotateZ: `${(face.rollAngle || 0).toFixed(0)}deg` },
          { rotateY: `${(face.yawAngle || 0).toFixed(0)}deg` },
        ]}>
        <Text style={styles.faceText}>😁 {(face.smilingProbability * 100).toFixed(0)}%</Text>
      </View>
    );
  };

  render() {
    const { uri } = this.props;
    return (
      <TouchableOpacity
        style={styles.pictureWrapper}
        onLongPress={this.detectFace}
        onPress={this.toggleSelection}
        activeOpacity={1}
      >
        <Image
          style={styles.picture}
          source={{ uri }}
        />
        {this.state.selected && <Ionicons name="md-checkmark-circle" size={30} color="#4630EB" />}
        <View style={styles.facesContainer}>
          {this.renderFaces()}
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  picture: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    resizeMode: 'contain',
  },
  pictureWrapper: {
    width: pictureSize,
    height: pictureSize,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 2,
    fontSize: 10,
    backgroundColor: 'transparent',
  }
});