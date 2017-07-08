declare module "*.json" {
    const value: any;
    export default value;
}

declare module "vue-material" {
    import Vue from 'vue';

    export class MdCore {}
    export class MdAvatar {}
    export class MdBackdrop {}
    export class MdBottomBar {}
    export class MdButton {}
    export class MdButtonToggle {}
    export class MdCard {}
    export class MdCheckbox {}
    export class MdChips {}
    export class MdDialog {}
    export class MdDivider {}
    export class MdFile {}
    export class MdIcon {}
    export class MdImage {}
    export class MdInputContainer {}
    export class MdLayout {}
    export class MdList {}
    export class MdMenu {}
    export class MdProgress {}
    export class MdRadio {}
    export class MdSelect {}
    export class MdSidenav {}
    export class MdSnackbar {}
    export class MdSpeedDial {}
    export class MdSpinner {}
    export class MdSubheader {}
    export class MdSwitch {}
    export class MdTable {}
    export class MdTabs {}
    export class MdToolbar {}
    export class MdTooltip {}
    export class MdWhiteframe {}

    export interface IVueMaterial {
        install(Vue: Vue):void,
        MdCore: MdCore,
        MdAvatar: MdAvatar,
        MdBackdrop: MdBackdrop,
        MdBottomBar: MdBottomBar,
        MdButton: MdButton,
        MdButtonToggle: MdButtonToggle,
        MdCard: MdCard,
        MdCheckbox: MdCheckbox,
        MdChips: MdChips,
        MdDialog: MdDialog,
        MdDivider: MdDivider,
        MdFile: MdFile,
        MdIcon: MdIcon,
        MdImage: MdImage,
        MdInputContainer: MdInputContainer,
        MdLayout: MdLayout,
        MdList: MdList,
        MdMenu: MdMenu,
        MdProgress: MdProgress,
        MdRadio: MdRadio,
        MdSelect: MdSelect,
        MdSidenav: MdSidenav,
        MdSnackbar: MdSnackbar,
        MdSpeedDial: MdSpeedDial,
        MdSpinner: MdSpinner,
        MdSubheader: MdSubheader,
        MdSwitch: MdSwitch,
        MdTable: MdTable,
        MdTabs: MdTabs,
        MdToolbar: MdToolbar,
        MdTooltip: MdTooltip,
        MdWhiteframe: MdWhiteframe
    }

    const options: Vue.PluginObject<IVueMaterial>;

    export default options;
}
