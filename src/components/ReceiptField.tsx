import { Input } from "./ui/input";

const ReceiptField = ({ onEditItem, cellData, readonly } : any) => {
  return (
    <Input
      className={cellData.className}
      type={cellData.type}
      placeholder={cellData.placeholder}
      min={cellData.min}
      max={cellData.max}
      step={cellData.step}
      name={cellData.name}
      id={cellData.id}
      value={cellData.value}
      onChange={onEditItem}
      required
      readOnly={readonly}
    />
  );
};

export default ReceiptField;