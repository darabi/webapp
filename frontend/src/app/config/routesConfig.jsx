import CommonUtils from "@common/utils"
import CommonLoading from "@common/core/CommonLoading"
import { Navigate } from "react-router-dom"
import settingsConfig from "app/config/settingsConfig"
import SignInConfig from "../main/sign-in/SignInConfig"
import SignOutConfig from "../main/sign-out/SignOutConfig"
import Error404Page from "../main/404/Error404Page"
import PagesConfigs from "../main/pages/pagesConfigs"
import UserInterfaceConfigs from "../main/user-interface/UserInterfaceConfigs"

const routeConfigs = [
  SignOutConfig,
  SignInConfig,
  ...PagesConfigs,
  ...UserInterfaceConfigs,
  // ...DashboardsConfigs,
]

/**
 * The routes of the application.
 */
const routes = [
  ...CommonUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth,
  ),
  {
    path: "/",
    element: <Navigate to="/dashboards/project" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <CommonLoading />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
]

export default routes
