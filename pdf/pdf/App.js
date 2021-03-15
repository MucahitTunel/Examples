/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import RNFetchBlob from 'react-native-fetch-blob';

class App extends Component{

  constructor(props){
    super(props);

    var path = RNFetchBlob.fs.dirs.DownloadDir;
    console.log("---------------------------------------------------------------");
    console.log(path);
    console.log("---------------------------------------------------------------");

  }

  async componentDidMount(){

    console.log("didMounth");

    const page1 = PDFPage
    .create()
    .setMediaBox(250, 250)
    .drawText('You can add text and rectangles to the PDF!', {
      x: 5,
      y: 235,
      fontSize:12,
      color: '#007386',
    })
    .drawRectangle({
      x: 25,
      y: 25,
      width: 150,
      height: 150,
      color: '#000000',
    })
    .drawRectangle({
      x: 75,
      y: 75,
      width: 50,
      height: 50,
      color: '#99FFCC',
    })

    const pdfPath = "/storage/emulated/0/Download/createpdf.pdf";
    PDFDocument
      .create(pdfPath)
      .addPages(page1)
      .write() // Returns a promise that resolves with the PDF's path
      .then(path => {
        console.log("***********************************************************************************");
        console.log('PDF created at: ' + path);
        console.log("***********************************************************************************");

        // Do stuff with your shiny new PDF!
      });

  }




  render(){
    return(
      <View>

        <TouchableOpacity
          style={{width:200, height:50, backgroundColor:'yellow'}}
        >

          <Text style={{fontSize:30}}>Pdf Dönüştür</Text>

        </TouchableOpacity>

      </View>
    );
  }
}


export default App;
