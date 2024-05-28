import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import './SearchByDescription.css';

const FIND_BY_DESCRIPTION = gql`
  query findByDescription($description: String!) {
    findByDescription(description: $description) {
      description
      effectiveDate
      ndc
      nadac_PerUnit
    }
  }
`;

function SearchByDescription() {
  const [searchInput, setSearchInput] = useState('');
  const [findByDescription, { loading, error, data }] = useLazyQuery(FIND_BY_DESCRIPTION);

  const handleSearch = () => {
    findByDescription({ variables: { description: searchInput } });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="SearchByDescription">
      <div className="header">Search by Description</div>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter Description"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="results-grid">
          {data.findByDescription.map((item) => (
            <div key={item.ndc} className="result-item">
              <p>Description: {item.description}</p>
              <p>Effective Date: {item.effectiveDate}</p>
              <p>NDC: {item.ndc}</p>
              <p>NADAC Per Unit: {item.nadac_PerUnit}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchByDescription;