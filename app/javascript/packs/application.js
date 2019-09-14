/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb
import ReactOnRails from 'react-on-rails';
import axios from 'axios';

import MoviesList from '../components/movies/MoviesList';

const csrfToken = document.querySelector("meta[name=csrf-token]").content
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken

ReactOnRails.register({
  MoviesList,
});
