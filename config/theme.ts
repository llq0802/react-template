import GlobalConfig from '../src/global';

export default {
  '@root-entry-name': 'default',
  '@primary-color': GlobalConfig.BrandPrimary,
  '@font-size-base': '14px', // 主字号
  '@border-radius-base': '3px', // 组件/浮层圆角
  '@screen-sm': '576px',
  '@pro-header-hover-bg': 'rgba(0, 0, 0, 0.055)',
  '@dark-color-shallow': '#141414',
  '@dark-color-deep': '#000',
  '@dark-border-color': '#303030',
  '@table-row-bg-color': '#e6f7ff', // table 隔行背景色
};

/**
 * antd常用变量
 */
// @primary-color: #1890ff; // 全局主色
// @link-color: #1890ff; // 链接色
// @success-color: #52c41a; // 成功色
// @warning-color: #faad14; // 警告色
// @error-color: #f5222d; // 错误色
// @font-size-base: 14px; // 主字号
// @heading-color: rgba(0, 0, 0, 0.85); // 标题色
// @text-color: rgba(0, 0, 0, 0.65); // 主文本色
// @text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
// @disabled-color: rgba(0, 0, 0, 0.25); // 失效色
// @border-radius-base: 2px; // 组件/浮层圆角
// @border-color-base: #d9d9d9; // 边框色
// @box-shadow-base: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
//   0 9px 28px 8px rgba(0, 0, 0, 0.05); // 浮层阴影

/**
 * antd其他变量
 */
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
// // >>> Primary
// @primary-color: @blue-6;
// @primary-color-hover: color(~`colorPalette('@{primary-color}', 5) `);
// @primary-color-active: color(~`colorPalette('@{primary-color}', 7) `);
// @primary-color-outline: fade(@primary-color, @outline-fade);

// @processing-color: @blue-6;

// // >>> Info
// @info-color: @primary-color;
// @info-color-deprecated-bg: color(~`colorPalette('@{info-color}', 1) `);
// @info-color-deprecated-border: color(~`colorPalette('@{info-color}', 3) `);

// // >>> Success
// @success-color: @green-6;
// @success-color-hover: color(~`colorPalette('@{success-color}', 5) `);
// @success-color-active: color(~`colorPalette('@{success-color}', 7) `);
// @success-color-outline: fade(@success-color, @outline-fade);
// @success-color-deprecated-bg: color(~`colorPalette('@{success-color}', 1) `);
// @success-color-deprecated-border: color(~`colorPalette('@{success-color}', 3) `);

// // >>> Warning
// @warning-color: @gold-6;
// @warning-color-hover: color(~`colorPalette('@{warning-color}', 5) `);
// @warning-color-active: color(~`colorPalette('@{warning-color}', 7) `);
// @warning-color-outline: fade(@warning-color, @outline-fade);
// @warning-color-deprecated-bg: color(~`colorPalette('@{warning-color}', 1) `);
// @warning-color-deprecated-border: color(~`colorPalette('@{warning-color}', 3) `);

// // >>> Error
// @error-color: @red-5;
// @error-color-hover: color(~`colorPalette('@{error-color}', 5) `);
// @error-color-active: color(~`colorPalette('@{error-color}', 7) `);
// @error-color-outline: fade(@error-color, @outline-fade);
// @error-color-deprecated-bg: color(~`colorPalette('@{error-color}', 1) `);
// @error-color-deprecated-border: color(~`colorPalette('@{error-color}', 3) `);

// @highlight-color: @red-5;
// @normal-color: #d9d9d9;
// @white: #fff;
// @black: #000;

