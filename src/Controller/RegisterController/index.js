const currency = async (req, res) => {
  res.status(200).json({
    success: true,
    currency: [
      "USD", // US Dollar
      "EUR", // Euro
      "JPY", // Japanese Yen
      "GBP", // British Pound
      "AUD", // Australian Dollar
      "CAD", // Canadian Dollar
      "CHF", // Swiss Franc
      "CNY", // Chinese Yuan
      "SEK", // Swedish Krona
      "NZD", // New Zealand Dollar
      "MXN", // Mexican Peso
      "SGD", // Singapore Dollar
      "HKD", // Hong Kong Dollar
      "NOK", // Norwegian Krone
      "KRW", // South Korean Won
      "TRY", // Turkish Lira
      "INR", // Indian Rupee
      "RUB", // Russian Ruble
      "BRL", // Brazilian Real
      "ZAR", // South African Rand
      "DKK", // Danish Krone
      "PLN", // Polish Zloty
      "THB", // Thai Baht
      "IDR", // Indonesian Rupiah
      "HUF", // Hungarian Forint
      "CZK", // Czech Koruna
      "ILS", // Israeli Shekel
      "CLP", // Chilean Peso
      "PHP", // Philippine Peso
      "AED", // United Arab Emirates Dirham
      "COP", // Colombian Peso
      "SAR", // Saudi Riyal
      "MYR", // Malaysian Ringgit
      "RON", // Romanian Leu
    ],
  });
};

const MCC = async (req, res) => {
  res.status(200).json({
    success: true,
    list: [
      "item 1",
      "item 2",
      "item 3",
      "item 4",
      "item 5",
      "item 6",
      "item 7",
      "item 8",
    ],
  });
};

const timeZone = async (req, res) => {
  res.status(200).json({
    success: true,
    timeZone: [
      "UTC", // Coordinated Universal Time
      "GMT", // Greenwich Mean Time
      "ECT", // European Central Time
      "EET", // Eastern European Time
      "ART", // (Arabic) Egypt Standard Time
      "EAT", // Eastern African Time
      "MET", // Middle East Time
      "NET", // Near East Time
      "PLT", // Pakistan Lahore Time
      "IST", // India Standard Time
      "BST", // Bangladesh Standard Time
      "VST", // Vietnam Standard Time
      "CTT", // China Taiwan Time
      "JST", // Japan Standard Time
      "ACT", // Australia Central Time
      "AET", // Australia Eastern Time
      "SST", // Solomon Standard Time
      "NST", // New Zealand Standard Time
      "MIT", // Midway Islands Time
      "HST", // Hawaii Standard Time
      "AST", // Alaska Standard Time
      "PST", // Pacific Standard Time
      "PNT", // Phoenix Standard Time
      "MST", // Mountain Standard Time
      "CST", // Central Standard Time
      "EST", // Eastern Standard Time
      "IET", // Indiana Eastern Standard Time
      "PRT", // Puerto Rico and US Virgin Islands Time
      "CNT", // Canada Newfoundland Time
      "AGT", // Argentina Standard Time
      "BET", // Brazil Eastern Time
      "CAT", // Central African Time
    ],
  });
};

const register = async (req, res) => {
  const { name, mcc, currency, timeZone, invitationMail, mail, role } =
    req.body;

  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!mcc) missingFields.push("mcc");
  if (!currency) missingFields.push("currency");
  if (!timeZone) missingFields.push("timeZone");
  if (!invitationMail) missingFields.push("invitationMail");
  if (!mail) missingFields.push("mail");
  if (!role) missingFields.push("role");

  // If there are any missing fields, respond with an error
  if (missingFields.length > 0) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  res.status(200).json({
    status: 200,
    success: true,
    object: {
      name,
      mcc,
      currency,
      timeZone,
      invitationMail,
      mail,
      role,
    },
  });
};

const budgetBilling = async (req, res) => {
  const { currency, Budget, paymentAccountId } = req.body;

  const missingFields = [];
  if (!Budget) missingFields.push("Budget");
  if (!paymentAccountId) missingFields.push("paymentAccountId");
  if (!currency) missingFields.push("currency");

  // If there are any missing fields, respond with an error
  if (missingFields.length > 0) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  res.status(200).json({
    status: 200,
    success: true,
    object: {
      currency,
      Budget,
      paymentAccountId,
    },
  });
};

module.exports = {
  currency,
  MCC,
  register,
  timeZone,
  budgetBilling,
};
