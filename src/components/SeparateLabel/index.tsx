interface SeparateLabelBaseProps {
  htmlFor: string;
  label: string;
  className: string;
}

const SeparateLabel = ({ htmlFor, label, className }: SeparateLabelBaseProps) => (
  <label className={className} htmlFor={htmlFor}>
    {label}
  </label>
);

export default SeparateLabel;
