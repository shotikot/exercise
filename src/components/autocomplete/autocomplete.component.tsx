import { useState, useCallback, ChangeEvent } from "react";
import { IAutocompleteProps } from "./autocomplete.types";

import "./autocomplete.css";

export function Autocomplete<T>({
  fetchOptions,
  onSelect,
  displayOption,
}: IAutocompleteProps<T>) {
  const [query, setQuery] = useState<string>("");
  const [options, setOptions] = useState<T[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const fetchSearchResults = useCallback(
    async (searchQuery: string) => {
      setLoading(true);

      const data = await fetchOptions(searchQuery);

      setOptions(data);
      setLoading(false);
    },
    [fetchOptions]
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newDebounceTimer = setTimeout(() => {
      fetchSearchResults(value);
    }, 300);

    setDebounceTimer(newDebounceTimer);
  };

  const handleSelectOption = (item: T) => {
    setQuery(displayOption(item));
    setOptions([]);
    onSelect && onSelect(item);
  };

  const highlightMatch = (item: T) => {
    const itemStr = displayOption(item);
    const lowerItemStr = itemStr.toLowerCase();
    const lowerQuery = query.toLowerCase();
  
    let matchIndex = 0;
    let nextIndex = lowerItemStr.indexOf(lowerQuery);
  
    let parts = [];
    while (nextIndex !== -1) {
      if (matchIndex !== nextIndex) {
        parts.push({ text: itemStr.slice(matchIndex, nextIndex), isMatch: false });
      }
      parts.push({
        text: itemStr.slice(nextIndex, nextIndex + query.length),
        isMatch: true,
      });
  
      matchIndex = nextIndex + query.length;
      nextIndex = lowerItemStr.indexOf(lowerQuery, matchIndex);
    }
  
    // add remaining text
    if (matchIndex !== itemStr.length) {
      parts.push({ text: itemStr.slice(matchIndex), isMatch: false });
    }
  
    return (
      <span>
        {parts.map((part, index) => part.isMatch ? (
          <span key={index} className="matchingText">
            {part.text}
          </span>
        ) : (
          part.text
        ))}
      </span>
    );
  };  

  return (
    <div className="autocompleteContainer">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        autoComplete="off"
      />
      {isLoading ? (
        <div className="isLoadingMessage">Loading...</div>
      ) : (
        <ul>
          {options.map((item, index) => (
            <li key={index} onClick={() => handleSelectOption(item)}>
              {highlightMatch(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
