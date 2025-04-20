import { useRef } from "react";

export interface PhoneInputValue {
  countryCode?: string;
  phoneNumber?: string;
}
interface PhoneInputProps extends FormItemProps {
  label?: string;
  required?: boolean;
  value?: PhoneInputValue;
  onChange?: (value: PhoneInputValue) => void;
}

const PhoneInput = ({
  label,
  errormsg,
  value,
  onChange,
  ...props
}: PhoneInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { countryCode, phoneNumber } = value || {};

  const handleCountryCodeChange = (val: string) => {
    onChange?.({ ...value, countryCode: val });
  };

  const handlePhoneNumberChange = (val: string) => {
    onChange?.({ ...value, phoneNumber: val });
  };

  return (
    <InputLayout label={label} errormsg={errormsg} required={props.required}>
      <div className="flex gap-2 w-full justify-between">
        <div className="flex flex-col items-stretch justify-center relative">
          <select
            className={mergeClasses(
              InputBaseClassname,
              "w-16 pl-3 text-base",
              "appearance-none"
            )}
            value={countryCode}
            onChange={(e) => handleCountryCodeChange(e.target.value)}
          >
            {countryCodes &&
              countryCodes.map(({ value, code }) => (
                <option key={value} value={value}>
                  {code}
                </option>
              ))}
          </select>
          <div className="absolute right-2">
            <ChevronDown className="size-3" />
          </div>
        </div>

        <InputBase
          className={mergeClasses(errormsg && "!outline-red-500", "w-full")}
          ref={inputRef}
          {...props}
          value={phoneNumber}
          type="tel"
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
        />
      </div>
    </InputLayout>
  );
};

export default PhoneInput;
