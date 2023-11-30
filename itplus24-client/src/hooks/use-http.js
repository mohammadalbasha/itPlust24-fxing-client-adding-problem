import { useState, useCallback, useContext } from 'react';
import axios from 'axios';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  //  const history = useHistory();
  //const navigate = useNavigate(); react router 6

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setSuccess(false);
    setError(null);

    let headers = { ...requestConfig.headers };
    try {
      const response = await axios({
        url: requestConfig.url,
        data: requestConfig.body ? requestConfig.body : null,
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers
      });
      const data = await response.data;
      setSuccess(true);
      applyData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response?.data?.error?.statusCode == 500) {
        setError('something went wrong');
      } else if (err.response?.data?.errors?.length > 0) {
        setError(err.response?.data?.errors[0]?.message);
      } else {
        setError(err.message);
      }

      setIsLoading(false);

      if (
        err.response &&
        (err.response.data?.statusCode == 401 || err.response.data.message === 'jwt expired')
      ) {
        //history.push('/login');
        //navigate('/login');// react router 6
      }
    }
  }, []);

  return {
    isLoading,
    error,
    success,
    sendRequest
  };
};

export default useHttp;
