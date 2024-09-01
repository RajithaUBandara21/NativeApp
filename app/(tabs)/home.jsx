import { View, Text, SafeAreaView, FlatList, Image, RefreshControl } from 'react-native'
import React from 'react'
 import {images} from '../../constants'
 import SearchInput from '../../components/SearchInput'
 import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
const Home = () => {

  const [refreshing,setRefreshing] = useState(false)
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}


        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text className="text-3xl text-white">{item.id}</Text>
          </View>
        )}


        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-pmedium text-2xl text-gray-100">
                  JSMastery
                </Text>
              </View>

              <View className=" mt-1.5">
                <Image  source={images.logoSmall} 
                className="w-9 h-10"
                resizeMode='contain' />
              </View>
            </View>
<SearchInput />
<View className="w-full flex-1 pt-5 pb-8 ">
<Text className="text-gray-100 text-lg font-preguler mb-3">
Latest Video

</Text>
<Trending posts={[{id:1},{id:20},{id:3}]??[]}   />
</View>



          </View>
        )}

        ListEmptyComponent={() => (
        <EmptyState
        title="No videos found"
        subtitle="Be to first one to upload a video"
        />
        
        )
        }
        refreshControl={<RefreshControl/>}
      />


    </SafeAreaView>
  );
}

export default Home