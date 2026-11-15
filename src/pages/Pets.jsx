// Pets page
// REQ: lists the current pets available for adoption
// EXTRA: search box, filters, sorting, favourites, "surprise me" button
import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PETS from "../data/pets.js";
import { ageGroup } from "../utils/petHelpers.js";
import useFavourites from "../hooks/useFavourites.js";
import PageHeader from "../components/PageHeader.jsx";
import PetCard from "../components/PetCard.jsx";
import PetFilters from "../components/PetFilters.jsx";

const DEFAULT_FILTERS = {
  search: "",
  species: "All",
  age: "Any",
  size: "Any",
  kidsOnly: false,
  favsOnly: false,
  sort: "name",
};

export default function Pets() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [favs, toggleFav] = useFavourites();

  // the link /pets?species=Dog opens this page with dogs already selected
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    species: params.get("species") || "All",
  });

  const changeFilter = (name, value) => setFilters((old) => ({ ...old, [name]: value }));

  // works out which pets to show whenever a filter changes
  const results = useMemo(() => {
    const text = filters.search.trim().toLowerCase();

    const list = PETS.filter((pet) => {
      const searchable = [pet.name, pet.breed, pet.species, ...pet.tags].join(" ").toLowerCase();

      if (text && !searchable.includes(text)) return false;
      if (filters.species !== "All" && pet.species !== filters.species) return false;
      if (filters.age !== "Any" && ageGroup(pet.age) !== filters.age) return false;
      if (filters.size !== "Any" && pet.size !== filters.size) return false;
      if (filters.kidsOnly && !pet.goodWithKids) return false;
      if (filters.favsOnly && !favs.includes(pet.id)) return false;
      return true;
    });

    // sorting
    if (filters.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (filters.sort === "youngest") list.sort((a, b) => a.age - b.age);
    if (filters.sort === "oldest") list.sort((a, b) => b.age - a.age);

    return list;
  }, [filters, favs]);

  // opens a random pet (from the current results if there are any)
  const surpriseMe = () => {
    const pool = results.length ? results : PETS;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    navigate(`/pets/${pick.id}`);
  };

  return (
    <>
      <PageHeader title="Our pets">
        These pets are all waiting for a loving home. Use the search to find your match.
      </PageHeader>

      <section className="container section">
        <PetFilters
          filters={filters}
          onChange={changeFilter}
          onClear={() => setFilters(DEFAULT_FILTERS)}
          onSurprise={surpriseMe}
        />

        {/* aria-live tells screen readers when the number changes */}
        <p className="result-count" aria-live="polite">
          Showing {results.length} of {PETS.length} pets
        </p>

        {results.length > 0 ? (
          <div className="grid">
            {results.map((pet) => (
              <PetCard key={pet.id} pet={pet} isFav={favs.includes(pet.id)} onToggleFav={toggleFav} />
            ))}
          </div>
        ) : (
          <div className="empty card card-body">
            <h3>No pets match your search</h3>
            <p>Try removing a filter or searching for something different.</p>
            <button className="btn small" onClick={() => setFilters(DEFAULT_FILTERS)}>Clear filters</button>
          </div>
        )}
      </section>
    </>
  );
}