// // Color used by default to control hover and active backgrounds and for
// // alert info backgrounds.
// @primary-1: color(~`colorPalette('@{primary-color}', 1) `); // replace tint(@primary-color, 90%)
// @primary-2: color(~`colorPalette('@{primary-color}', 2) `); // replace tint(@primary-color, 80%)
// @primary-3: color(~`colorPalette('@{primary-color}', 3) `); // unused
// @primary-4: color(~`colorPalette('@{primary-color}', 4) `); // unused
// @primary-5: color(
//   ~`colorPalette('@{primary-color}', 5) `
// ); // color used to control the text color in many active and hover states, replace tint(@primary-color, 20%)
// @primary-6: @primary-color; // color used to control the text color of active buttons, don't use, use @primary-color
// @primary-7: color(~`colorPalette('@{primary-color}', 7) `); // replace shade(@primary-color, 5%)
// @primary-8: color(~`colorPalette('@{primary-color}', 8) `); // unused
// @primary-9: color(~`colorPalette('@{primary-color}', 9) `); // unused
// @primary-10: color(~`colorPalette('@{primary-color}', 10) `); // unused

// // Base Scaffolding Variables
// // ---

// // Background color for `<body>`
// @body-background: #fff;
// // Base background color for most components
// @component-background: #fff;
// // Popover background color
// @popover-background: @component-background;
// @popover-customize-border-color: @border-color-split;
// @font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
//   'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
//   'Noto Color Emoji';
// @code-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
// @text-color: fade(@black, 85%);
// @text-color-secondary: fade(@black, 45%);
// @text-color-inverse: @white;
// @icon-color: inherit;
// @icon-color-hover: fade(@black, 75%);
// @heading-color: fade(@black, 85%);
// @text-color-dark: fade(@white, 85%);
// @text-color-secondary-dark: fade(@white, 65%);
// @text-selection-bg: @primary-color;
// @font-variant-base: tabular-nums;
// @font-feature-settings-base: 'tnum';
// @font-size-base: 14px;
// @font-size-lg: @font-size-base + 2px;
// @font-size-sm: 12px;
// @heading-1-size: ceil(@font-size-base * 2.71);
// @heading-2-size: ceil(@font-size-base * 2.14);
// @heading-3-size: ceil(@font-size-base * 1.71);
// @heading-4-size: ceil(@font-size-base * 1.42);
// @heading-5-size: ceil(@font-size-base * 1.14);
// // https://github.com/ant-design/ant-design/issues/20210
// @line-height-base: 1.5715;
// @border-radius-base: 2px;
// @border-radius-sm: @border-radius-base;

// // control border
// @control-border-radius: @border-radius-base;

// // arrow border
// @arrow-border-radius: 2px;

// // vertical paddings
// @padding-lg: 24px; // containers
// @padding-md: 16px; // small containers and buttons
// @padding-sm: 12px; // Form controls and items
// @padding-xs: 8px; // small items
// @padding-xss: 4px; // more small

// // vertical margins
// @margin-lg: 24px; // containers
// @margin-md: 16px; // small containers and buttons
// @margin-sm: 12px; // Form controls and items
// @margin-xs: 8px; // small items
// @margin-xss: 4px; // more small

// // height rules
// @height-base: 32px;
// @height-lg: 40px;
// @height-sm: 24px;

// // The background colors for active and hover states for things like
// // list items or table cells.
// @item-active-bg: @primary-1;
// @item-hover-bg: #f5f5f5;

// // Animation
// @ease-base-out: cubic-bezier(0.7, 0.3, 0.1, 1);
// @ease-base-in: cubic-bezier(0.9, 0, 0.3, 0.7);
// @ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
// @ease-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);
// @ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
// @ease-out-back: cubic-bezier(0.12, 0.4, 0.29, 1.46);
// @ease-in-back: cubic-bezier(0.71, -0.46, 0.88, 0.6);
// @ease-in-out-back: cubic-bezier(0.71, -0.46, 0.29, 1.46);
// @ease-out-circ: cubic-bezier(0.08, 0.82, 0.17, 1);
// @ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.34);
// @ease-in-out-circ: cubic-bezier(0.78, 0.14, 0.15, 0.86);
// @ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
// @ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
// @ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);

// // Border color
// @border-color-base: hsv(0, 0, 85%); // base border outline a component
// @border-color-split: hsv(0, 0, 94%); // split border inside a component
// @border-color-inverse: @white;
// @border-width-base: 1px; // width of the border for a component
// @border-style-base: solid; // style of a components border

// // Outline
// @outline-blur-size: 0;
// @outline-width: 2px;
// @outline-color: @primary-color; // No use anymore
// @outline-fade: 20%;

