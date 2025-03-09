export interface SearchBoxProps {
  defaultValue?: string;
  onSearch?: (term: string) => void;
}

export interface SearchIconProps {
  className?: string;
}

export interface CreateJobButtonProps {
  onClick?: () => void;
}
