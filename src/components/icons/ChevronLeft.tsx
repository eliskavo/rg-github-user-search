export default function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.5 16C11.308 16 11.116 15.927 10.97 15.78L4.71999 9.52999C4.42699 9.23699 4.42699 8.76199 4.71999 8.46899L10.97 2.21999C11.263 1.92699 11.738 1.92699 12.031 2.21999C12.324 2.51299 12.324 2.98799 12.031 3.28099L6.31099 9.00099L12.031 14.721C12.324 15.014 12.324 15.489 12.031 15.782C11.885 15.928 11.693 16.002 11.501 16.002L11.5 16Z"
        fill="currentColor"
      />
    </svg>
  );
}
