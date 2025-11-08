import { supabase } from "@/lib/supabaseClient";

export default function Page() {
  const changes = supabase
  .channel(`topic:messages`, {
    config: { private: true },
  })
  .on('broadcast', { event: 'INSERT' }, (payload) => console.log(payload))
  .subscribe();

  return <div>Test Page</div>;
}