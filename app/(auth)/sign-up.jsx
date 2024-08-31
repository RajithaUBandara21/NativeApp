import { View, Text,ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import {Link, link, router} from 'expo-router'
import {createUser} from '../../lib/appwrite'
import {useGlobalContext} from '../../context/GlobalProvider'


const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [form, setForm] = useState({
    userName:'',
  email: '',
  password: ''
})


const [isSubmiting, setIsSubmiting] = useState(false);
const submit = async () => {
  if (!form.userName || !form.email || !form.password) {
    Alert.alert("All fields are required");
    return;
  }
  setIsSubmiting(true);
  try {

    const result = await createUser(form.email, form.password, form.userName);
    setIsLogged(true);
    setUser(result);
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
            Sign Up in to Aora
         
          </Text>

          <FormField
       title="User Name"
       value={form.userName}
       handleChangeText={(e)=>setForm({...form, userName: e})}
       otherStyles="mt-7"
       
       />

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
       title="sign Up"
       handlePress={submit}
       containerStyles="mt-7"
       textStyles={"text-center"}
       isLoading={isSubmiting}
       
       />

<View className='justify-center pt-5 flex-row gap-2'> 
          <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
          <Link href="sign-in" className='text-lg font-psemibold text-secondary'>Sing </Link>
        </View>
        </View>

       
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp