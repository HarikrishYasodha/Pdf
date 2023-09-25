import React, {Component} from 'react';

import {
  View,
  Button,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';

import {RNCamera} from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';

import RBSheet from 'react-native-raw-bottom-sheet';

import {createPdf} from 'react-native-images-to-pdf';

import RNBlobUtil from 'react-native-blob-util';
import {log} from 'react-native-reanimated';

class CameraCapture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      uri: {},
      jiya: {},
      hari: {},
      croppedImageUri: '',
    };
  }
  // componentDidMount() {
  //   let rock = this.state.images.find((e, i) => i === this.state.jiya);
  //   console.log('ooo', rock?.uri);
  //   // this.setState({hari: rock});
  //   // console.log('jiyaaa', this.state.hari);
  //   this.setState({uri: rock?.uri});
  // }
  downloadAllPDF = async () => {
    console.log('ashdsa', this.state.images);
    let imageuri = this.state.images;
    let pages = imageuri.map(e => ({imagePath: e.uri}));
    console.log('ashdgjas', pages);
    let options = {
      //   pages: [{imagePath: this.state.images[0]?.uri}],
      pages,
      outputPath: `file://${RNBlobUtil.fs.dirs.PictureDir}/file.pdf`,
    };
    console.log('hdjagsgds', options);
    await createPdf(options)
      .then(path => console.log('PDF Created ' + path), this.showAlert())

      .catch(error => console.log(error));
  };

  downloadPDF = async () => {
    console.log('ashdsa', this.state.images[0]?.uri);

    let options = {
      pages: [{imagePath: this.state.images[0]?.uri}],

      outputPath: `file://${RNBlobUtil.fs.dirs.PictureDir}/file.pdf`,
    };
    console.log('hghjgjhghj', options);
    await createPdf(options)
      .then(path => console.log('PDF Created ' + path), this.showAlert())
      .catch(error => console.log(error));
  };
  downloadPDF1 = async () => {
    console.log('ashdsa', this.state.images?.path);

    let options = {
      pages: [{imagePath: this.state.images?.path}],

      outputPath: `file://${RNBlobUtil.fs.dirs.PictureDir}/file.pdf`,
    };
    console.log('hghjgjhghj', options);
    await createPdf(options)
      .then(path => console.log('PDF Created ' + path), this.showAlert())
      .catch(error => console.log(error));
  };
  takePicture = async () => {
    console.log('jiya');

    if (this.camera) {
      console.log('jiya');

      const options = {quality: 0.5, base64: true};

      const data = await this.camera.takePictureAsync(options);

      console.log('ajhda', data);

      this.setState(prevState => ({
        images: [...prevState.images, {uri: data.uri}],
      }));
    }
  };

  showAlert() {
    console.log('adhsgjasg');

    Alert.alert(
      'PDF Info',

      'PDF Created Successfully',

      [
        // {

        //   text: 'OK',

        //   onPress: () => console.log('OK Pressed'),

        // },

        {
          text: 'Cancel',

          onPress: () => console.log('Cancel Pressed'),

          style: 'cancel',
        },
      ],

      {cancelable: false},
    );
  }

  _renderSheetContent1() {
    console.log('index', this.state.jiya.length);
    let rock = this.state.images.find((e, i) => i === this.state.jiya);
    console.log('ooo', rock);
    // this.setState({hari: rock});
    // console.log('jiyaaa', this.state.hari);
    return (
      <View style={{alignSelf: 'center'}}>
        {/* {this.state.jiya !== '' ? (
          ''
        ) : ( */}
        <TouchableOpacity>
          <View
            style={{
              marginLeft: 25,

              backgroundColor: 'black',

              width: 70,

              height: 20,
            }}>
            <Text
              style={{
                fontWeight: 'bold',

                marginLeft: 10,

                fontSize: 10,

                marginTop: 2,

                color: 'white',
              }}
              onPress={this.downloadAllPDF}>
              {'Select All'}
            </Text>
          </View>
        </TouchableOpacity>
        {/* )} */}

        {/* {this.state.jiya !== '' ?
          <Text>{'No Data Found'}</Text>
        ) : ( */}
        <FlatList
          data={this.state.images}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={true}
          numColumns={2}
          renderItem={({item, index}) => (
            console.log('adhgas', index),
            (
              <View>
                <View
                  style={{
                    marginTop: 5,

                    // backgroundColor: this.state.jiya === index ? 'black' : '',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.RBSheet.open();

                      this.setState({jiya: index});
                    }}>
                    <View style={{margin: 10}}>
                      <Image source={{uri: item.uri}} style={styles.image} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )
          )}
        />
        {/* )} */}
      </View>
    );
  }
  croping = () => {
    console.log('jjkjkjjlk');
    // let rock = this.state.images.find((e, i) => i === this.state.jiya);
    // return (
    //   <CropView
    //     sourceUrl={rock?.uri}
    //     style={styles.cropView}
    //     ref={rock?.uri}
    //     onImageCrop={res => console.log('klklklklk', res)}
    //     keepAspectRatio
    //     aspectRatio={{width: 16, height: 9}}
    //   />
    // );
  };
  _renderSheetContent() {
    console.log('index', this.state.jiya);
    let rock = this.state.images.find((e, i) => i === this.state.jiya);
    console.log('ooo', rock?.uri);
    // this.setState({hari: rock});
    // console.log('jiyaaa', this.state.hari);
    // this.setState({uri: rock?.uri});
    return (
      <View>
        <Text style={{fontWeight: 'bold', alignSelf: 'center', fontSize: 15}}>
          {this.state.jiya}
        </Text>

        {/* {this.state.images.map(e => {

          return <Image source={{uri: e[0]?.uri}} style={styles.image} />;

        })} */}

        {/* <Image
          source={{
            uri: rock?.uri,
          }}
          style={{width: 250, height: 250, margin: 5, alignSelf: 'center'}}
        /> */}
        {/* {rock?.uri !== '' && ( */}
        {/* )} */}
        <TouchableOpacity
          style={{
            fontWeight: 'bold',

            alignSelf: 'center',

            backgroundColor: 'black',

            width: 150,

            height: 25,

            borderRadius: 5,
          }}
          onPress={this.downloadPDF}>
          {/* onPress={this.croping}> */}
          <Text
            style={{fontWeight: 'bold', color: 'white', alignSelf: 'center'}}>
            {'Pdf Convertor'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  click = () => {
    console.log('hariiii');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image, 'llllll');
      this.setState({images: image});
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.click}>
          <Text>{'jiya'}</Text>
        </TouchableOpacity>
        {/* {this.state.images?.mime  && ( */}
        <Image
          source={{uri: this.state.images?.path}}
          style={{height: 500, width: 500}}
        />
        <TouchableOpacity onPress={this.downloadPDF1}>
          <Text>{'Dhina'}</Text>
        </TouchableOpacity>
        {/* )}  */}
        {/* <View style={{flex: 1}}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            //  justifyContent: 'space-between'
          }}>
          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity>
              <View
                style={{
                  marginLeft: Dimensions.get('screen').width - 230,

                  marginTop: Dimensions.get('screen').height - 200,
                  backgroundColor: 'white',
                  borderRadius: 55,
                  width: 70,

                  height: Dimensions.get('screen').height * 0.09,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 10,
                    marginTop: Dimensions.get('screen').height * 0.03,
                    color: 'black',
                  }}
                  onPress={this.takePicture}>
                  {'CAPTURE'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity>
              <View
                style={{
                  marginLeft: Dimensions.get('screen').width - 320,
                  marginTop: Dimensions.get('screen').height - 200,
                  backgroundColor: 'white',
                  borderRadius: 25,
                  width: 75,

                  height: Dimensions.get('screen').height * 0.09,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 10,
                    marginTop: Dimensions.get('screen').height * 0.03,
                    color: 'black',
                  }}
                  onPress={() => {
                    this.RBSheet1.open();
                  }}>
                  {'GALLERY'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View> */}
        {/* <Button
          title="Take Picture"
          onPress={this.takePicture}
          style={styles.captureButton}
        /> */}
        {/* <View
          style={{
            marginTop: 250,

            alignSelf: 'center',

            flexDirection: 'row',

            justifyContent: 'space-between',
          }}
        /> */}

        {/* <FlatList
          data={this.state.images}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          renderItem={({item, index}) => (
            console.log('adhgas', index),
            (
              <View>
                <View
                  style={{
                    marginTop: 5,

                    // backgroundColor: this.state.jiya === index ? 'black' : '',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.RBSheet.open();

                      this.setState({jiya: index});
                    }}>
                    <View style={{margin: 10}}>
                      <Image source={{uri: item.uri}} style={styles.image} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )
          )}
        /> */}

        {/* <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={400}
          duration={250}
          animationType={'fade'}
          closeOnDragDown
          dragFromTopOnly
          customStyles={{
            container: {
              borderTopRightRadius: 15,

              borderTopLeftRadius: 15,

              backgroundColor: 'white',
            },

            wrapper: {
              // backgroundColor: 'transparent',
            },

            draggableIcon: {
              backgroundColor: '#fff',
            },
          }}>
          {this._renderSheetContent()}
        </RBSheet>
        <RBSheet
          ref={ref => {
            this.RBSheet1 = ref;
          }}
          height={400}
          duration={250}
          animationType={'fade'}
          closeOnDragDown
          dragFromTopOnly
          customStyles={{
            container: {
              borderTopRightRadius: 15,

              borderTopLeftRadius: 15,

              backgroundColor: 'white',
            },

            wrapper: {
              // backgroundColor: 'transparent',
            },

            draggableIcon: {
              backgroundColor: '#fff',
            },
          }}>
          {this._renderSheetContent1()}
        </RBSheet> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column',
  },

  preview: {
    height: Dimensions.get('screen').height * 1,
    // flex: 1,

    // justifyContent: 'flex-end',

    // alignItems: 'center',
  },

  captureContainer: {
    alignSelf: 'center',

    position: 'absolute',

    bottom: 20,
  },

  captureButton: {
    backgroundColor: 'black',

    borderRadius: 50,

    width: 70,

    height: 70,
  },

  image: {
    width: 100,

    height: 100,

    margin: 5,
  },
});

export default CameraCapture;
