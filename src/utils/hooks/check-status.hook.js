import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useCheckStatus = ({ route }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/${route}`);
        if (response.status === 401) {
          navigate("/nerastas");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkStatus();
  }, [route, navigate]);

  return null;
};

export default useCheckStatus;
