import Vue from 'vue';
import moment from 'moment';
import Header from '@/chunks/header/header';

/**
 * -------------------------------
 * Components
 * -------------------------------
 */
Vue.component('v-header', Header);

/**
 * -------------------------------
 * Filters
 * -------------------------------
 */
Vue.filter('formatDate', function(value) {
  if (value) {
    // return moment(String(value)).format('MM/DD/YYYY hh:mm');
    return moment(String(value)).format('MM/DD/YYYY');
  }
});
