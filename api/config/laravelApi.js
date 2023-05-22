function laravelApi() {
  // const baseUrl = 'http://localhost/machinan-backend/public/api';
  // const baseUrl = 'http://127.0.0.1:8000/api';
  const baseUrl = "https://stage-hub.hybriditservices.com/api";

  const home = `${baseUrl}`;

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
      getRequest: `${baseUrl}/form-builder/get-editor-all-form`,
      postRequest: `${home}/form-builder/save`,
      deleteRequest: `${home}/`,
    },
    integration: {
      get: `${baseUrl}/integration/get`,
      delete: `${baseUrl}/integration/event/with/form`,
    },
  };
}

export default laravelApi();
