import axios from 'axios';
import { useQuery, useQueryClient, useMutation} from 'react-query';
import laravelApi from './laravelApi';
import { formBuilderKey, integrationKey } from './queryKeys';

export function useGetModels() {
    async function getData() {
        let data = null;
        await axios.get(laravelApi.formBuilder.get).then((result) => {
            data = result.data?.data;
        });
        return data;
    }

    return useQuery([formBuilderKey.formBuilder], getData, { staleTime: Infinity });
}
export function useGetIntegrationAndForms() {
    async function getData() {
        let data = null;
        await axios.get(laravelApi.formBuilder.getIntegrationAndForms).then((result) => {
            data = result.data?.data;
        });
        return data;
    }

    return useQuery([integrationKey.integration], getData, { staleTime: 1 });
}

export function useEventFormMake() {
    const queryClient = useQueryClient();
    return useMutation(
        (id) =>
            axios
                .post(laravelApi.formBuilder.postEventFormMake, id, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((result) => result.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(formBuilderKey.formBuilder);
            },
        }
    );
}

export async function useGetRelatedModel(related) {
    const { data } = await axios.get(laravelApi.formBuilder.getRelatedModel, { params: related });
    return data?.data;
}
