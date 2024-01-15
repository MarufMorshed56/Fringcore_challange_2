import React, {useState, useEffect} from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const keywords1 = ['tomato']
  const keywords2 = ['tomato', 'tom cruise', 'tetul', 'technology'];

  useEffect(() => {
    renderAutocompleteHints()
  }, [inputValue])

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  // trying to change the text color for "tomato"
  const highlightKeywords = (text) => {
    let highlightedText = text;
    keywords1.forEach((keyword) => {
      highlightedText = highlightedText.split(keyword).join(`|${keyword}|`);
    });

    return highlightedText.split('|').map((part, index) => {
      const isKeyword = index % 2 === 1;
      return isKeyword ? <span key={index} style={{color: 'red'}}>{part}</span> : part;
    });
  };

  const renderColoredText = (text) => {
    let highlightedText = text;

    keywords1.forEach((keyword) => {
      highlightedText = highlightedText.split(keyword).join(`|${keyword}|`);
    });

    return <div>{highlightedText.split('|').map((part, index) => {
      const isKeyword = index % 2 === 1;
      return isKeyword ? <span key={index} style={{color: 'red'}}>{part}</span> : part;
    })}
    </div>
  };

  // list out the hints 
  const renderAutocompleteHints = () => {
    const filteredHints = keywords2.filter((hint) => hint.includes(inputValue.toLowerCase()));
    return (
      <ul>
        {filteredHints.map((hint) => (
          <li key={hint} onClick={() => setInputValue(hint)}>
            {hint}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        maxLength={64}
      />
      {renderColoredText(inputValue)}
      {inputValue && renderAutocompleteHints()}
    </div>
  );
};

export default App;
