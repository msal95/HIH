import axios from 'axios';
import { useQuery, useQueryClient, useMutation} from 'react-query';
import laravelApi from './laravelApi';
import { authType } from './queryKeys';

export function useGetAuthType() {
    async function getData() {
        let data = null;
        await axios.get(laravelApi.authType.get).then((result) => {
            data = result.data?.data;
        });
        return data;
    }

    return useQuery([authType.authKey], getData, { staleTime: 1 });
}
