import { View, StyleSheet, Dimensions, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import { Storage } from 'aws-amplify'
import InnerLayer from '../../components/InnerLayer'

const LibraryScreen = () => {

    const { width, height } = Dimensions.get("window")
    const [url, setUrl] = useState("")

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
                setUrl(base64)
            }

        } catch (error) {
            console.log("Error", error.message);
        }

    }

    console.log("url", url);

    return (
        <InnerLayer header={true} footer={true}>
            <View>
                <View style={[{ width: width }]}>
                    {url && <VideoPlayer controls={true} url={url} />}
                </View>

                <Button title='Download' onPress={handleDownload} />
                {/* <Image style={{ width: "100%", height: 200 }} source={{ uri: url || "https://static.vecteezy.com/packs/media/vectors/term-bg-1-666de2d9.jpg" }} /> */}
            </View>
        </InnerLayer>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         height: "100%",
//     },
// })

export default LibraryScreen