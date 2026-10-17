const STORAGE_KEY = "yuliang-ledger-v1";
const DAY_NAMES = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

const EXPENSE_CATEGORIES = [
  { id: "food", name: "餐饮", icon: "utensils", color: "#d77b48" },
  { id: "grocery", name: "日用", icon: "shopping-basket", color: "#5b9a6d" },
  { id: "transport", name: "交通", icon: "car", color: "#4e86a8" },
  { id: "shopping", name: "购物", icon: "shopping-bag", color: "#a86487" },
  { id: "fun", name: "娱乐", icon: "gamepad-2", color: "#7c70b7" },
  { id: "home", name: "居住", icon: "house", color: "#b48a39" },
  { id: "health", name: "健康", icon: "heart-pulse", color: "#c95c67" },
  { id: "other", name: "其他", icon: "package", color: "#7d8881" },
];

const INCOME_CATEGORIES = [
  { id: "salary", name: "工资", icon: "building-2", color: "#2e8160" },
  { id: "freelance", name: "副业", icon: "laptop", color: "#4e86a8" },
  { id: "gift", name: "礼金", icon: "gift", color: "#a86487" },
  { id: "other-income", name: "其他", icon: "circle-plus", color: "#7d8881" },
];

const DEFAULT_BUDGETS = {
  total: 9000,
  categories: {
    food: 1700,
    grocery: 1200,
    transport: 600,
    shopping: 1500,
    fun: 700,
    home: 2200,
    health: 700,
    other: 400,
  },
};

const ICONS = {
  "layout-dashboard": '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  "receipt-text": '<path d="M5 2h14v20l-3-2-4 2-4-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
  "wallet-cards": '<rect x="3" y="7" width="15" height="12" rx="2"/><path d="M7 4h12a2 2 0 0 1 2 2v8"/><path d="M3 11h15"/><path d="M16 15h2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  "chevron-right": '<path d="m9 18 6-6-6-6"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  sparkles: '<path d="m12 3-1.2 3.2L8 7.5l2.8 1.3L12 12l1.2-3.2L16 7.5l-2.8-1.3z"/><path d="m5 14-.7 1.8L2.5 16.5l1.8.8L5 19l.7-1.7 1.8-.8-1.8-.7z"/><path d="m19 13-.7 1.7-1.8.8 1.8.7L19 18l.7-1.8 1.8-.7-1.8-.8z"/>',
  utensils: '<path d="M3 2v7c0 1.7 1.3 3 3 3s3-1.3 3-3V2"/><path d="M6 2v20"/><path d="M17 2v20"/><path d="M17 12h1.5a2.5 2.5 0 0 0 0-5H17"/>',
  "shopping-basket": '<path d="m3 9 1.5 10h15L21 9z"/><path d="m8 9 2-6M16 9l-2-6"/><path d="M9 13h6"/>',
  car: '<path d="M5 17h14l-1.5-6.5a2 2 0 0 0-2-1.5h-7a2 2 0 0 0-2 1.5z"/><path d="M3 17v3h3v-2M21 17v3h-3v-2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/><path d="M5 11h14"/>',
  "shopping-bag": '<path d="M6 8h12l1 13H5z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>',
  "gamepad-2": '<path d="M6 8h12a4 4 0 0 1 4 4v4a3 3 0 0 1-5.2 2L15 16H9l-1.8 2A3 3 0 0 1 2 16v-4a4 4 0 0 1 4-4z"/><path d="M7 11v4M5 13h4"/><path d="M16 12h.01M18 14h.01"/>',
  house: '<path d="m3 10 9-7 9 7"/><path d="M5 9v12h14V9"/><path d="M9 21v-7h6v7"/>',
  "heart-pulse": '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z"/><path d="M3.5 12H8l1.5-3 3 6 1.5-3h5.5"/>',
  package: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 8 9 5 9-5v9l-9 5-9-5z"/><path d="M12 13v9"/>',
  "building-2": '<path d="M3 21h18"/><path d="M5 21V5l7-3v19"/><path d="M12 8h7v13"/><path d="M8 7h.01M8 11h.01M8 15h.01M16 12h.01M16 16h.01"/>',
  laptop: '<rect x="4" y="4" width="16" height="12" rx="2"/><path d="M2 20h20"/>',
  gift: '<rect x="3" y="8" width="18" height="13" rx="1"/><path d="M12 8v13M3 12h18"/><path d="M7.5 8C4 8 4 3 7 3c2.5 0 5 5 5 5M16.5 8C20 8 20 3 17 3c-2.5 0-5 5-5 5"/>',
  "circle-plus": '<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>',
  "circle-help": '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.7 2.7 0 1 1 4.1 2.4c-.9.5-1.6 1-1.6 2.1"/><path d="M12 17h.01"/>',
  "arrow-up-right": '<path d="M7 17 17 7M7 7h10v10"/>',
  "arrow-down-left": '<path d="M17 7 7 17M17 17H7V7"/>',
  "alert-triangle": '<path d="m12 3 10 18H2z"/><path d="M12 9v5M12 18h.01"/>',
  "bell-ring": '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/><path d="M2 5 4 3M22 5l-2-2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  pencil: '<path d="m15 5 4 4"/><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/>',
  "trash-2": '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',
  "rotate-ccw": '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  "credit-card": '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  "chart-no-axes-combined": '<path d="M3 3v18h18"/><path d="M7 16v-4M12 16V8M17 16V5"/>',
  "sliders-horizontal": '<path d="M3 7h7M14 7h7M3 17h3M10 17h11"/><circle cx="12" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  "wallet": '<path d="M4 6h15a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13"/><path d="M16 12h5v4h-5a2 2 0 0 1 0-4z"/>',
  "calendar-days": '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
  "circle-check": '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
  "trending-down": '<path d="m3 7 6 6 4-4 8 8"/><path d="M21 11v6h-6"/>',
  "trending-up": '<path d="m3 17 6-6 4 4 8-8"/><path d="M21 7v6h-6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
};

let appState = loadState();
let modalDraft = null;
let overlayReturnFocus = null;

