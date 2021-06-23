export type Props = {
  expanded: boolean;
  url?: string;
  name: string;
  color?: string;
  large?: boolean;
  hideFullName?: boolean;
};

function useApplicationBadge({
  expanded,
  url,
  name,
  color,
  large,
  hideFullName,
}: Props) {

  const result = {
    expanded,
    url,
    name,
    color,
    large,
    hideFullName,
  }

  return result;
}

export default useApplicationBadge;
