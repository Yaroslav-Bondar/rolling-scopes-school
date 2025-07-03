export const mainPage: Page = (props = {}) => `
<x-navigation data-search="${props.search || ''}"></x-navigation>
<x-main>Main</x-main>`;
