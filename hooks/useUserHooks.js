import React from 'react';
import useActionDispatch from '@/hooks/useActionDispatch';
import axios from '@/services/axios';
import Api from "@/services/EndPoint"

const UseUserHooks = () => {

    const {setUser} = useActionDispatch()

    const fetchUsers = async () => {
        try {
            const response = await axios.get(Api.USER());
            const data = Array.isArray(response.data) ? response.data : response.data.users || [];
            setUser(data); 
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    
    return {
        fetchUsers
    }
}

export default UseUserHooks;
