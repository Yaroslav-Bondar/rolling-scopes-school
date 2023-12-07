export const errorPage: Page = (props = {}) => `
<h1>Error ${props.code || ''}</h1>
<h3>${props.message || 'Something went wrong.'}</h3>`;
