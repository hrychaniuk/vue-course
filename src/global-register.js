import Vue from 'vue';

/**
 * -------------------------------
 * Components
 * -------------------------------
 */
import Header from '@/chunks/header/header';
Vue.component('v-header', Header);

/**
 * -------------------------------
 * Mixins
 * -------------------------------
 */
import { mixin } from '@/global-mixin';
Vue.mixin(mixin);

/**
 * -------------------------------
 * Filters
 * -------------------------------
 */
import moment from 'moment';
Vue.filter('formatDate', function(value) {
  if (value) {
    // return moment(String(value)).format('MM/DD/YYYY hh:mm');
    return moment(String(value)).format('MM/DD/YYYY');
  }
});
