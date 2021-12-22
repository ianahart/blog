import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const RefreshCatcher = () => {
  const { handleRefreshAuth } = useContext(AuthContext)

  useEffect(() => {
    handleRefreshAuth();
  },[handleRefreshAuth]);

  return <div></div>
}
export default RefreshCatcher;