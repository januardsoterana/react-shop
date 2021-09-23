import React from 'react'

import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, Index, Configure } from 'react-instantsearch-dom'
import AutoComplete from './searchAutoComplete.js'

import './search.css'

const searchClient = algoliasearch('0AHOWCUC2T', '52cdc6eeac667a944823a756150f6912')

const env = 'dev'
const storeIndex = `${env}_holdings_stores`
const stylesIndex = `${env}_holdings_styles`
const productsIndex = `${env}_holdings_products`
const howtosIndex = `${env}_holdings_howtos`

export default () => (
  <InstantSearch indexName={howtosIndex} searchClient={searchClient}>
    <Configure hitsPerPage={3} />
    <AutoComplete />
    <Index indexName={storeIndex} />
    <Index indexName={stylesIndex} />
    <Index indexName={productsIndex} />
    <Index indexName={howtosIndex} />
  </InstantSearch>
);

