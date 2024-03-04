import { useSelector } from "react-redux"
import { useAppDispatch } from "app/store/store"
import useThemeMediaQuery from "@common/hooks/useThemeMediaQuery"
import { selectCommonCurrentLayoutConfig } from "@common/core/CommonSettings/store/commonSettingsSlice"
import {
  navbarToggle,
  navbarToggleMobile,
} from "app/theme-layouts/shared-components/navbar/store/navbarSlice"
import NavbarToggleFab from "app/theme-layouts/shared-components/navbar/NavbarToggleFab"

/**
 * The navbar toggle fab layout 1.
 */
function NavbarToggleFabLayout1(props) {
  const { className } = props

  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down("lg"))

  const config = useSelector(selectCommonCurrentLayoutConfig)

  const dispatch = useAppDispatch()

  return (
    <NavbarToggleFab
      className={className}
      onClick={() => {
        dispatch(isMobile ? navbarToggleMobile() : navbarToggle())
      }}
      position={config.navbar.position}
    />
  )
}

export default NavbarToggleFabLayout1
