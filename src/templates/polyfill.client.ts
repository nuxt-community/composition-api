// Necessary polyfill for Composition API support for IE11
import '<%= options.corejsPolyfill === "3" ? "core-js/features/reflect/own-keys" : "core-js/modules/es6.reflect.own-keys" %>'
