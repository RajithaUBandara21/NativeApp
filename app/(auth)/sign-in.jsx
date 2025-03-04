import { View, Text,ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import {Link, link, router} from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { Account } from 'react-native-appwrite'
import { useGlobalContext } from "../../context/GlobalProvider";
const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
 
  const [form, setForm] = useState({
  email: '',
  password: ''
})

const [isSubmiting, setIsSubmiting] = useState(false)






const submit = async () => {
 
  if ( !form.email || !form.password) {
    Alert.alert("All fields are required");

  }
  setIsSubmiting(true);
  try {
  
    await signIn(form.email, form.password);
    const result = await getCurrentUser();
    setIsLoggedIn(true);
    setUser(result);
   
    Alert.alert("Success", "You have successfully logged in");
    // Set to global state
    router.replace("/home");
  } catch (error) {
    Alert.alert("Error", error.message);
  } finally {
    setIsSubmiting(false);
  }
}





  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView className="">
        <View className="w-full h-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
         
          </Text>
       <FormField
       title="Email"
       value={form.email}
       handleChangeText={(e)=>setForm({...form, email: e})}
       otherStyles="mt-7"
       keybordType="email-address"
       />

<FormField
       title="Password"
       value={form.password}
       handleChangeText={(e)=>setForm({...form, password: e})}
       otherStyles="mt-7"
       
      
       />

       <CustomButton 
       title="sign In"
       handlePress={submit}
       containerStyles="mt-7"
       textStyles={"text-center"}
       isLoading={isSubmiting}
       
       />

<View className='justify-center pt-5 flex-row gap-2'> 
          <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
          <Link href="sign-up" className='text-lg font-psemibold text-secondary'>Sing Up</Link>
        </View>
        </View>

       
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignIn