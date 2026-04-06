import {View, Text, TouchableOpacity} from 'react-native';
import { CircleUserRound, SquarePen } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState, useEffect } from "react";


export default function Menu ()
{
    const [ user, setUser ] = useState([]);
    const router = useRouter();
    const loadUserData = async () => {
    
    try {
        const token = await AsyncStorage.getItem('token');

        const response = await fetch('https://beakonek.onrender.com/api/v1/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        console.log(data);
        setUser(data);
        } catch(error){
            console.log(error);
     }

    }

    useEffect(() => {
        loadUserData();
    },[]);

    const handleLogout = async () => {
    try {
        const token = await AsyncStorage.getItem('token');

        await fetch('https://beakonek.onrender.com/api/v1/logout', {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${token}`
        },
        });

        await AsyncStorage.removeItem('token');
        router.replace('/login');
    } catch (error) {
        console.log(error);
    }
    };

   const simulateEarthquake = async () => {
    const panayEarthquakes = [
        {
            latitude: 10.7202,
            longitude: 122.5621,
            earthquake_id: `EQ-${Date.now()}-001`,
            magnitude: +(4.0 + Math.random() * 3).toFixed(1),
            place: "Iloilo City, Iloilo"
        },
        {
            latitude: 10.6430,
            longitude: 122.2353,
            earthquake_id: `EQ-${Date.now()}-002`,
            magnitude: +(3.8 + Math.random() * 3.2).toFixed(1),
            place: "Miagao, Iloilo"
        },
        {
            latitude: 10.9144,
            longitude: 122.0051,
            earthquake_id: `EQ-${Date.now()}-003`,
            magnitude: +(4.2 + Math.random() * 2.8).toFixed(1),
            place: "San Jose, Antique"
        },
        {
            latitude: 11.3731,
            longitude: 122.8500,
            earthquake_id: `EQ-${Date.now()}-004`,
            magnitude: +(3.5 + Math.random() * 3.5).toFixed(1),
            place: "Kalibo, Aklan"
        },
        {
            latitude: 10.4929,
            longitude: 122.6847,
            earthquake_id: `EQ-${Date.now()}-005`,
            magnitude: +(4.5 + Math.random() * 2.5).toFixed(1),
            place: "Guimbal, Iloilo"
        }
    ];

    const randomQuake = panayEarthquakes[Math.floor(Math.random() * panayEarthquakes.length)];

    try {
        

        const response = await fetch('https://beakonek.onrender.com/api/v1/simulate_earthquakes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(randomQuake)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log('Simulation error:', errorData);
            alert('Failed to simulate earthquake.');
            return;
        }

        const data = await response.json();
        console.log('Earthquake simulated:', data);
        alert(`🌍 Earthquake Simulated!\nLocation: ${randomQuake.place}\nMagnitude: ${randomQuake.magnitude}\nLat: ${randomQuake.latitude}, Lng: ${randomQuake.longitude}`);

    } catch (error) {
        console.log('Simulate earthquake error:', error);
        alert('Something went wrong during simulation.');
    }
};


        return(
            <View className='p-6 flex-1'>
            <Text className='font-bold text-2xl'>Menu</Text>

            <View className='items-center gap-2'>

                <View className="w-40 h-40 mt-10 rounded-full bg-[#3723A9]/90 justify-center items-center">
                <CircleUserRound size={110} color= '#F5F5F5'/>
                </View>


                <View className='flex-row items-center gap-2'>
                    <Text className='text-2xl font-bold'>  {user ? `${user.first_name} ${user.last_name}` : ''}</Text>
                   
                </View>
                <Text className='text-l font-semibold'>{user?.mobile_number?`+63 ${user.mobile_number.slice(2)}`:''}</Text>
            </View>

  
            <TouchableOpacity className='bg-[#FF6B2C] mt-auto p-4 rounded-[16px] border border-[#FF6B2C]'
            onPress={simulateEarthquake}>
                <Text className='text-center text-[#FFFFF]'>Simulate Earthquake</Text>
            </TouchableOpacity>
           
            
            <TouchableOpacity className='bg-[#FFFFF] mt-auto p-4 rounded-[16px] border border-[#FF6B2C]'
            onPress={handleLogout}>
                <Text className='text-center text-[#FF6B2C]'>Log out</Text>
            </TouchableOpacity>




        </View>
    );
}