// @background-color-light: hsv(0, 0, 98%); // background of header and selected item
// @background-color-base: hsv(0, 0, 96%); // Default grey background color

// // Disabled states
// @disabled-color: fade(#000, 25%);
// @disabled-bg: @background-color-base;
// @disabled-active-bg: tint(@black, 90%);
// @disabled-color-dark: fade(#fff, 35%);

// // Shadow
// @shadow-color: rgba(0, 0, 0, 0.15);
// @shadow-color-inverse: @component-background;
// @box-shadow-base: @shadow-2;
// @shadow-1-up: 0 -6px 16px -8px rgba(0, 0, 0, 0.08), 0 -9px 28px 0 rgba(0, 0, 0, 0.05),
//   0 -12px 48px 16px rgba(0, 0, 0, 0.03);
// @shadow-1-down: 0 6px 16px -8px rgba(0, 0, 0, 0.08), 0 9px 28px 0 rgba(0, 0, 0, 0.05),
//   0 12px 48px 16px rgba(0, 0, 0, 0.03);
// @shadow-1-left: -6px 0 16px -8px rgba(0, 0, 0, 0.08), -9px 0 28px 0 rgba(0, 0, 0, 0.05),
//   -12px 0 48px 16px rgba(0, 0, 0, 0.03);
// @shadow-1-right: 6px 0 16px -8px rgba(0, 0, 0, 0.08), 9px 0 28px 0 rgba(0, 0, 0, 0.05),
//   12px 0 48px 16px rgba(0, 0, 0, 0.03);
// @shadow-2: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
//   0 9px 28px 8px rgba(0, 0, 0, 0.05);

// // Buttons
// @btn-font-weight: 400;
// @btn-border-radius-base: @border-radius-base;
// @btn-border-radius-sm: @border-radius-base;
// @btn-border-width: @border-width-base;
// @btn-border-style: @border-style-base;
// @btn-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
// @btn-primary-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
// @btn-text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);

// @btn-primary-color: #fff;
// @btn-primary-bg: @primary-color;

// @btn-default-color: @text-color;
// @btn-default-bg: @component-background;
// @btn-default-border: @border-color-base;

// @btn-danger-color: #fff;
// @btn-danger-bg: @error-color;
// @btn-danger-border: @error-color;

// @btn-disable-color: @disabled-color;
// @btn-disable-bg: @disabled-bg;
// @btn-disable-border: @border-color-base;

// @btn-default-ghost-color: @component-background;
// @btn-default-ghost-bg: transparent;
// @btn-default-ghost-border: @component-background;

// @btn-font-size-lg: @font-size-lg;
// @btn-font-size-sm: @font-size-base;
// @btn-padding-horizontal-base: @padding-md - 1px;
// @btn-padding-horizontal-lg: @btn-padding-horizontal-base;
// @btn-padding-horizontal-sm: @padding-xs - 1px;

// @btn-height-base: @height-base;
// @btn-height-lg: @height-lg;
// @btn-height-sm: @height-sm;

// @btn-line-height: @line-height-base;

// @btn-circle-size: @btn-height-base;
// @btn-circle-size-lg: @btn-height-lg;
// @btn-circle-size-sm: @btn-height-sm;

// @btn-square-size: @btn-height-base;
// @btn-square-size-lg: @btn-height-lg;
// @btn-square-size-sm: @btn-height-sm;
// @btn-square-only-icon-size: @font-size-base + 2px;
// @btn-square-only-icon-size-sm: @font-size-base;
// @btn-square-only-icon-size-lg: @btn-font-size-lg + 2px;

// @btn-group-border: @primary-5;

// @btn-link-hover-bg: transparent;
// @btn-text-hover-bg: rgba(0, 0, 0, 0.018);

// // Dropdown
// @dropdown-selected-color: @primary-color;
// @dropdown-menu-submenu-disabled-bg: @component-background;
// @dropdown-selected-bg: @item-active-bg;

// // Empty
// @empty-font-size: @font-size-base;

