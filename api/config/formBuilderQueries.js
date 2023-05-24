import axios from 'axios';
import { useQuery} from 'react-query';
import laravelApi from './laravelApi';
import { formBuilderKey } from './queryKeys';

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
// export function useGetRelatedModel(related) {
//     async function getData() {
//         let data = null;
//         await axios.get(laravelApi.formBuilder.getRelatedModel, { params: related }).then((result) => {
//             data = result.data?.data;
//         });
//         return data;
//     }

//     return useQuery([getModelKey.getModel, related], getData, { staleTime: 1 * 60});
// }

export async function useGetRelatedModel(related) {
    const { data } = await axios.get(laravelApi.formBuilder.getRelatedModel, { params: related });
    return data?.data;
}
