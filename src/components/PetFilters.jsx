// EXTRA: the search and filter panel on the Pets page.
// It does not filter anything itself, it only shows the controls.
// The Pets page keeps the "filters" values and does the filtering.
import { AGE_GROUPS } from "../utils/petHelpers.js";

export default function PetFilters({ filters, onChange, onClear, onSurprise }) {
  return (
    <form className="filters card" onSubmit={(e) => e.preventDefault()} aria-label="Search and filter pets">
      {/* search box */}
      <div className="field wide">
        <label htmlFor="search">Search by name, breed or personality</label>
        <input
          id="search"
          type="search"
          placeholder="Try &quot;playful&quot; or &quot;beagle&quot;"
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
        />
      </div>

      {/* dog / cat buttons */}
      <div className="field">
        <span className="label">Type</span>
        <div className="segmented">
          {["All", "Dog", "Cat"].map((option) => (
            <button
              type="button"
              key={option}
              className={filters.species === option ? "on" : ""}
              aria-pressed={filters.species === option}
              onClick={() => onChange("species", option)}
            >
              {option === "All" ? "All" : option + "s"}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="age">Age</label>
        <select id="age" value={filters.age} onChange={(e) => onChange("age", e.target.value)}>
          <option>Any</option>
          {AGE_GROUPS.map((group) => (
            <option key={group}>{group}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="size">Size</label>
        <select id="size" value={filters.size} onChange={(e) => onChange("size", e.target.value)}>
          <option>Any</option>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={filters.sort} onChange={(e) => onChange("sort", e.target.value)}>
          <option value="name">Name (A to Z)</option>
          <option value="youngest">Youngest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {/* tick boxes */}
      <div className="field checks wide">
        <label>
          <input type="checkbox" checked={filters.kidsOnly} onChange={(e) => onChange("kidsOnly", e.target.checked)} />
          Good with kids
        </label>
        <label>
          <input type="checkbox" checked={filters.favsOnly} onChange={(e) => onChange("favsOnly", e.target.checked)} />
          My favourites only ♥
        </label>
      </div>

      <div className="field wide row-buttons">
        <button type="button" className="btn outline small" onClick={onClear}>Clear filters</button>
        <button type="button" className="btn small" onClick={onSurprise}>🎲 Surprise me</button>
      </div>
    </form>
  );
}
