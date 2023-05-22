import axios from "axios";
import laravelApi from "../laravelApi";
import { useMutation, useQueryClient } from "react-query";

// export function useAdmins(filters) {
//     async function getAdmin() {
//       let data = null;
//       await axios.get(laravelApi.users.admin, { params: filters }).then((result) => {
//         data = result.data?.data;
//       });
//       return data;
//     }

//     return useQuery([adminKeys.admin, filters], getAdmin, { staleTime: Infinity });
//   }

  export function useSaveAdmin() {
    // const queryClient = useQueryClient();
    return useMutation(
      (admin) =>
        axios
          .post(laravelApi.users_save.admin, admin, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((result) => result.data),
      {
        onSuccess: () => {
        //   queryClient.invalidateQueries(adminKeys.admin);
        },
      }
    );
  }

  export function useDeleteAdmin() {
    const queryClient = useQueryClient();
    return useMutation((id) => axios.delete(`${laravelApi.users.adminDestory}/${id}`, {}).then((result) => result.data), {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(adminKeys.admin);
      },
    });
  }