// // Radio
// @radio-size: 16px;
// @radio-top: 0.2em;
// @radio-border-width: 1px;
// @radio-dot-size: @radio-size - 8px;
// @radio-dot-color: @primary-color;
// @radio-dot-disabled-color: fade(@black, 20%);
// @radio-solid-checked-color: @component-background;

// // Radio buttons
// @radio-button-bg: @btn-default-bg;
// @radio-button-checked-bg: @btn-default-bg;
// @radio-button-color: @btn-default-color;
// @radio-button-hover-color: @primary-5;
// @radio-button-active-color: @primary-7;
// @radio-button-padding-horizontal: @padding-md - 1px;
// @radio-disabled-button-checked-bg: @disabled-active-bg;
// @radio-disabled-button-checked-color: @disabled-color;
// @radio-wrapper-margin-right: 8px;

// // Media queries breakpoints
// // @screen-xs and @screen-xs-min is not used in Grid
// // smallest break point is @screen-md
// @screen-xs: 480px;
// @screen-xs-min: @screen-xs;
// // 👆 Extra small screen / phone

// // 👇 Small screen / tablet
// @screen-sm: 576px;
// @screen-sm-min: @screen-sm;

// // Medium screen / desktop
// @screen-md: 768px;
// @screen-md-min: @screen-md;

// // Large screen / wide desktop
// @screen-lg: 992px;
// @screen-lg-min: @screen-lg;

// // Extra large screen / full hd
// @screen-xl: 1200px;
// @screen-xl-min: @screen-xl;

// // Extra extra large screen / large desktop
// @screen-xxl: 1600px;
// @screen-xxl-min: @screen-xxl;

// // provide a maximum
// @screen-xs-max: (@screen-sm-min - 1px);
// @screen-sm-max: (@screen-md-min - 1px);
// @screen-md-max: (@screen-lg-min - 1px);
// @screen-lg-max: (@screen-xl-min - 1px);
// @screen-xl-max: (@screen-xxl-min - 1px);

// // Grid system
// @grid-columns: 24;

// // Layout
// @layout-body-background: #f0f2f5;
// @layout-header-background: #001529;
// @layout-header-height: 64px;
// @layout-header-padding: 0 50px;
// @layout-header-color: @text-color;
// @layout-footer-padding: 24px 50px;
// @layout-footer-background: @layout-body-background;
// @layout-sider-background: @layout-header-background;
// @layout-trigger-height: 48px;
// @layout-trigger-background: #002140;
// @layout-trigger-color: #fff;
// @layout-zero-trigger-width: 36px;
// @layout-zero-trigger-height: 42px;
// // Layout light theme
// @layout-sider-background-light: #fff;
// @layout-trigger-background-light: #fff;
// @layout-trigger-color-light: @text-color;

// // z-index list, order by `z-index`
// @zindex-badge: auto;
// @zindex-table-fixed: 2;
// @zindex-affix: 10;
// @zindex-back-top: 10;
// @zindex-picker-panel: 10;
// @zindex-popup-close: 10;
// @zindex-modal: 1000;
// @zindex-modal-mask: 1000;
// @zindex-message: 1010;
// @zindex-notification: 1010;
// @zindex-popover: 1030;
// @zindex-dropdown: 1050;
// @zindex-picker: 1050;
// @zindex-popoconfirm: 1060;
// @zindex-tooltip: 1070;
// @zindex-image: 1080;

// // Animation
// @animation-duration-slow: 0.3s; // Modal
// @animation-duration-base: 0.2s;
// @animation-duration-fast: 0.1s; // Tooltip

// //Dropdown
// @dropdown-menu-bg: @component-background;
// @dropdown-vertical-padding: 5px;
// @dropdown-edge-child-vertical-padding: 4px;
// @dropdown-font-size: @font-size-base;
// @dropdown-line-height: 22px;

// // Form
// // ---
// @label-required-color: @highlight-color;
// @label-color: @heading-color;
// @form-warning-input-bg: @input-bg;
// @form-item-margin-bottom: 24px;
// @form-item-trailing-colon: true;
// @form-vertical-label-padding: 0 0 8px;
// @form-vertical-label-margin: 0;
// @form-item-label-font-size: @font-size-base;
// @form-item-label-height: @input-height-base;
// @form-item-label-colon-margin-right: 8px;
// @form-item-label-colon-margin-left: 2px;
// @form-error-input-bg: @input-bg;

