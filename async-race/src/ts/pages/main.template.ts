export const mainPage: Page = (props = {}) => `
<main-navigation class="main-navigation" data-search="${props.search || ''}"></main-navigation>
<main-component>Main</main-component>`;
