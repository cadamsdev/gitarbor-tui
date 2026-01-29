import { theme } from '../theme';
import { Fieldset } from './Fieldset';

interface InputProps {
  value: string;
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  focused?: boolean;
  width?: number | 'auto' | `${number}%` | '100%';
  textColor?: string;
  backgroundColor?: string;
  focusedTextColor?: string;
  focusedBackgroundColor?: string;
  placeholderColor?: string;
  cursorColor?: string;
  maxLength?: number;
  padding?: number | `${number}%`;
  paddingTop?: number | `${number}%`;
  paddingRight?: number | `${number}%`;
  paddingBottom?: number | `${number}%`;
  paddingLeft?: number | `${number}%`;
  // Fieldset props
  label?: string;
  borderColor?: string;
  titleColor?: string;
  editMode?: boolean;
  flexGrow?: number;
  fieldsetHeight?: number | string;
  fieldsetWidth?: number | string;
  fieldsetPaddingX?: number;
  fieldsetPaddingY?: number;
}

export function Input(props: InputProps) {
  const {
    value,
    onInput,
    onChange,
    onSubmit,
    placeholder,
    focused,
    width,
    textColor = theme.colors.text.primary,
    backgroundColor = theme.colors.background.secondary,
    focusedTextColor = theme.colors.text.primary,
    focusedBackgroundColor = theme.colors.background.highlight,
    placeholderColor = theme.colors.text.muted,
    cursorColor = theme.colors.primary,
    maxLength,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft = theme.spacing.xs,
    // Fieldset props
    label,
    borderColor,
    titleColor,
    editMode,
    flexGrow,
    fieldsetHeight,
    fieldsetWidth,
    fieldsetPaddingX,
    fieldsetPaddingY,
  } = props;

  // Normalize the callback - support both onInput and onChange
  const handleInput = (newValue: string) => {
    if (onInput) {
      onInput(newValue);
    } else if (onChange) {
      onChange(newValue);
    }
  };

  const inputElement = (
    <input
      value={value}
      onInput={handleInput}
      onSubmit={onSubmit}
      placeholder={placeholder}
      focused={focused}
      width={width}
      textColor={textColor}
      backgroundColor={backgroundColor}
      focusedTextColor={focusedTextColor}
      focusedBackgroundColor={focusedBackgroundColor}
      placeholderColor={placeholderColor}
      cursorColor={cursorColor}
      maxLength={maxLength}
      padding={padding}
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
    />
  );

  // If label is provided, wrap in Fieldset
  if (label) {
    return (
      <Fieldset
        title={label}
        focused={focused}
        borderColor={borderColor}
        titleColor={titleColor}
        editMode={editMode}
        flexGrow={flexGrow}
        height={fieldsetHeight}
        width={fieldsetWidth}
        paddingX={fieldsetPaddingX}
        paddingY={fieldsetPaddingY}
      >
        {inputElement}
      </Fieldset>
    );
  }

  // Otherwise, return bare input
  return inputElement;
}
