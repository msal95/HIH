import axios from 'axios';
import { useQuery, useQueryClient, useMutation} from 'react-query';
import laravelApi from './laravelApi';
import { integrationKey } from './queryKeys';

export function useGetIntegration(filters) {
    async function getData() {
        let data = null;
        await axios.get(laravelApi.integration.get, { params: filters }).then((result) => {
            data = result.data?.data;
        });
        return data;
    }

    return useQuery([integrationKey.integration, filters], getData, { staleTime: Infinity });
}

export function useDeleteEventWithForm() {
    const queryClient = useQueryClient();
    return useMutation((id) => axios.delete(`${laravelApi?.integration?.delete}/${id}`, {}).then((result) => result.data), {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(integrationKey?.integration);
        },
    });
}

export function useIntegrationImport() {
    const queryClient = useQueryClient();
    return useMutation(
        (id) =>
            axios
                .post(laravelApi.integration.post, id, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((result) => result.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(integrationKey.integration);
            },
        }
    );
}
