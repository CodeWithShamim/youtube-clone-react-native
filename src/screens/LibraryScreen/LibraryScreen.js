import { View, StyleSheet, Dimensions, Button, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomFooter from '../../components/CustomFooter'
import VideoPlayer from '../../components/VideoPlayer'
import { Storage } from 'aws-amplify'
import RNFS from 'react-native-fs'

const LibraryScreen = () => {

    const { width, height } = Dimensions.get("window")
    const [url, setUrl] = useState("")

    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
      
        var byteCharacters = b64Data
        var byteArrays = [];
      
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
      
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          var byteArray = new Uint8Array(byteNumbers);
      
          byteArrays.push(byteArray);
        }
      
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }

    const handleDownload = async () => {
        console.log("Hit");
        try {
            const result = await Storage.get('6b447d47-6815-4d6d-94db-d8c5ae7e8a61.mp4', {
                download: true,
                progressCallback(progress) {
                    console.log(`Downloaded: ${progress.loaded}/${progress.total}`);
                },
            })

            const reader = new FileReader()
            reader.readAsDataURL(result.Body)
            reader.onloadend = () => {
                const base64 = reader.result
                const blob = b64toBlob(base64)
                console.log("blob", blob);
                setUrl(blob)
            }

        } catch (error) {
            console.log("Error", error.message);
        }

    }

    console.log("url", url);

    return (
        <View style={styles.container}>
            <View style={[{ width: width }]}>
                {url && <VideoPlayer controls={true} url={url} />}
            </View>

            <Button title='Download' onPress={handleDownload} />
            {/* <Image style={{ width: "100%", height: 200 }} source={{ uri: url || "https://static.vecteezy.com/packs/media/vectors/term-bg-1-666de2d9.jpg" }} /> */}


            <CustomFooter />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
})

export default LibraryScreen