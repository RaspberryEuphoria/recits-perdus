type ScenariosFiltersProps = {
  scenariosCount: number;
  locations: string[];
  eras: string[];
  activeLocations: string[];
  activeEras: string[];
  filterByLocation: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterByEra: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ScenariosFilters({
  scenariosCount,
  locations: initialLocations,
  eras: initalEras,
  activeLocations,
  activeEras,
  filterByLocation,
  filterByEra,
}: ScenariosFiltersProps) {
  return (
    <div>
      <p>
        <strong>{scenariosCount}</strong> scénarios en cours.
      </p>
      <h2>Filtrer par planète</h2>
      <ul>
        {initialLocations.map((location) => (
          <li key={location}>
            <label>
              <input
                type="checkbox"
                checked={activeLocations.includes(location)}
                onChange={filterByLocation}
                value={location}
              />
              {location}
            </label>
          </li>
        ))}
      </ul>
      <h2>Filtrer par époque</h2>
      <ul>
        {initalEras.map((era) => (
          <li key={era}>
            <label>
              <input
                type="checkbox"
                checked={activeEras.includes(era)}
                onChange={filterByEra}
                value={era}
              />
              {era}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
