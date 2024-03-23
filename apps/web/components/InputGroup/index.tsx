import { InputGroupProps } from "../../lib/types/types";

export default function InputGroup({
  name,
  selectName,
  value = "",
  selectedCurrency,
  error,
  onChange,
  onSelect,
  tokens,
}: InputGroupProps): JSX.Element {
  return (
    <>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          name={name}
          className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0.00"
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label className="sr-only">Currency</label>
          <select
            name={selectName}
            className="h-full rounded-md border-none bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-none ring-0 focus:ring-0 text-xs md:text-sm text-right md:text-left"
            value={selectedCurrency}
            onChange={onSelect}
          >
            {tokens.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </>
  );
}
