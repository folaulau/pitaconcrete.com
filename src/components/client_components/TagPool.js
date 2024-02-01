'use client'

import React, { useState } from 'react';

const TagPool = () => {
    const [tags, setTags] = useState([]);
    const [input, setInput] = useState('');

    const addTag = (e) => {
        e.preventDefault();
        if (input && !tags.includes(input)) {
            setTags([...tags, input]);
            setInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div>
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Add a tag" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button 
                    className="btn btn-primary mt-2"
                    onClick={addTag}
                >
                    Add Tag
                </button>
            </div>
            <div className="d-flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary" onClick={() => removeTag(tag)}>
                        {tag} <span>&times;</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagPool;
