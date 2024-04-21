import { Controller, useFormContext } from "react-hook-form";

export const Checkbox = ({
  label,
  value,
  name,
}: {
  label: string;
  value: string;
  name: string;
}) => {
  const { control } = useFormContext();
  const inputValue = value;

  return (
    <Controller
      control={control}
      name={name}
      key={name}
      defaultValue={false}
      render={(props) => {
        const handleOnChange = (e: any) => {
          const checked = e?.target?.checked;
          const currentLayers = props.field.value;
          if (checked) {
            const newLayers = [...currentLayers, inputValue];
            props.field.onChange(newLayers);
          } else {
            const newLayers = currentLayers.filter(
              (item: string) => item !== inputValue
            );
            props.field.onChange(newLayers);
          }
        };

        return (
          <>
            <input
              onChange={handleOnChange}
              ref={props.field.ref}
              checked={props.field.value.includes(inputValue)}
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="green-checkbox"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {label}
            </label>
          </>
        );
      }}
    />
  );
};
