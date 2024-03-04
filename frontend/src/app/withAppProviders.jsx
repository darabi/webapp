import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { StyledEngineProvider } from "@mui/material/styles"
import routes from "app/config/routesConfig"
import { useMemo } from "react"
import { Provider } from "react-redux"
import ErrorBoundary from "@common/utils/ErrorBoundary"
import AppContext from "./AppContext"
import store from "./store/store"

/**
 * A Higher Order Component that provides the necessary context providers for the app.
 */
function withAppProviders(Component) {
  /**
   * The component that wraps the provided component with the necessary context providers.
   */
  function WithAppProviders(props) {
    /**
     * The value to pass to the AppContext provider.
     */
    const val = useMemo(
      () => ({
        routes,
      }),
      [routes],
    )

    return (
      <ErrorBoundary>
        <AppContext.Provider value={val}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Provider store={store}>
              <StyledEngineProvider injectFirst>
                <Component {...props} />
              </StyledEngineProvider>
            </Provider>
          </LocalizationProvider>
        </AppContext.Provider>
      </ErrorBoundary>
    )
  }

  return WithAppProviders
}

export default withAppProviders
