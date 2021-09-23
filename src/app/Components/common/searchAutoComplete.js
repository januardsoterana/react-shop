import React, { useState } from 'react'

import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';

const AutoComplete = ({ currentRefinement, refine, hits, onSuggestionSelected }) => {
    const [value, setValue] = useState(currentRefinement)
    const onChange = (event, { newValue }) => setValue(newValue)
    const onSuggestionsFetchRequested = ({ value }) => refine(value)
    const onSuggestionsClearRequested = () => refine()
    const getSuggestionValue = (hit) => hit.title
    const renderSuggestion = (hit) => (
      <Highlight attribute="title" hit={hit} tagName="mark" />
    )
    const renderSectionTitle = (section) => section.index
    const getSectionSuggestions = (section) => section.hits
    const inputProps = {
      placeholder: 'Search for something...',
      onChange,
      value,
    }

    return (
      <AutoSuggest
        suggestions={hits}
        multiSection={true}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
      />
    )
}

export default connectAutoComplete(AutoComplete)