import { DesignShell } from '@/components/designs/DesignShell';
import CurrentHome from '@/components/designs/current-home';

export default function Page() {
  return <DesignShell current={<CurrentHome />} />;
}
