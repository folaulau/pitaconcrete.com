'use client'

import React, { useState } from 'react';

const FilterPool = () => {
    const [filters, setFilters] = useState([]);
    const availableFilters = ['Filter 1', 'Filter 2', 'Filter 3']; // Replace with your filters

    const addFilter = (filterToAdd) => {
        if (!filters.includes(filterToAdd)) {
            setFilters([...filters, filterToAdd]);
        }
    };

    const removeFilter = (filterToRemove) => {
        setFilters(filters.filter(filter => filter !== filterToRemove));
    };

    return (
        <div>
            <div className="mb-3">
                {availableFilters.map((filter, index) => (
                    <button 
                        key={index} 
                        className="btn btn-outline-primary me-2"
                        onClick={() => addFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
            <div className="d-flex flex-wrap gap-2">
                {filters.map((filter, index) => (
                    <span key={index} className="badge bg-secondary" onClick={() => removeFilter(filter)}>
                        {filter} <span>&times;</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default FilterPool;