function icon(name, size = 18) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS["circle-help"]}</svg>`;
}

function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]:not([data-icon-ready])").forEach((el) => {
    el.innerHTML = icon(el.dataset.icon, Number(el.dataset.iconSize) || 18);
    el.dataset.iconReady = "true";
  });
}

function localISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function monthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getDateForCurrentMonth(day) {
  const now = new Date();
  const safeDay = Math.min(Math.max(day, 1), now.getDate());
  return localISODate(new Date(now.getFullYear(), now.getMonth(), safeDay, 12));
}

function createSeedState() {
  const now = new Date();
  const stamp = now.getTime();
  const seeds = [
    [1, "expense", 2800, "home", "房租", "月度房租", "日常账户"],
    [1, "income", 15800, "salary", "工资到账", "十月工资", "日常账户"],
    [2, "expense", 320, "home", "水电网费", "生活缴费", "日常账户"],
    [2, "expense", 96, "fun", "电影票", "周末场", "信用卡"],
    [3, "expense", 399, "shopping", "优衣库", "换季衣物", "信用卡"],
    [3, "expense", 238.6, "grocery", "超市采购", "一周食材", "日常账户"],
    [4, "expense", 280, "home", "洗衣机维修", "上门维修", "日常账户"],
    [4, "expense", 46, "transport", "打车", "晚间回家", "日常账户"],
    [5, "expense", 299, "health", "健身月卡", "月度会员", "信用卡"],
    [5, "expense", 100, "transport", "地铁充值", "交通卡", "日常账户"],
    [6, "expense", 599, "health", "配眼镜", "新镜片", "信用卡"],
    [6, "expense", 68, "food", "外卖", "加班晚餐", "日常账户"],
    [7, "expense", 189, "grocery", "猫粮", "两个月用量", "日常账户"],
    [7, "expense", 45.8, "health", "药店", "常备药", "日常账户"],
    [8, "expense", 68, "other", "理发", "日常修剪", "现金"],
    [8, "expense", 218, "food", "晚餐", "朋友小聚", "日常账户"],
    [9, "expense", 269, "shopping", "储物边柜", "客厅收纳", "信用卡"],
    [9, "expense", 52.9, "grocery", "水果", "时令水果", "日常账户"],
    [10, "expense", 628, "shopping", "京东家居", "桌面收纳与灯具", "信用卡"],
    [10, "expense", 129, "shopping", "日用品", "洗护补充", "日常账户"],
    [11, "expense", 119, "food", "咖啡豆", "口粮豆一袋", "信用卡"],
    [12, "income", 2200, "freelance", "项目尾款", "品牌插画项目", "日常账户"],
    [12, "expense", 36, "food", "午餐", "工作日简餐", "日常账户"],
    [13, "expense", 53.5, "grocery", "零食", "办公室补给", "日常账户"],
    [14, "expense", 326, "food", "朋友聚餐", "四人晚餐", "信用卡"],
    [15, "expense", 76, "shopping", "Kindle 电子书", "两本新书", "信用卡"],
    [15, "expense", 24, "transport", "停车费", "商场停车", "日常账户"],
    [16, "expense", 186.5, "grocery", "盒马鲜生", "蔬果和牛奶", "日常账户"],
    [16, "expense", 28, "food", "咖啡", "下午一杯", "日常账户"],
    [17, "expense", 18, "food", "早餐", "豆浆和饭团", "日常账户"],
    [17, "expense", 6, "transport", "地铁", "早高峰通勤", "交通卡"],
    [17, "expense", 42, "food", "午餐", "工作日简餐", "日常账户"],
  ];

  return {
    version: 1,
    budgets: structuredClone(DEFAULT_BUDGETS),
    alertThreshold: 80,
    transactions: seeds.map(([day, type, amount, category, note, detail, account], index) => ({
      id: `seed-${stamp}-${index}`,
      type,
      amount,
      category,
      note,
      detail,
      account,
      date: getDateForCurrentMonth(day),
      createdAt: stamp - index,
    })),
  };
}

function normaliseState(raw) {
  if (!raw || !Array.isArray(raw.transactions)) return createSeedState();
  const budgetCategories = { ...DEFAULT_BUDGETS.categories };
  Object.entries(raw.budgets?.categories || {}).forEach(([key, value]) => {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0) budgetCategories[key] = parsed;
  });
  return {
    version: 1,
    transactions: raw.transactions
      .filter((tx) => tx && tx.id && ["expense", "income"].includes(tx.type) && Number(tx.amount) > 0 && tx.date)
      .map((tx) => ({
        ...tx,
        amount: Number(tx.amount),
        category: String(tx.category || "other"),
        note: String(tx.note || "未命名记录"),
        detail: String(tx.detail || ""),
        account: String(tx.account || "日常账户"),
        createdAt: Number(tx.createdAt) || 0,
      })),
    budgets: {
      total: Math.max(0, Number(raw.budgets?.total) || DEFAULT_BUDGETS.total),
      categories: budgetCategories,
    },
    alertThreshold: Math.min(95, Math.max(50, Number(raw.alertThreshold) || 80)),
  };
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? normaliseState(JSON.parse(stored)) : createSeedState();
  } catch {
    return createSeedState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch {
    showToast("保存失败", "浏览器没有提供可用的本地存储空间。", "danger");
  }
}

function formatMoney(value, decimals = 0) {
  const number = Number(value) || 0;
  return new Intl.NumberFormat("zh-CN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
}

function money(value, decimals = 0) {
  return `¥${formatMoney(value, decimals)}`;
}

function smartMoney(value) {
  const rounded = Math.round(Number(value) * 100) / 100;
  return money(rounded, Number.isInteger(rounded) ? 0 : 2);
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, value));
}

function categoryById(id, type = "expense") {
  const list = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return list.find((category) => category.id === id) || list[list.length - 1];
}

function getMonthTransactions(reference = new Date()) {
  const key = monthKey(reference);
  return appState.transactions.filter((tx) => tx.date.startsWith(key));
}

function getMonthStats(reference = new Date()) {
  const transactions = getMonthTransactions(reference);
  const expenses = transactions.filter((tx) => tx.type === "expense");
  const income = transactions.filter((tx) => tx.type === "income");
  const expenseTotal = expenses.reduce((sum, tx) => sum + tx.amount, 0);
  const incomeTotal = income.reduce((sum, tx) => sum + tx.amount, 0);
  const categoryTotals = Object.fromEntries(EXPENSE_CATEGORIES.map((category) => [category.id, 0]));
  expenses.forEach((tx) => {
    categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
  });
  const budget = appState.budgets.total;
  const ratio = budget > 0 ? (expenseTotal / budget) * 100 : 0;
  const remaining = budget - expenseTotal;
  const daysInMonth = new Date(reference.getFullYear(), reference.getMonth() + 1, 0).getDate();
  const dayOfMonth = Math.max(1, reference.getDate());
  const projected = (expenseTotal / dayOfMonth) * daysInMonth;
  return {
    transactions,
    expenses,
    income,
    expenseTotal,
    incomeTotal,
    balance: incomeTotal - expenseTotal,
    categoryTotals,
    budget,
    ratio,
    remaining,
    daysInMonth,
    dayOfMonth,
    daysLeft: Math.max(1, daysInMonth - dayOfMonth + 1),
    projected,
  };
}

function getAlerts() {
  const stats = getMonthStats();
  const threshold = appState.alertThreshold;
  const alerts = [];

  if (stats.ratio >= 100) {
    alerts.push({
      severity: "danger",
      icon: "alert-triangle",
      title: "本月预算已经用完",
      message: `已超出 ${money(Math.abs(stats.remaining))}，接下来可以先记录非必要支出。`,
      action: "调整预算",
    });
  } else if (stats.ratio >= threshold) {
    alerts.push({
      severity: "warning",
      icon: "bell-ring",
      title: `本月预算已用 ${Math.round(stats.ratio)}%`,
      message: `还可支配 ${money(stats.remaining)}，距离提醒线已超出 ${Math.round(stats.ratio - threshold)} 个百分点。`,
      action: "查看预算",
    });
  }

  if (stats.projected > stats.budget && stats.expenseTotal > 0 && stats.ratio < 100) {
    alerts.push({
      severity: "info",
      icon: "trending-up",
      title: "当前消费节奏偏快",
      message: `按本月节奏，预计最终支出约 ${money(stats.projected)}，比预算多 ${money(stats.projected - stats.budget)}。`,
      action: "查看明细",
    });
  }

  EXPENSE_CATEGORIES.forEach((category) => {
    const spent = stats.categoryTotals[category.id] || 0;
    const budget = appState.budgets.categories[category.id] || 0;
    if (budget <= 0) return;
    const ratio = (spent / budget) * 100;
    if (ratio >= 100) {
      alerts.push({
        severity: "danger",
        icon: category.icon,
        title: `${category.name}预算已超支`,
        message: `已用 ${money(spent)}，超出预算 ${money(spent - budget)}。`,
        action: "调整预算",
        category: category.id,
      });
    } else if (ratio >= threshold) {
      alerts.push({
        severity: "warning",
        icon: category.icon,
        title: `${category.name}预算接近上限`,
        message: `已用 ${Math.round(ratio)}%，剩余 ${money(budget - spent)}。`,
        action: "查看预算",
        category: category.id,
      });
    }
  });

  return alerts;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6) return "夜深了";
  if (hour < 11) return "早上好";
  if (hour < 14) return "中午好";
  if (hour < 18) return "下午好";
  return "晚上好";
}

function formatLongDate(date = new Date()) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 · ${DAY_NAMES[date.getDay()]}`;
}

