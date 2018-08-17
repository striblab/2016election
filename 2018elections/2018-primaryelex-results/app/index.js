// Utilize templates on the client.  Get the main content template.
import Content from '../templates/_index-content.svelte.html';
import { Store } from 'svelte/store.js';
import supplement from '../assets/data/results-supplement.json';
import { feature as topojsonFeature } from 'topojson';
import mnCountiesTopo from '../sources/mncounties.json';

/* global $ */

// // Hacky, get share elements
$(document).ready(() => {
  let $share = $('.share-placeholder').size()
    ? $('.share-placeholder')
      .children()
      .detach()
    : undefined;
  let attachShare = !$share
    ? undefined
    : () => {
      $('.share-placeholder').append($share);
    };

  // Create global store for UI
  const store = new Store({
    // No trailing slash
    civixEndpoint: '//static.startribune.com/elections/civix/mn-20180814',
    interval: 60 * 1000,
    mnCountiesGeo: topojsonFeature(
      mnCountiesTopo,
      mnCountiesTopo.objects.counties
    ).features
  });

  // Create UI
  const app = new Content({
    target: document.querySelector('.article-lcd-body-content'),
    hydrate: true,
    data: {
      supplement,
      attachShare
    },
    store
  });

  // Debug
  window._store = store;
  window._app = app;
});
