import axios from 'axios';
import { useQuery} from 'react-query';
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
