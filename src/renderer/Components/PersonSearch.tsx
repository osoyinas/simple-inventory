import { useRef } from "react";

export function PersonSearch({
  handleSearchChange,
}: {
  handleSearchChange: (search: string) => void;
}) {
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchChange(searchRef.current?.value as string);
      }}
      className="join flex items-end  rounded-2xl"
    >
      <label className="form-control">
        <div className="label">
          <span className="label-text">Buscar</span>
        </div>
        <input
          ref={searchRef}
          name="search"
          className="input input-bordered join-item"
          placeholder="Buscar"
          onChange={() =>
            handleSearchChange(searchRef.current?.value as string)
          }
        />
      </label>

      <button className="btn join-item btn-secondary">Buscar</button>
    </form>
  );
}
