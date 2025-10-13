import Button from '@/components/ui/Button';
import { useSignOut } from '@/lib/hooks/useSignOut';

export default function Logout() {
  const { mutate, isPending } = useSignOut();

  return (
    <Button onClick={() => mutate()} disabled={isPending}>
      Logout
    </Button>
  );
}
