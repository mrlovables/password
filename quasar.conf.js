/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
const { configure } = require('quasar/wrappers');

module.exports = configure(function() {
    return {
        // https://quasar.dev/quasar-cli/supporting-ts
        supportTS: false,

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
        framework: {
            config: {},

            // iconSet: 'material-icons', // Quasar icon set
            // lang: 'en-US', // Quasar language pack

            // For special cases outside of where the auto-import strategy can have an impact
            // (like functional components as one of the examples),
            // you can manually specify Quasar components/directives to be available everywhere:
            //
            components: ["QToolbar", 'QBtn', 'QIcon'],
            // directives: [],

            // Quasar plugins
            plugins: []
        },

        // animations: 'all', // --- includes all animations
        // https://quasar.dev/options/animations
        animations: [],
    }
});
