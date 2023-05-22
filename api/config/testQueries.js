import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import laravelApi from './laravelApi';
import { testKey } from './queryKeys';

export function useGetRequest(filters) {
    async function getData() {
        let data = null;
        await axios.get(laravelApi.test.getRequest, { params: filters }).then((result) => {
            data = result.data?.data;
        });
        return data;
    }

    return useQuery([testKey.test, filters], getData, { staleTime: Infinity });
}

export function usePostRequest() {
    const queryClient = useQueryClient();
    return useMutation(
        (admin) =>
            axios
                .post(laravelApi.test.postRequest, admin, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((result) => result.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(testKey.test);
            },
        }
    );
}

export function useDeleteRequest() {
    const queryClient = useQueryClient();
    return useMutation((id) => axios.delete(`${laravelApi.users.adminDestory}/${id}`, {}).then((result) => result.data), {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(testKey.test);
        },
    });
}
