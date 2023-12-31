import { createSlug } from "@/helpers/string";
import {
  Input as ChakraInput,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
  InputRightElement,
  useBoolean,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { IconType } from "react-icons";
import { RiEyeLine, RiEyeOffLine, RiMailOpenLine, RiShieldUserLine } from "react-icons/ri";

type InputProps = {
  type: "text" | "email" | "password";
  label: string;
  val: string;
  isModified: boolean;
  registerProps: UseFormRegisterReturn;
  error: FieldError | undefined;
  size?: "xs" | "sm" | "md" | "lg";
};

const Input = ({ type, label, val, isModified, registerProps, error, size }: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useBoolean();
  const id = useMemo(() => createSlug(label), [label]);
  const isAPasswordInput = label.toLowerCase().includes("password");

  let RightIcon: IconType;
  switch (type) {
    case "text":
      RightIcon = RiShieldUserLine;
      break;
    case "email":
      RightIcon = RiMailOpenLine;
      break;
    case "password":
      RightIcon = RiEyeLine;
      break;
  }

  const floatedLabelStyles = { "& > label": { transform: "translate(-10%,-95%) scale(0.9)" } };

  return (
    <FormControl
      isInvalid={Boolean(error)}
      position="relative"
      sx={{ ...(val && floatedLabelStyles) }}
      _focusWithin={floatedLabelStyles}
    >
      <FormLabel
        htmlFor={id}
        position="absolute"
        top="2"
        left="4"
        zIndex="2"
        borderRadius="md"
        px="1"
        bgColor="white"
        color="blackAlpha.600"
        lineHeight="normal"
        pointerEvents="none"
        transitionDuration="fast"
      >
        {label}
      </FormLabel>
      <InputGroup>
        <ChakraInput id={id} type={isPasswordVisible ? "text" : type} size={size} py="5" {...registerProps} />
        {RightIcon && (
          <InputRightElement
            h="full"
            {...(isAPasswordInput ? { onClick: setIsPasswordVisible.toggle } : { pointerEvents: "none" })}
          >
            <Icon as={isPasswordVisible ? RiEyeOffLine : RightIcon} color="blackAlpha.400" />
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default Input;
