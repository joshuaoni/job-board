export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ArrowContainerProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
