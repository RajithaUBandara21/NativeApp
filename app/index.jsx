
import { StatusBar } from 'expo-status-bar';
import {  ScrollView, Text, View,Image } from 'react-native';
import{Link, link} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../constants'
import CustomButton from '../components/CustomButton';
import { Redirect,router } from 'expo-router';
import { useGlobalContext} from '../context/GlobalProvider';


export default function App() {
  const {isLoading,isLoggedIn} = useGlobalContext();
  if(!isLoading && isLoggedIn)  return <Redirect href="/home" />
  return (
   <SafeAreaView className="bg-primary h-full">
    <ScrollView contentContainerStyle={{height:'100%'}}>

      <View className="w-full px-4 items-center justify-center h-[85vh]">
        <Image source={images.logo} className="w-[130px] min-h-[85px]"
        resizeMode='contain' />

        <Image source={images.cards}
        className="max-w-[380px] w-full h-[300px]"
        resizeMode='contain' />
       

        <View className="relative mt-5">
          <Text className="text-3xl text-white font-bold text-center">
            Discover Endless {' '}Possibilities with
            <Text className="text-secondary-200">Aora</Text>
          </Text>
          <Image 
          source={images.path}
          className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
          resizeMode='contain'

/>
        </View>
        <Text className="text-sm font-pregular text-gray-100 mt-7 text-center ">Where creativity meets innovation: embark on a journey of limitless exploration with aora </Text>
        <CustomButton title="Continue with Email"
        handlePress={()=>router.push('/sign-in')}
        containerStyles ="w-full mt-7"
        textStyles={"text-center"}

        />
        </View>

    </ScrollView>

<StatusBar backgroundColor="#161622" style="light"

/> 

   </SafeAreaView>
  );
}

