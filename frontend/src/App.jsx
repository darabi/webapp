import CommonLayout from "@common/core/CommonLayout"
import CommonTheme from "@common/core/CommonTheme"
import { SnackbarProvider } from "notistack"
import { useSelector } from "react-redux"
import rtlPlugin from "stylis-plugin-rtl"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { selectCurrentLanguageDirection } from "app/store/i18nSlice"
import themeLayouts from "app/theme-layouts/themeLayouts"
import { selectMainTheme } from "@common/core/CommonSettings/store/commonSettingsSlice"
import MockAdapterProvider from "@mock-api/MockAdapterProvider"
import withAppProviders from "./app/withAppProviders"
import { AuthRouteProvider } from "app/auth/AuthRouteProvider"

const emotionCacheOptions = {
  rtl: {
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
}

/**
 * The main App component.
 */
function App() {
  /**
   * The language direction from the Redux store.
   */
  const langDirection = useSelector(selectCurrentLanguageDirection)

  /**
   * The main theme from the Redux store.
   */
  const mainTheme = useSelector(selectMainTheme)

  return (
    <MockAdapterProvider>
      <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
        <CommonTheme theme={mainTheme} direction={langDirection}>
          <AuthRouteProvider>
            <SnackbarProvider
              maxSnack={5}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              classes={{
                containerRoot:
                  "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99",
              }}
            >
              <CommonLayout layouts={themeLayouts} />
            </SnackbarProvider>
          </AuthRouteProvider>
        </CommonTheme>
      </CacheProvider>
    </MockAdapterProvider>
  )
}

export default withAppProviders(App)