// // Input
// // ---
// @input-height-base: @height-base;
// @input-height-lg: @height-lg;
// @input-height-sm: @height-sm;
// @input-padding-horizontal: @control-padding-horizontal - 1px;
// @input-padding-horizontal-base: @input-padding-horizontal;
// @input-padding-horizontal-sm: @control-padding-horizontal-sm - 1px;
// @input-padding-horizontal-lg: @input-padding-horizontal;
// @input-padding-vertical-base: max(
//   (round(((@input-height-base - @font-size-base * @line-height-base) / 2) * 10) / 10) -
//     @border-width-base,
//   3px
// );
// @input-padding-vertical-sm: max(
//   (round(((@input-height-sm - @font-size-base * @line-height-base) / 2) * 10) / 10) -
//     @border-width-base,
//   0
// );
// @input-padding-vertical-lg: (
//     ceil(((@input-height-lg - @font-size-lg * @line-height-base) / 2) * 10) / 10
//   ) - @border-width-base;
// @input-placeholder-color: hsv(0, 0, 75%);
// @input-color: @text-color;
// @input-icon-color: @input-color;
// @input-border-color: @border-color-base;
// @input-bg: @component-background;
// @input-number-hover-border-color: @input-hover-border-color;
// @input-number-handler-active-bg: #f4f4f4;
// @input-number-handler-hover-bg: @primary-5;
// @input-number-handler-bg: @component-background;
// @input-number-handler-border-color: @border-color-base;
// @input-addon-bg: @background-color-light;
// @input-hover-border-color: @primary-5;
// @input-disabled-bg: @disabled-bg;
// @input-outline-offset: 0 0;
// @input-icon-hover-color: fade(@black, 85%);
// @input-disabled-color: @disabled-color;

// // Select
// // ---
// @select-border-color: @border-color-base;
// @select-item-selected-color: @text-color;
// @select-item-selected-font-weight: 600;
// @select-dropdown-bg: @component-background;
// @select-item-selected-bg: @primary-1;
// @select-item-active-bg: @item-hover-bg;
// @select-dropdown-vertical-padding: @dropdown-vertical-padding;
// @select-dropdown-font-size: @dropdown-font-size;
// @select-dropdown-line-height: @dropdown-line-height;
// @select-dropdown-height: 32px;
// @select-background: @component-background;
// @select-clear-background: @select-background;
// @select-selection-item-bg: @background-color-base;
// @select-selection-item-border-color: @border-color-split;
// @select-single-item-height-lg: 40px;
// @select-multiple-item-height: @input-height-base - @input-padding-vertical-base * 2; // Normal 24px
// @select-multiple-item-height-lg: 32px;
// @select-multiple-item-spacing-half: ceil((@input-padding-vertical-base / 2));
// @select-multiple-disabled-background: @input-disabled-bg;
// @select-multiple-item-disabled-color: #bfbfbf;
// @select-multiple-item-disabled-border-color: @select-border-color;

// // Modal
// // --
// @modal-header-padding-vertical: @padding-md;
// @modal-header-padding-horizontal: @padding-lg;
// @modal-body-padding: @padding-lg;
// @modal-header-bg: @component-background;
// @modal-header-padding: @modal-header-padding-vertical @modal-header-padding-horizontal;
// @modal-header-border-width: @border-width-base;
// @modal-header-border-style: @border-style-base;
// @modal-header-title-line-height: 22px;
// @modal-header-title-font-size: @font-size-lg;
// @modal-header-border-color-split: @border-color-split;
// @modal-header-close-size: @modal-header-title-line-height + 2 * @modal-header-padding-vertical;
// @modal-content-bg: @component-background;
// @modal-heading-color: @heading-color;
// @modal-close-color: @text-color-secondary;
// @modal-footer-bg: transparent;
// @modal-footer-border-color-split: @border-color-split;
// @modal-footer-border-style: @border-style-base;
// @modal-footer-padding-vertical: 10px;
// @modal-footer-padding-horizontal: 16px;
// @modal-footer-border-width: @border-width-base;
// @modal-mask-bg: fade(@black, 45%);
// @modal-confirm-body-padding: 32px 32px 24px;
// @modal-confirm-title-font-size: @font-size-lg;
// @modal-border-radius: @border-radius-base;