function formatShortDate(date) {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function relativeDateLabel(date) {
  const today = new Date();
  const tx = parseLocalDate(localISODate(date));
  const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diff = Math.round((todayDay - tx) / 86400000);
  if (diff === 0) return "今天";
  if (diff === 1) return "昨天";
  return DAY_NAMES[tx.getDay()];
}

function sortTransactions(a, b) {
  return b.date.localeCompare(a.date) || (b.createdAt || 0) - (a.createdAt || 0);
}

function categoryIcon(category, size = 17) {
  return `<span class="category-icon" style="--category-color:${category.color}">${icon(category.icon, size)}</span>`;
}

function transactionRow(tx, options = {}) {
  const category = categoryById(tx.category, tx.type);
  const title = escapeHTML(tx.note || category.name);
  const detail = tx.detail ? escapeHTML(tx.detail) : "无备注";
  const signed = tx.type === "income" ? "+" : "−";
  return `
    <div class="transaction-row" data-edit-tx="${escapeHTML(tx.id)}" role="button" tabindex="0" aria-label="编辑 ${title}">
      ${categoryIcon(category)}
      <div class="transaction-copy">
        <div class="transaction-name">${title}</div>
        <div class="transaction-meta">
          <span>${category.name}</span>
          <span>${escapeHTML(tx.account || "日常账户")}</span>
        </div>
      </div>
      <div class="transaction-amount ${tx.type === "income" ? "income" : ""}">
        ${signed}${smartMoney(tx.amount)}
        <span class="transaction-account">${escapeHTML(detail)}</span>
      </div>
      ${options.actions ? `<button class="row-action" type="button" data-edit-tx="${escapeHTML(tx.id)}" aria-label="编辑记录">${icon("pencil", 14)}</button>` : ""}
    </div>
  `;
}

function budgetSeverity(ratio) {
  if (ratio >= 100) return "danger";
  if (ratio >= appState.alertThreshold) return "warn";
  return "";
}

function renderDashboard() {
  const stats = getMonthStats();
  const todayExpense = appState.transactions
    .filter((tx) => tx.type === "expense" && tx.date === localISODate(new Date()))
    .reduce((sum, tx) => sum + tx.amount, 0);
  const recent = [...appState.transactions].sort(sortTransactions).slice(0, 5);
  const topCategories = EXPENSE_CATEGORIES
    .map((category) => ({
      ...category,
      spent: stats.categoryTotals[category.id] || 0,
      budget: appState.budgets.categories[category.id] || 0,
    }))
    .filter((category) => category.spent > 0)
    .sort((a, b) => b.spent - a.spent);
  const alert = stats.ratio >= appState.alertThreshold
    ? {
        severity: stats.ratio >= 100 ? "danger" : "warning",
        title: stats.ratio >= 100 ? "本月预算已超出" : `本月预算已用 ${Math.round(stats.ratio)}%`,
        message: stats.ratio >= 100
          ? `累计超出 ${money(Math.abs(stats.remaining))}，建议调整后续支出计划。`
          : `还可支配 ${money(stats.remaining)}，按当前节奏预计本月支出 ${money(stats.projected)}。`,
        action: "调整预算",
      }
    : null;
  const ratioPercent = Math.round(stats.ratio);
  const ringClass = budgetSeverity(stats.ratio);
  const ringDegrees = Math.min(360, (ratioPercent / 100) * 360);
  const incomeRatio = stats.incomeTotal > 0 ? (stats.balance / stats.incomeTotal) * 100 : 0;

  return `
    <section class="page-enter">
      <div class="greeting-row">
        <div>
          <h2>${getGreeting()}，来看看本月余量。</h2>
          <p>${stats.remaining >= 0 ? `预算内还有 ${money(stats.remaining)} 可以安排。` : `本月已经超出预算 ${money(Math.abs(stats.remaining))}。`}</p>
        </div>
        <div class="today-spend">今日已花 <strong>${money(todayExpense)}</strong></div>
      </div>

      ${alert ? `
        <div class="alert-banner ${alert.severity === "danger" ? "danger" : ""}">
          <div class="alert-icon">${icon("bell-ring", 18)}</div>
          <div class="alert-copy">
            <strong>${alert.title}</strong>
            <p>${alert.message}</p>
          </div>
          <button class="alert-action" type="button" data-page="budgets">${alert.action} ${icon("chevron-right", 13)}</button>
        </div>
      ` : ""}

      <div class="summary-grid">
        <article class="summary-card primary">
          <div class="summary-card-head">
            <span class="summary-label">本月结余</span>
            <span class="summary-icon">${icon("wallet", 16)}</span>
          </div>
          <div class="summary-value"><span class="currency">¥</span>${formatMoney(stats.balance)}</div>
          <div class="summary-meta">
            <span class="${stats.balance >= 0 ? "trend-positive" : "trend-negative"}">${stats.balance >= 0 ? "收支为正" : "支出高于收入"}</span>
            <span>结余率 ${Math.max(0, Math.round(incomeRatio))}%</span>
          </div>
        </article>

        <article class="summary-card">
          <div class="summary-card-head">
            <span class="summary-label">本月支出</span>
            <span class="summary-icon">${icon("trending-down", 16)}</span>
          </div>
          <div class="summary-value"><span class="currency">¥</span>${formatMoney(stats.expenseTotal)}</div>
          <div class="summary-meta">
            <span>预算已用 ${Math.round(stats.ratio)}%</span>
            <span class="mini-meter"><span style="width:${clampPercent(stats.ratio)}%"></span></span>
          </div>
        </article>

        <article class="summary-card">
          <div class="summary-card-head">
            <span class="summary-label">本月收入</span>
            <span class="summary-icon">${icon("trending-up", 16)}</span>
          </div>
          <div class="summary-value"><span class="currency">¥</span>${formatMoney(stats.incomeTotal)}</div>
          <div class="summary-meta">
            <span>${stats.income.length} 笔收入</span>
            <span>已覆盖支出的 ${stats.incomeTotal ? Math.round((stats.expenseTotal / stats.incomeTotal) * 100) : 0}%</span>
          </div>
        </article>
      </div>

      <div class="dashboard-grid">
        <section class="panel trend-panel">
          <div class="panel-head">
            <div>
              <h3 class="panel-title">支出趋势</h3>
              <p class="panel-subtitle">${appState.trendDays || 14} 天共支出 ${money(getTrendValues(appState.trendDays || 14).reduce((sum, item) => sum + item.total, 0))}</p>
            </div>
            <div class="segmented" aria-label="趋势时间范围">
              ${[7, 14, 30].map((days) => `<button type="button" class="${(appState.trendDays || 14) === days ? "active" : ""}" data-chart-days="${days}">${days}天</button>`).join("")}
            </div>
          </div>
          <div class="chart-wrap">${renderTrendChart(appState.trendDays || 14)}</div>
        </section>

        <section class="panel budget-panel">
          <div class="panel-head">
            <div>
              <h3 class="panel-title">预算进度</h3>
              <p class="panel-subtitle">本月总预算 ${money(stats.budget)}</p>
            </div>
            <button class="panel-link" type="button" data-page="budgets">管理 ${icon("chevron-right", 13)}</button>
          </div>
          <div class="budget-overview">
            <div class="budget-ring ${ringClass}" style="--progress:${ringDegrees}deg">
              <div class="budget-ring-copy">
                <strong>${ratioPercent}%</strong>
                <span>已使用</span>
              </div>
            </div>
            <div class="budget-copy">
              <h3>${stats.remaining >= 0 ? "本月还能花" : "已经超出"}</h3>
              <div class="big-number">${money(Math.abs(stats.remaining))}</div>
              <p>日均可用 ${money(stats.remaining > 0 ? stats.remaining / stats.daysLeft : 0)}，剩余 ${stats.daysLeft} 天</p>
            </div>
          </div>
          <div class="category-mini-list">
            ${topCategories.slice(0, 4).map((category) => {
              const ratio = category.budget > 0 ? (category.spent / category.budget) * 100 : 0;
              const severity = budgetSeverity(ratio);
              return `
                <div class="category-mini-row" style="--category-color:${category.color}">
                  <div class="category-mini-name"><span class="category-dot"></span>${category.name}</div>
                  <div class="category-mini-value">${money(category.spent)} / ${money(category.budget)}</div>
                  <div class="progress-track"><div class="progress-fill ${severity}" style="--width:${clampPercent(ratio)}%"></div></div>
                </div>
              `;
            }).join("")}
          </div>
        </section>

        <section class="panel recent-panel">
          <div class="panel-head">
            <div>
              <h3 class="panel-title">最近账单</h3>
              <p class="panel-subtitle">本月共 ${stats.transactions.length} 笔记录</p>
            </div>
            <button class="panel-link" type="button" data-page="transactions">全部账单 ${icon("arrow-up-right", 13)}</button>
          </div>
          <div class="transaction-list">
            ${recent.length ? recent.map((tx) => transactionRow(tx)).join("") : renderEmptyState("还没有账单", "记下第一笔，余量会从这里开始。")}
          </div>
        </section>

        <section class="panel distribution-panel">
          <div class="panel-head">
            <div>
              <h3 class="panel-title">支出分布</h3>
              <p class="panel-subtitle">按分类查看本月花销</p>
            </div>
          </div>
          <div class="distribution-list">
            ${topCategories.length ? topCategories.slice(0, 5).map((category) => {
              const percent = stats.expenseTotal > 0 ? (category.spent / stats.expenseTotal) * 100 : 0;
              return `
                <div class="distribution-row" style="--category-color:${category.color}">
                  <div class="distribution-icon">${icon(category.icon, 14)}</div>
                  <div class="distribution-copy">
                    <div class="distribution-name"><span>${category.name}</span><span>${Math.round(percent)}%</span></div>
                    <div class="distribution-bar"><span style="width:${clampPercent(percent)}%"></span></div>
                  </div>
                  <div class="distribution-amount">${money(category.spent)}</div>
                </div>
              `;
            }).join("") : renderEmptyState("暂无支出", "添加账单后会生成分类分布。")}
          </div>
        </section>
      </div>
    </section>
  `;
}

function getTrendValues(days) {
  const values = [];
  const now = new Date();
  for (let index = days - 1; index >= 0; index -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - index, 12);
    const iso = localISODate(date);
    const total = appState.transactions
      .filter((tx) => tx.type === "expense" && tx.date === iso)
      .reduce((sum, tx) => sum + tx.amount, 0);
    values.push({ date, total });
  }
  return values;
}

