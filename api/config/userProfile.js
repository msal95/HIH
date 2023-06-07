import axios from 'axios';
import { useQueryClient, useMutation} from 'react-query';
import laravelApi from './laravelApi';
import { userKey } from './queryKeys';

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    return useMutation(
        (data) =>
            axios
                .post(laravelApi.user?.updateProfile, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((result) => result.data),
        {
            onSuccess: () => {
                // Additional logic to update the query
                queryClient.refetchQueries(userKey.user);
            },
        }
    );
}