// // Menu
// // ---
// @menu-inline-toplevel-item-height: 40px;
// @menu-item-height: 40px;
// @menu-item-group-height: @line-height-base;
// @menu-collapsed-width: 80px;
// @menu-bg: @component-background;
// @menu-popup-bg: @component-background;
// @menu-item-color: @text-color;
// @menu-inline-submenu-bg: @background-color-light;
// @menu-highlight-color: @primary-color;
// @menu-highlight-danger-color: @error-color;
// @menu-item-active-bg: @primary-1;
// @menu-item-active-danger-bg: @red-1;
// @menu-item-active-border-width: 3px;
// @menu-item-group-title-color: @text-color-secondary;
// @menu-item-vertical-margin: 4px;
// @menu-item-font-size: @font-size-base;
// @menu-item-boundary-margin: 8px;
// @menu-item-padding-horizontal: 20px;
// @menu-item-padding: 0 @menu-item-padding-horizontal;
// @menu-horizontal-line-height: 46px;
// @menu-icon-margin-right: 10px;
// @menu-icon-size: @menu-item-font-size;
// @menu-icon-size-lg: @font-size-lg;
// @menu-item-group-title-font-size: @menu-item-font-size;

// // dark theme
// @menu-dark-color: @text-color-secondary-dark;
// @menu-dark-danger-color: @error-color;
// @menu-dark-bg: @layout-header-background;
// @menu-dark-arrow-color: #fff;
// @menu-dark-inline-submenu-bg: #000c17;
// @menu-dark-highlight-color: #fff;
// @menu-dark-item-active-bg: @primary-color;
// @menu-dark-item-active-danger-bg: @error-color;
// @menu-dark-selected-item-icon-color: @white;
// @menu-dark-selected-item-text-color: @white;
// @menu-dark-item-hover-bg: transparent;
// // Spin
// // ---
// @spin-dot-size-sm: 14px;
// @spin-dot-size: 20px;
// @spin-dot-size-lg: 32px;

// // Table
// // --
// @table-bg: @component-background;
// @table-header-bg: @background-color-light;
// @table-header-color: @heading-color;
// @table-header-sort-bg: @background-color-base;
// @table-body-sort-bg: #fafafa;
// @table-row-hover-bg: @background-color-light;
// @table-selected-row-color: inherit;
// @table-selected-row-bg: @primary-1;
// @table-body-selected-sort-bg: @table-selected-row-bg;
// @table-selected-row-hover-bg: darken(@table-selected-row-bg, 2%);
// @table-expanded-row-bg: #fbfbfb;
// @table-padding-vertical: 16px;
// @table-padding-horizontal: 16px;
// @table-padding-vertical-md: (@table-padding-vertical * 3 / 4);
// @table-padding-horizontal-md: (@table-padding-horizontal / 2);
// @table-padding-vertical-sm: (@table-padding-vertical / 2);
// @table-padding-horizontal-sm: (@table-padding-horizontal / 2);
// @table-border-color: @border-color-split;
// @table-border-radius-base: @border-radius-base;
// @table-footer-bg: @background-color-light;
// @table-footer-color: @heading-color;
// @table-header-bg-sm: @table-header-bg;
// @table-font-size: @font-size-base;
// @table-font-size-md: @table-font-size;
// @table-font-size-sm: @table-font-size;
// @table-header-cell-split-color: rgba(0, 0, 0, 0.06);

// // Tag
// // --
// @tag-border-radius: @border-radius-base;
// @tag-default-bg: @background-color-light;
// @tag-default-color: @text-color;
// @tag-font-size: @font-size-sm;
// @tag-line-height: 20px;

