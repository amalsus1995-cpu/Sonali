const SUPABASE_URL = "https://hpcipbpgsmvwmkseqfbk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwY2lwYnBnc212d21rc2VxZmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzOTY0NjIsImV4cCI6MjA4MDk3MjQ2Mn0.1D-pCKgx_shNaYBgxm-MXKFCsfHopvaedZohjPcq0Fg";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

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

/* ----------------------------------------------------
   إضافة إعلان جديد
---------------------------------------------------- */
async function addAd(videoUrl) {
  const { error } = await supabase.from("ads").insert([
    {
      video_url: videoUrl,
      views: 0,
      created_at: new Date(),
    },
  ]);

  if (error) {
    console.error("Error adding ad:", error);
    alert("حدث خطأ أثناء إضافة الإعلان");
  } else {
    alert("تمت إضافة الإعلان بنجاح!");
    loadAds();
  }
}

/* ----------------------------------------------------
   تحميل الإعلانات في لوحة التحكم
---------------------------------------------------- */
async function loadAds() {
  const table = document.getElementById("adsTableBody");
  if (!table) return;

  const { data, error } = await supabase
    .from("ads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    table.innerHTML = "<tr><td colspan='3'>خطأ في تحميل الإعلانات</td></tr>";
    return;
  }

  table.innerHTML = "";

  data.forEach((ad) => {
    table.innerHTML += `
      <tr>
        <td>${ad.id}</td>
        <td>${ad.video_url}</td>
        <td><button onclick="deleteAd('${ad.id}')">حذف</button></td>
      </tr>
    `;
  });
}

/* ----------------------------------------------------
   حذف إعلان
---------------------------------------------------- */
async function deleteAd(id) {
  const { error } = await supabase.from("ads").delete().eq("id", id);

  if (error) {
    alert("فشل حذف الإعلان");
  } else {
    alert("تم حذف الإعلان");
    loadAds();
  }
}
