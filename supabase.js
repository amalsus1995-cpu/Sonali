const SUPABASE_URL = "https://hpcipbpgsmvwmkseqfbk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwY2lwYnBnc212d21rc2VxZmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzOTY0NjIsImV4cCI6MjA4MDk3MjQ2Mn0.1D-pCKgx_shNaYBgxm-MXKFCsfHopvaedZohjPcq0Fg";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const supabase = supabaseClient;

// حماية الصفحات
(async () => {
  const authPages = ["login.html", "register.html"];
  const path = window.location.pathname;
  const isAuth = authPages.some((p) => path.endsWith(p));

  const { data } = await supabase.auth.getSession();
  if (!data.session && !isAuth) {
    window.location.href = "login.html";
    return;
  }
})();
