import warn from './utils/warn'

// https://developers.google.com/tag-manager/quickstart

const Snippets = {
  tags: function ({ id, events, dataLayer, dataLayerName, preview, auth }) {
    const gtm_auth = `&gtm_auth=${auth}`
    const gtm_preview = `&gtm_preview=${preview}`

    if (!id) warn('GTM Id is required')
    
    const iframe = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${id}${gtm_auth}${gtm_preview}&gtm_cookies_win=x"
        height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`

    const script = `
      dataLayer = {
        'gtm.start': {
          ${id}: true,
        }
      };
    </script>
    <script src="https://www.googletagmanager.com/gtag/js"></script>
    <script>
      gtag('js', {
        'gtm.start': dataLayer['gtm.start']
      });
    `;
  
    const dataLayerVar = this.dataLayer(dataLayer, dataLayerName)
  
    return {
      iframe,
      script,
      dataLayerVar
    }
  },
  dataLayer: function (dataLayer, dataLayerName) {
    return `
      window.${dataLayerName} = window.${dataLayerName} || [];
      window.${dataLayerName}.push(${JSON.stringify(dataLayer)})`
  }
}  

module.exports = Snippets
