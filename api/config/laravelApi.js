function laravelApi() {
  // const baseUrl = 'http://localhost/machinan-backend/public/api';
  const baseUrl = import.meta.env.VITE_API_URL_LOCAL;
//   const baseUrl = "https://stage-hub.hybriditservices.com/api";
  const home = `${baseUrl}/api`;

  return {
    home,
    auth: {
      login: `${home}/auth/login`,
      forgot: `${home}/auth/forgot`,
      newPassword: `${home}/auth/newPassword`,
      logout: `${home}/auth/logout`,
      user: `${home}/auth/user`,
    },
    test: {
      getRequest: `${home}/form-builder/get-editor-all-form`,
      postRequest: `${home}/form-builder/save`,
      deleteRequest: `${home}/`,
    },
    integration: {
      get: `${home}/integration/get`,
      delete: `${home}/integration/event/with/form`,
    },
    formBuilder: {
      get: `${home}/form-builder/get-models`,
      getRelatedModel: `${home}/form-builder/get-models-related`,
    },
  };
}

export default laravelApi();
