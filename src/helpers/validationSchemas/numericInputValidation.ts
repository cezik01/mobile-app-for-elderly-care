export const validateNumericInput = (text: string) => {
    if (/[^0-9]/.test(text)) {
      return { validText: text.replace(/[^0-9]/g, ''), isValid: false };
    } else {
      return { validText: text, isValid: true };
    }
  };
  