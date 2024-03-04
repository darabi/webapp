import { styled } from "@mui/material/styles"
import CommonMessage from "@common/core/CommonMessage"
import AppContext from "app/AppContext"
import { lazy, memo, ReactNode, Suspense, useContext } from "react"
import { useSelector } from "react-redux"
import { useRoutes } from "react-router-dom"
import { selectCommonCurrentLayoutConfig } from "@common/core/CommonSettings/store/commonSettingsSlice"
// import Configurator from "app/theme-layouts/shared-components/configurator/Configurator"
import Typography from "@mui/material/Typography"
import CommonSuspense from "@common/core/CommonSuspense"
import FooterLayout1 from "./components/FooterLayout1"
import LeftSideLayout1 from "./components/LeftSideLayout1"
import NavbarWrapperLayout1 from "./components/NavbarWrapperLayout1"
import RightSideLayout1 from "./components/RightSideLayout1"
import ToolbarLayout1 from "./components/ToolbarLayout1"

const CommonDialog = lazy(
  () => import("@common/core/CommonDialog/CommonDialog"),
)

const Root = styled("div")(({ config }) => ({
  ...(config.mode === "boxed" && {
    clipPath: "inset(0)",
    maxWidth: `${config.containerWidth}px`,
    margin: "0 auto",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }),
  ...(config.mode === "container" && {
    "& .container": {
      maxWidth: `${config.containerWidth}px`,
      width: "100%",
      margin: "0 auto",
    },
  }),
}))

/**
 * The layout 1.
 */
function Layout1(props) {
  const { children } = props
  const config = useSelector(selectCommonCurrentLayoutConfig)
  const appContext = useContext(AppContext)
  const { routes } = appContext

  return (
    <Root id="common-layout" config={config} className="flex w-full">
      {config.leftSidePanel.display && <LeftSideLayout1 />}

      <div className="flex min-w-0 flex-auto">
        {config.navbar.display && config.navbar.position === "left" && (
          <NavbarWrapperLayout1 />
        )}

        <main
          id="common-main"
          className="relative z-10 flex min-h-full min-w-0 flex-auto flex-col"
        >
          {config.toolbar.display && (
            <ToolbarLayout1
              className={config.toolbar.style === "fixed" ? "sticky top-0" : ""}
            />
          )}

          <div className="relative z-10 flex min-h-0 flex-auto flex-col">
            <CommonSuspense>{useRoutes(routes)}</CommonSuspense>

            <Suspense>
              <CommonDialog />
            </Suspense>
            {children}
          </div>

          {config.footer.display && (
            <FooterLayout1
              className={
                config.footer.style === "fixed" ? "sticky bottom-0" : ""
              }
            />
          )}
        </main>

        {config.navbar.display && config.navbar.position === "right" && (
          <NavbarWrapperLayout1 />
        )}
      </div>

      {config.rightSidePanel.display && <RightSideLayout1 />}
      <CommonMessage />
    </Root>
  )
}

export default memo(Layout1)
