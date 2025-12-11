// ----------- الاتصال بقاعدة بيانات Supabase -----------
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// ----------- إضافة إعلان جديد إلى جدول ads2 -----------
async function addAd(videoUrl) {
    const { data, error } = await supabaseClient
        .from("ads2")
        .insert([
            { video_url: videoUrl }
        ]);

    if (error) {
        console.error("Error adding ad:", error);
        alert("❌ فشل في إضافة الإعلان");
    } else {
        alert("✔️ تمت إضافة الإعلان بنجاح!");
    }
}


// ----------- جلب جميع الإعلانات من جدول ads2 -----------
async function fetchAds() {
    const { data, error } = await supabaseClient
        .from("ads2")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error loading ads:", error);
        return [];
    }

    return data;
}


// ----------- حساب عدد المشاهدات (اختياري لاحقًا) -----------
async function increaseViews(adId) {
    await supabaseClient
        .from("ads2")
        .update({ views: supabaseClient.increment(1) })
        .eq("id", adId);
}