function renderTrendChart(days) {
  const data = getTrendValues(days);
  const width = 720;
  const height = 222;
  const left = 38;
  const right = 16;
  const top = 20;
  const bottom = 34;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const maxValue = Math.max(100, ...data.map((item) => item.total));
  const niceMax = Math.ceil(maxValue / 100) * 100;
  const xFor = (index) => left + (data.length === 1 ? chartWidth / 2 : (index / (data.length - 1)) * chartWidth);
  const yFor = (value) => top + chartHeight - (value / niceMax) * chartHeight;
  const points = data.map((item, index) => ({ x: xFor(index), y: yFor(item.total), ...item }));
  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${top + chartHeight} L ${points[0].x} ${top + chartHeight} Z`;
  const gridCount = 4;
  const labelStep = days === 30 ? 6 : days === 14 ? 3 : 1;

  return `
    <svg class="trend-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="最近 ${days} 天支出趋势">
      <defs>
        <linearGradient id="trendAreaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2f7f60" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#2f7f60" stop-opacity="0.015"/>
        </linearGradient>
      </defs>
      ${Array.from({ length: gridCount + 1 }, (_, index) => {
        const ratio = index / gridCount;
        const y = top + ratio * chartHeight;
        const value = niceMax * (1 - ratio);
        return `
          <line class="chart-grid-line" x1="${left}" y1="${y}" x2="${width - right}" y2="${y}"/>
          <text class="chart-label" x="${left - 9}" y="${y + 3}" text-anchor="end">${value >= 1000 ? `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k` : Math.round(value)}</text>
        `;
      }).join("")}
      <path d="${areaPath}" fill="url(#trendAreaGradient)"/>
      <path d="${linePath}" fill="none" stroke="#287456" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      ${points.map((point, index) => {
        const showLabel = index === 0 || index === points.length - 1 || index % labelStep === 0;
        const tooltipX = Math.min(width - 100, Math.max(4, point.x - 44));
        const tooltipY = Math.max(4, point.y - 42);
        return `
          <g class="chart-hover">
            <rect x="${point.x - Math.max(5, chartWidth / (data.length * 2))}" y="${top}" width="${Math.max(10, chartWidth / data.length)}" height="${chartHeight}" fill="transparent"/>
            ${point.total > 0 ? `<circle class="chart-dot" cx="${point.x}" cy="${point.y}" r="3.5"/>` : ""}
            ${showLabel ? `<text class="chart-label" x="${point.x}" y="${height - 10}" text-anchor="middle">${point.date.getMonth() + 1}/${point.date.getDate()}</text>` : ""}
            <g class="chart-tooltip" transform="translate(${tooltipX} ${tooltipY})">
              <rect width="88" height="29" rx="5"/>
              <text x="44" y="18" text-anchor="middle">${point.date.getMonth() + 1}月${point.date.getDate()}日 · ${money(point.total)}</text>
            </g>
          </g>
        `;
      }).join("")}
    </svg>
  `;
}

function smoothPath(points) {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const control = (next.x - current.x) * 0.42;
    path += ` C ${current.x + control} ${current.y}, ${next.x - control} ${next.y}, ${next.x} ${next.y}`;
  }
  return path;
}

function renderTransactionsPage() {
  const all = getFilteredTransactions();
  const expenseTotal = all.filter((tx) => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0);
  const incomeTotal = all.filter((tx) => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0);

  return `
    <section class="page-enter">
      <div class="page-intro">
        <div>
          <h2>每一笔，都有迹可循。</h2>
          <p>搜索、筛选或编辑你的账单记录。</p>
        </div>
        <button class="primary-button" type="button" data-open-add>${icon("plus", 16)}<span>记一笔</span></button>
      </div>

      <div class="transactions-toolbar">
        <div class="filter-row" aria-label="账单类型筛选">
          ${[
            ["all", "全部"],
            ["expense", "支出"],
            ["income", "收入"],
          ].map(([value, label]) => `<button type="button" class="filter-chip ${(appState.filter || "all") === value ? "active" : ""}" data-filter-type="${value}">${label}</button>`).join("")}
        </div>
        <label class="search-field">
          ${icon("search", 16)}
          <input id="ledgerSearch" type="search" placeholder="搜索备注、分类或账户" value="${escapeHTML(appState.search || "")}" autocomplete="off">
        </label>
      </div>

      <div class="transaction-summary-bar">
        <div class="transaction-summary-group">
          <div class="transaction-summary-item">共 ${all.length} 笔<strong>${appState.filter === "income" ? "收入记录" : appState.filter === "expense" ? "支出记录" : "本月记录"}</strong></div>
          <div class="transaction-summary-item">支出<strong class="expense">${money(expenseTotal)}</strong></div>
          <div class="transaction-summary-item">收入<strong class="income">${money(incomeTotal)}</strong></div>
        </div>
        <div class="transaction-summary-item">净额<strong>${all.length ? money(incomeTotal - expenseTotal) : money(0)}</strong></div>
      </div>

      <div id="ledgerPanel">${renderTransactionLedger()}</div>
    </section>
  `;
}

function getFilteredTransactions() {
  const type = appState.filter || "all";
  const query = (appState.search || "").trim().toLowerCase();
  return appState.transactions
    .filter((tx) => type === "all" || tx.type === type)
    .filter((tx) => {
      if (!query) return true;
      const category = categoryById(tx.category, tx.type);
      return [tx.note, tx.detail, tx.account, category.name]
        .join(" ")
        .toLowerCase()
        .includes(query);
    })
    .sort(sortTransactions);
}

function renderTransactionLedger() {
  const filtered = getFilteredTransactions();
  if (!filtered.length) {
    return `
      <section class="panel ledger-panel">
        ${renderEmptyState("没有找到账单", appState.search ? "换个关键词试试，或清除当前筛选。" : "记下第一笔，账本就会有内容。")}
      </section>
    `;
  }
  const groups = new Map();
  filtered.forEach((tx) => {
    if (!groups.has(tx.date)) groups.set(tx.date, []);
    groups.get(tx.date).push(tx);
  });

  return `
    <section class="panel ledger-panel">
      <div class="ledger-toolbar">
        <h3>账单明细</h3>
        <button class="ghost-button" type="button" data-open-add>${icon("plus", 14)}添加记录</button>
      </div>
      ${[...groups.entries()].map(([date, transactions]) => {
        const dayExpense = transactions.filter((tx) => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0);
        const dayIncome = transactions.filter((tx) => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0);
        const parsed = parseLocalDate(date);
        return `
          <div class="date-group">
            <div class="date-group-head">
              <div><strong>${formatShortDate(parsed)} · ${relativeDateLabel(parsed)}</strong>${transactions.length} 笔</div>
              <div class="date-group-total">${dayExpense ? `支出 ${money(dayExpense)}` : ""}${dayExpense && dayIncome ? " · " : ""}${dayIncome ? `收入 ${money(dayIncome)}` : ""}</div>
            </div>
            ${transactions.map((tx) => transactionRow(tx, { actions: true })).join("")}
          </div>
        `;
      }).join("")}
    </section>
  `;
}

function renderBudgetsPage() {
  const stats = getMonthStats();
  const alerts = getAlerts();
  const availablePerDay = stats.remaining > 0 ? stats.remaining / stats.daysLeft : 0;

  return `
    <section class="page-enter">
      <div class="page-intro">
        <div>
          <h2>预算与提醒</h2>
          <p>给每一类花销留出余量，花钱时更有分寸。</p>
        </div>
        <button class="secondary-button" type="button" data-reset-demo>${icon("rotate-ccw", 15)}<span>恢复演示</span></button>
      </div>

      <div class="overview-strip">
        <div class="overview-stat">
          <div class="overview-stat-label">${icon("target", 14)} 本月总预算</div>
          <div class="overview-stat-value">${money(stats.budget)}</div>
          <div class="overview-stat-note">已使用 ${Math.round(stats.ratio)}%</div>
        </div>
        <div class="overview-stat">
          <div class="overview-stat-label">${icon("trending-down", 14)} 已支出</div>
          <div class="overview-stat-value" style="color:${stats.expenseTotal > stats.budget ? "var(--coral)" : "var(--ink)"}">${money(stats.expenseTotal)}</div>
          <div class="overview-stat-note">${stats.expenses.length} 笔支出</div>
        </div>
        <div class="overview-stat">
          <div class="overview-stat-label">${icon("wallet", 14)} 还可支配</div>
          <div class="overview-stat-value" style="color:${stats.remaining < 0 ? "var(--coral)" : "var(--green)"}">${money(stats.remaining)}</div>
          <div class="overview-stat-note">${stats.remaining < 0 ? "已超出总预算" : `剩余 ${stats.daysLeft} 天`}</div>
        </div>
        <div class="overview-stat">
          <div class="overview-stat-label">${icon("calendar-days", 14)} 日均可用</div>
          <div class="overview-stat-value">${money(availablePerDay)}</div>
          <div class="overview-stat-note">按剩余天数计算</div>
        </div>
      </div>

      <div class="budget-layout">
        <section class="panel budget-editor">
          <div class="panel-head">
            <div>
              <h3 class="panel-title">分类预算</h3>
              <p class="panel-subtitle">修改金额后会自动保存</p>
            </div>
          </div>
          <div class="budget-total-row">
            <div>
              <label for="totalBudgetInput">本月总预算</label>
              <p>所有分类共用这个总预算提醒线</p>
            </div>
            <label class="money-input">
              <span>¥</span>
              <input id="totalBudgetInput" type="number" inputmode="decimal" min="0" step="100" value="${appState.budgets.total}" aria-label="本月总预算">
            </label>
          </div>
          <div class="budget-category-list">
            ${EXPENSE_CATEGORIES.map((category) => {
              const spent = stats.categoryTotals[category.id] || 0;
              const budget = appState.budgets.categories[category.id] || 0;
              const ratio = budget > 0 ? (spent / budget) * 100 : 0;
              const severity = budgetSeverity(ratio);
              return `
                <div class="budget-category-row" style="--category-color:${category.color}">
                  ${categoryIcon(category)}
                  <div class="budget-category-title">
                    <strong>${category.name}</strong>
                    <span>${spent > budget && budget > 0 ? `已超 ${money(spent - budget)}` : `已用 ${Math.round(ratio)}%`}</span>
                  </div>
                  <div class="budget-category-progress">
                    <div class="progress-track"><div class="progress-fill ${severity}" style="--width:${clampPercent(ratio)}%"></div></div>
                    <div class="budget-progress-labels"><span>${money(spent)}</span><span>${budget > 0 ? `${money(budget)} 预算` : "未设置预算"}</span></div>
                  </div>
                  <label class="money-input">
                    <span>¥</span>
                    <input type="number" inputmode="decimal" min="0" step="50" value="${budget}" data-category-budget="${category.id}" aria-label="${category.name}预算">
                  </label>
                </div>
              `;
            }).join("")}
          </div>
        </section>

        <aside class="panel reminder-card">
          <div class="panel-head">
            <div>
              <h3 class="panel-title">提醒设置</h3>
              <p class="panel-subtitle">${alerts.length ? `${alerts.length} 条本月提醒` : "目前没有需要关注的提醒"}</p>
            </div>
            <span class="summary-icon" style="color:var(--amber);background:var(--amber-soft)">${icon("bell", 15)}</span>
          </div>
          <div class="threshold-control">
            <div class="threshold-head">
              <span>预算使用提醒线</span>
              <strong id="thresholdValue">${appState.alertThreshold}%</strong>
            </div>
            <input id="thresholdRange" type="range" min="50" max="95" step="5" value="${appState.alertThreshold}" style="--range:${appState.alertThreshold}%">
            <div class="threshold-scale"><span>50%</span><span>95%</span></div>
          </div>
          <div class="reminder-list">
            ${alerts.length ? alerts.slice(0, 5).map((alert) => `
              <div class="reminder-item ${alert.severity === "danger" ? "danger" : alert.severity === "info" ? "info" : ""}">
                <div class="reminder-item-icon">${icon(alert.icon, 15)}</div>
                <div>
                  <strong>${alert.title}</strong>
                  <p>${alert.message}</p>
                </div>
              </div>
            `).join("") : `
              <div class="reminder-item info">
                <div class="reminder-item-icon">${icon("circle-check", 15)}</div>
                <div><strong>预算状态良好</strong><p>目前所有分类都在提醒线以内，继续保持。</p></div>
              </div>
            `}
          </div>
        </aside>
      </div>
    </section>
  `;
}

function renderEmptyState(title, description) {
  return `
    <div class="empty-state">
      <div class="empty-icon">${icon("receipt-text", 22)}</div>
      <h3>${title}</h3>
      <p>${description}</p>
      <button class="secondary-button" type="button" data-open-add>${icon("plus", 14)}记下第一笔</button>
    </div>
  `;
}

function render() {
  const pageTitles = {
    dashboard: "总览",
    transactions: "账单",
    budgets: "预算与提醒",
  };
  document.title = `${pageTitles[appState.page] || "总览"} · 余量`;
  document.getElementById("pageTitle").textContent = pageTitles[appState.page] || "总览";
  document.getElementById("todayLabel").textContent = formatLongDate();
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.classList.toggle("active", button.dataset.page === appState.page);
  });
  document.getElementById("transactionCount").textContent = String(appState.transactions.length);

  const alerts = getAlerts();
  document.getElementById("notificationDot").hidden = alerts.length === 0;

  const main = document.getElementById("mainContent");
  if (appState.page === "transactions") main.innerHTML = renderTransactionsPage();
  else if (appState.page === "budgets") main.innerHTML = renderBudgetsPage();
  else main.innerHTML = renderDashboard();

  hydrateIcons(main);
  hydrateIcons(document.querySelector(".mobile-nav"));
}

function setPage(page, options = {}) {
  if (!["dashboard", "transactions", "budgets"].includes(page)) return;
  appState.page = page;
  closeOverlay();
  render();
  if (!options.keepScroll) window.scrollTo({ top: 0, behavior: "smooth" });
  document.getElementById("mainContent").focus({ preventScroll: true });
}

function openTransactionModal(txId = null) {
  const existing = txId ? appState.transactions.find((tx) => tx.id === txId) : null;
  overlayReturnFocus = document.activeElement;
  modalDraft = existing
    ? { ...existing }
    : {
        id: null,
        type: "expense",
        amount: "",
        category: "food",
        date: localISODate(new Date()),
        note: "",
        detail: "",
        account: "日常账户",
        deleteConfirm: false,
      };
  renderOverlay();
  requestAnimationFrame(() => {
    const amountInput = document.querySelector("#amountInput");
    if (amountInput) amountInput.focus();
  });
}

function renderOverlay() {
  const root = document.getElementById("overlayRoot");
  root.innerHTML = `
    <div class="overlay center" data-overlay-backdrop>
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal-head">
          <div>
            <h2 id="modalTitle">${modalDraft.id ? "编辑账单" : "记一笔"}</h2>
            <p>${modalDraft.id ? "修改后会同步更新预算进度" : "几秒钟记下，月底少一点意外"}</p>
          </div>
          <button class="close-button" type="button" data-close-overlay aria-label="关闭">${icon("x", 17)}</button>
        </div>
        <form class="transaction-form" id="transactionForm" novalidate>
          <div class="form-type-switch" aria-label="收支类型">
            <button type="button" class="${modalDraft.type === "expense" ? "active" : ""}" data-modal-type="expense">支出</button>
            <button type="button" class="${modalDraft.type === "income" ? "active" : ""}" data-modal-type="income">收入</button>
          </div>
          <label class="amount-field" for="amountInput">
            <span>¥</span>
            <input id="amountInput" name="amount" type="number" inputmode="decimal" min="0" step="0.01" placeholder="0.00" value="${modalDraft.amount === "" ? "" : escapeHTML(modalDraft.amount)}" aria-label="金额">
          </label>
          <span class="field-label">选择分类</span>
          <div class="category-picker">
            ${(modalDraft.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map((category) => `
              <button type="button" class="category-option ${modalDraft.category === category.id ? "active" : ""}" style="--category-color:${category.color}" data-modal-category="${category.id}">
                <span>${icon(category.icon, 16)}</span>
                <span>${category.name}</span>
              </button>
            `).join("")}
          </div>
          <div class="form-row">
            <div class="form-field">
              <label for="dateInput">日期</label>
              <input id="dateInput" name="date" type="date" value="${escapeHTML(modalDraft.date)}">
            </div>
            <div class="form-field">
              <label for="accountInput">账户</label>
              <select id="accountInput" name="account">
                ${["日常账户", "信用卡", "交通卡", "现金"].map((account) => `<option value="${account}" ${modalDraft.account === account ? "selected" : ""}>${account}</option>`).join("")}
              </select>
            </div>
            <div class="form-field">
              <label for="noteInput">备注</label>
              <input id="noteInput" name="note" type="text" maxlength="40" placeholder="这笔钱花在哪" value="${escapeHTML(modalDraft.note || "")}">
            </div>
          </div>
          <div class="form-field form-note">
            <label for="detailInput">详细说明 <span style="font-weight:400;color:var(--muted)">（选填）</span></label>
            <textarea id="detailInput" name="detail" maxlength="100" placeholder="再多记一点">${escapeHTML(modalDraft.detail || "")}</textarea>
          </div>
          <p class="form-error" id="formError" role="alert"></p>
          <div class="modal-actions">
            ${modalDraft.id ? `<button class="danger-button" type="button" data-modal-delete="${escapeHTML(modalDraft.id)}">${icon("trash-2", 15)}<span>${modalDraft.deleteConfirm ? "确认删除" : "删除"}</span></button>` : "<span></span>"}
            <div class="modal-actions-right">
              <button class="secondary-button" type="button" data-close-overlay>取消</button>
              <button class="primary-button" type="submit">${icon("check", 15)}<span>保存记录</span></button>
            </div>
          </div>
        </form>
      </section>
    </div>
  `;
  hydrateIcons(root);
  document.body.style.overflow = "hidden";
}

function openNotifications() {
  overlayReturnFocus = document.activeElement;
  const alerts = getAlerts();
  const stats = getMonthStats();
  const root = document.getElementById("overlayRoot");
  root.innerHTML = `
    <div class="overlay" data-overlay-backdrop>
      <aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="drawerTitle">
        <div class="drawer-head">
          <div>
            <h2 id="drawerTitle">预算提醒</h2>
            <p>${alerts.length ? `${alerts.length} 条需要留意的信息` : "本月一切正常"}</p>
          </div>
          <button class="close-button" type="button" data-close-overlay aria-label="关闭">${icon("x", 17)}</button>
        </div>
        <div class="drawer-body">
          <div class="drawer-alert ${stats.ratio >= 100 ? "danger" : ""}">
            本月预算 ${money(stats.budget)}，已使用 ${money(stats.expenseTotal)}，${stats.remaining >= 0 ? `还剩 ${money(stats.remaining)}。` : `已超出 ${money(Math.abs(stats.remaining))}。`}
          </div>
          ${alerts.length ? alerts.map((alert) => `
            <div class="notification-card">
              <div class="reminder-item-icon ${alert.severity === "danger" ? "danger" : ""}">${icon(alert.icon, 16)}</div>
              <div>
                <strong>${alert.title}</strong>
                <p>${alert.message}</p>
                <button class="panel-link" type="button" data-go-budget>${alert.action} ${icon("chevron-right", 12)}</button>
              </div>
            </div>
          `).join("") : `
            <div class="empty-state" style="padding:48px 12px">
              <div class="empty-icon">${icon("circle-check", 22)}</div>
              <h3>没有新的提醒</h3>
              <p>目前预算和分类支出都在正常范围。</p>
            </div>
          `}
        </div>
      </aside>
    </div>
  `;
  hydrateIcons(root);
  document.body.style.overflow = "hidden";
}

function closeOverlay() {
  const root = document.getElementById("overlayRoot");
  if (!root.innerHTML) return;
  root.innerHTML = "";
  document.body.style.overflow = "";
  modalDraft = null;
  if (overlayReturnFocus && document.contains(overlayReturnFocus)) {
    overlayReturnFocus.focus({ preventScroll: true });
  }
  overlayReturnFocus = null;
}

function syncModalDraftFromForm() {
  if (!modalDraft) return;
  const form = document.getElementById("transactionForm");
  if (!form) return;
  modalDraft.amount = form.elements.amount?.value ?? modalDraft.amount;
  modalDraft.date = form.elements.date?.value ?? modalDraft.date;
  modalDraft.account = form.elements.account?.value ?? modalDraft.account;
  modalDraft.note = form.elements.note?.value ?? modalDraft.note;
  modalDraft.detail = form.elements.detail?.value ?? modalDraft.detail;
}

function handleTransactionSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const amount = Number(form.elements.amount.value);
  const date = form.elements.date.value;
  const note = form.elements.note.value.trim();
  const detail = form.elements.detail.value.trim();
  const account = form.elements.account.value;
  const error = document.getElementById("formError");

  if (!Number.isFinite(amount) || amount <= 0) {
    error.textContent = "请输入大于 0 的金额。";
    form.elements.amount.focus();
    return;
  }
  if (!date) {
    error.textContent = "请选择这笔账单的日期。";
    form.elements.date.focus();
    return;
  }
  if (!modalDraft.category) {
    error.textContent = "请选择一个分类。";
    return;
  }

  const wasEditing = Boolean(modalDraft.id);
  const previous = wasEditing ? appState.transactions.find((tx) => tx.id === modalDraft.id) : null;
  const transaction = {
    id: modalDraft.id || (crypto.randomUUID ? crypto.randomUUID() : `tx-${Date.now()}`),
    type: modalDraft.type,
    amount: Math.round(amount * 100) / 100,
    category: modalDraft.category,
    date,
    note: note || categoryById(modalDraft.category, modalDraft.type).name,
    detail,
    account,
    createdAt: previous?.createdAt || Date.now(),
  };

  if (wasEditing) {
    appState.transactions = appState.transactions.map((tx) => (tx.id === transaction.id ? transaction : tx));
  } else {
    appState.transactions.unshift(transaction);
  }
  saveState();
  closeOverlay();
  render();
  showToast(wasEditing ? "记录已更新" : "已记下一笔", `${transaction.note} · ${smartMoney(transaction.amount)}`, "success");
  if (transaction.type === "expense") checkExpenseBudget(transaction);
}

function checkExpenseBudget(transaction) {
  const stats = getMonthStats();
  const category = categoryById(transaction.category, "expense");
  const categoryBudget = appState.budgets.categories[transaction.category] || 0;
  const categorySpent = stats.categoryTotals[transaction.category] || 0;
  if (categoryBudget > 0 && categorySpent > categoryBudget) {
    window.setTimeout(() => {
      showToast("分类预算超支", `${category.name}已超出 ${money(categorySpent - categoryBudget)}。`, "danger");
    }, 350);
    return;
  }
  if (stats.ratio >= appState.alertThreshold) {
    window.setTimeout(() => {
      showToast(
        stats.ratio >= 100 ? "本月预算已用完" : "接近本月预算上限",
        stats.remaining >= 0 ? `还可支配 ${money(stats.remaining)}。` : `已超出 ${money(Math.abs(stats.remaining))}。`,
        stats.ratio >= 100 ? "danger" : "warning",
      );
    }, 350);
  }
}

function deleteTransaction(id) {
  if (!modalDraft || !modalDraft.deleteConfirm) {
    modalDraft.deleteConfirm = true;
    renderOverlay();
    return;
  }
  appState.transactions = appState.transactions.filter((tx) => tx.id !== id);
  saveState();
  closeOverlay();
  render();
  showToast("记录已删除", "预算进度已同步更新。", "success");
}

function showToast(title, message, tone = "success") {
  const root = document.getElementById("toastRoot");
  const toast = document.createElement("div");
  toast.className = `toast ${tone}`;
  const iconName = tone === "danger" ? "alert-triangle" : tone === "warning" ? "bell-ring" : "circle-check";
  toast.innerHTML = `
    <div class="toast-icon">${icon(iconName, 15)}</div>
    <div class="toast-copy"><strong>${escapeHTML(title)}</strong><span>${escapeHTML(message)}</span></div>
    <button class="toast-close" type="button" aria-label="关闭">${icon("x", 13)}</button>
  `;
  toast.querySelector(".toast-close").addEventListener("click", () => toast.remove());
  root.appendChild(toast);
  window.setTimeout(() => {
    if (!toast.isConnected) return;
    toast.classList.add("fade-out");
    window.setTimeout(() => toast.remove(), 220);
  }, 4200);
}

function focusSearch() {
  if (appState.page !== "transactions") {
    setPage("transactions");
  }
  requestAnimationFrame(() => {
    document.getElementById("ledgerSearch")?.focus();
  });
}

document.addEventListener("click", (event) => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) {
    setPage(pageButton.dataset.page);
    return;
  }

  if (event.target.closest("[data-open-add]")) {
    openTransactionModal();
    return;
  }

  if (event.target.closest("[data-open-notifications]")) {
    openNotifications();
    return;
  }

  if (event.target.closest("[data-close-overlay]")) {
    closeOverlay();
    return;
  }

  const backdrop = event.target.closest("[data-overlay-backdrop]");
  if (backdrop && event.target === backdrop) {
    closeOverlay();
    return;
  }

  const editButton = event.target.closest("[data-edit-tx]");
  if (editButton) {
    openTransactionModal(editButton.dataset.editTx);
    return;
  }

  const chartButton = event.target.closest("[data-chart-days]");
  if (chartButton) {
    appState.trendDays = Number(chartButton.dataset.chartDays);
    render();
    return;
  }

  const filterButton = event.target.closest("[data-filter-type]");
  if (filterButton) {
    appState.filter = filterButton.dataset.filterType;
    render();
    return;
  }

  const modalType = event.target.closest("[data-modal-type]");
  if (modalType) {
    syncModalDraftFromForm();
    modalDraft.type = modalType.dataset.modalType;
    const categoryList = modalDraft.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    if (!categoryList.some((category) => category.id === modalDraft.category)) {
      modalDraft.category = categoryList[0].id;
    }
    renderOverlay();
    requestAnimationFrame(() => document.querySelector("#amountInput")?.focus());
    return;
  }

  const categoryButton = event.target.closest("[data-modal-category]");
  if (categoryButton) {
    syncModalDraftFromForm();
    modalDraft.category = categoryButton.dataset.modalCategory;
    renderOverlay();
    requestAnimationFrame(() => document.querySelector("#amountInput")?.focus());
    return;
  }

  const deleteButton = event.target.closest("[data-modal-delete]");
  if (deleteButton) {
    deleteTransaction(deleteButton.dataset.modalDelete);
    return;
  }

  if (event.target.closest("[data-go-budget]")) {
    setPage("budgets");
    return;
  }

  if (event.target.closest("[data-reset-demo]")) {
    openResetConfirm();
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "transactionForm") handleTransactionSubmit(event);
});

document.addEventListener("input", (event) => {
  if (event.target.id === "ledgerSearch") {
    appState.search = event.target.value;
    const panel = document.getElementById("ledgerPanel");
    if (panel) {
      panel.innerHTML = renderTransactionLedger();
      hydrateIcons(panel);
    }
    const totals = document.querySelector(".transaction-summary-bar");
    if (totals) {
      const filtered = getFilteredTransactions();
      const expense = filtered.filter((tx) => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0);
      const income = filtered.filter((tx) => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0);
      totals.innerHTML = `
        <div class="transaction-summary-group">
          <div class="transaction-summary-item">共 ${filtered.length} 笔<strong>${appState.filter === "income" ? "收入记录" : appState.filter === "expense" ? "支出记录" : "本月记录"}</strong></div>
          <div class="transaction-summary-item">支出<strong class="expense">${money(expense)}</strong></div>
          <div class="transaction-summary-item">收入<strong class="income">${money(income)}</strong></div>
        </div>
        <div class="transaction-summary-item">净额<strong>${filtered.length ? money(income - expense) : money(0)}</strong></div>
      `;
    }
  }

  if (event.target.id === "thresholdRange") {
    const value = Number(event.target.value);
    event.target.style.setProperty("--range", `${value}%`);
    const label = document.getElementById("thresholdValue");
    if (label) label.textContent = `${value}%`;
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "thresholdRange") {
    appState.alertThreshold = Number(event.target.value);
    saveState();
    render();
    showToast("提醒线已更新", `预算使用达到 ${appState.alertThreshold}% 时会提醒你。`, "success");
    return;
  }

  if (event.target.id === "totalBudgetInput") {
    const newBudget = Number(event.target.value);
    if (Number.isFinite(newBudget) && newBudget >= 0) {
      appState.budgets.total = Math.round(newBudget * 100) / 100;
      saveState();
      render();
      showToast("总预算已更新", `本月预算为 ${money(appState.budgets.total)}。`, "success");
    }
    return;
  }

  if (event.target.matches("[data-category-budget]")) {
    const category = event.target.dataset.categoryBudget;
    const newBudget = Number(event.target.value);
    if (Number.isFinite(newBudget) && newBudget >= 0) {
      appState.budgets.categories[category] = Math.round(newBudget * 100) / 100;
      saveState();
      render();
      showToast("分类预算已更新", `${categoryById(category).name}预算已保存。`, "success");
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.getElementById("overlayRoot").innerHTML) {
    closeOverlay();
  }
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-edit-tx]")) {
    event.preventDefault();
    openTransactionModal(event.target.dataset.editTx);
  }
  if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    focusSearch();
  }
});

document.getElementById("searchShortcut").addEventListener("click", focusSearch);

function openResetConfirm() {
  overlayReturnFocus = document.activeElement;
  const root = document.getElementById("overlayRoot");
  root.innerHTML = `
    <div class="overlay center" data-overlay-backdrop>
      <section class="modal" style="width:min(410px,100%)" role="dialog" aria-modal="true" aria-labelledby="resetTitle">
        <div class="modal-head">
          <div>
            <h2 id="resetTitle">恢复演示数据？</h2>
            <p>当前账单和预算设置会被替换。</p>
          </div>
          <button class="close-button" type="button" data-close-overlay aria-label="关闭">${icon("x", 17)}</button>
        </div>
        <div style="padding:22px">
          <p style="margin:0 0 20px;color:var(--muted);font-size:11px;line-height:1.7">这会把账本恢复为初始示例，用于重新体验预算提醒。操作不能撤销。</p>
          <div class="modal-actions">
            <span></span>
            <div class="modal-actions-right">
              <button class="secondary-button" type="button" data-close-overlay>取消</button>
              <button class="danger-button" type="button" id="confirmReset">${icon("rotate-ccw", 14)}确认恢复</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
  hydrateIcons(root);
  document.body.style.overflow = "hidden";
  document.getElementById("confirmReset").addEventListener("click", () => {
    appState = { ...createSeedState(), page: "budgets", trendDays: 14, filter: "all", search: "" };
    saveState();
    closeOverlay();
    render();
    showToast("演示数据已恢复", "账单和预算已回到初始状态。", "success");
  });
}

appState.page = "dashboard";
appState.trendDays = appState.trendDays || 14;
appState.filter = appState.filter || "all";
appState.search = appState.search || "";
hydrateIcons(document);
render();
