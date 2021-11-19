import {SWITCH_LANGUAGE} from "../../constants/ActionTypes";
import {
    LAYOUT_TYPE,
    LAYOUT_TYPE_FULL,
    NAV_STYLE,
    NAV_STYLE_FIXED,
    NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
    THEME_COLOR,
    THEME_TYPE,
    THEME_TYPE_DARK,
    UPDATE_RTL_STATUS
} from "../../constants/ThemeSetting";

const initialSettings = {
    navStyle: NAV_STYLE_FIXED,
    navStyleHome: NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
    layoutType: LAYOUT_TYPE_FULL,
    themeType: THEME_TYPE_DARK,
    themeColor: '',

    isDirectionRTL: false,
    locale: localStorage.getItem('locale') == null ? {
        languageId: 'vietnam',
        locale: 'vi',
        name: 'Việt Nam',
        icon: 'vn'
    } : JSON.parse(localStorage.getItem('locale'))
};

const SettingsReducer = (state = initialSettings, action) => {
    switch (action.type) {
        case THEME_TYPE:
            return {
                ...state,
                themeType: action.themeType
            };
        case THEME_COLOR:
            return {
                ...state,
                themeColor: action.themeColor
            };

        case UPDATE_RTL_STATUS:
            return {
                ...state,
                isDirectionRTL: action.rtlStatus
            };
        case NAV_STYLE:
            return {
                ...state,
                navStyle: action.navStyle
            };
        case LAYOUT_TYPE:
            return {
                ...state,
                layoutType: action.layoutType
            };
        case SWITCH_LANGUAGE:
            return {
                ...state,
                locale: action.payload,

            };
        default:
            return state;
    }
};

export default SettingsReducer;