// // Card
// // ---
// @card-head-color: @heading-color;
// @card-head-background: transparent;
// @card-head-font-size: @font-size-lg;
// @card-head-font-size-sm: @font-size-base;
// @card-head-padding: 16px;
// @card-head-padding-sm: (@card-head-padding / 2);
// @card-head-height: 48px;
// @card-head-height-sm: 36px;
// @card-inner-head-padding: 12px;
// @card-padding-base: 24px;
// @card-padding-base-sm: (@card-padding-base / 2);
// @card-actions-background: @component-background;
// @card-actions-li-margin: 12px 0;
// @card-skeleton-bg: #cfd8dc;
// @card-background: @component-background;
// @card-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12),
//   0 5px 12px 4px rgba(0, 0, 0, 0.09);
// @card-radius: @border-radius-base;
// @card-head-tabs-margin-bottom: -17px;
// @card-head-extra-color: @text-color;

// // Tabs
// // ---
// @tabs-card-head-background: @background-color-light;
// @tabs-card-height: 40px;
// @tabs-card-active-color: @primary-color;
// @tabs-card-horizontal-padding: (
//     (@tabs-card-height - floor(@font-size-base * @line-height-base)) / 2
//   ) - @border-width-base @padding-md;
// @tabs-card-horizontal-padding-sm: 6px @padding-md;
// @tabs-card-horizontal-padding-lg: 7px @padding-md 6px;
// @tabs-title-font-size: @font-size-base;
// @tabs-title-font-size-lg: @font-size-lg;
// @tabs-title-font-size-sm: @font-size-base;
// @tabs-ink-bar-color: @primary-color;
// @tabs-bar-margin: 0 0 @margin-md 0;
// @tabs-horizontal-gutter: 32px;
// @tabs-horizontal-margin: 0 0 0 @tabs-horizontal-gutter;
// @tabs-horizontal-margin-rtl: 0 0 0 32px;
// @tabs-horizontal-padding: @padding-sm 0;
// @tabs-horizontal-padding-lg: @padding-md 0;
// @tabs-horizontal-padding-sm: @padding-xs 0;
// @tabs-vertical-padding: @padding-xs @padding-lg;
// @tabs-vertical-margin: @margin-md 0 0 0;
// @tabs-scrolling-size: 32px;
// @tabs-highlight-color: @primary-color;
// @tabs-hover-color: @primary-5;
// @tabs-active-color: @primary-7;
// @tabs-card-gutter: 2px;
// @tabs-card-tab-active-border-top: 2px solid transparent;

// // Pagination
// // ---
// @pagination-item-bg: @component-background;
// @pagination-item-size: @height-base;
// @pagination-item-size-sm: 24px;
// @pagination-font-family: @font-family;
// @pagination-font-weight-active: 500;
// @pagination-item-bg-active: @component-background;
// @pagination-item-link-bg: @component-background;
// @pagination-item-disabled-color-active: @disabled-color;
// @pagination-item-disabled-bg-active: @disabled-active-bg;
// @pagination-item-input-bg: @component-background;
// @pagination-mini-options-size-changer-top: 0px;

// // Tree
// // ---
// @tree-bg: @component-background;
// @tree-title-height: 24px;
// @tree-child-padding: 18px;
// @tree-directory-selected-color: #fff;
// @tree-directory-selected-bg: @primary-color;
// @tree-node-hover-bg: @item-hover-bg;
// @tree-node-selected-bg: @primary-2;

// // Transfer
// // ---
// @transfer-header-height: 40px;
// @transfer-item-height: @height-base;
// @transfer-disabled-bg: @disabled-bg;
// @transfer-list-height: 200px;
// @transfer-item-hover-bg: @item-hover-bg;
// @transfer-item-selected-hover-bg: darken(@item-active-bg, 2%);
// @transfer-item-padding-vertical: 6px;
// @transfer-list-search-icon-top: 12px;

// // Drawer
// // ---
// @drawer-header-padding: @padding-md @padding-lg;
// @drawer-body-padding: @padding-lg;
// @drawer-bg: @component-background;
// @drawer-footer-padding-vertical: @modal-footer-padding-vertical;
// @drawer-footer-padding-horizontal: @modal-footer-padding-horizontal;
// @drawer-header-close-size: 56px;
// @drawer-title-font-size: @font-size-lg;
// @drawer-title-line-height: 22px;
