const { GoogleAdsApi } = require("google-ads-api");

const client = new GoogleAdsApi({
  client_id: "<CLIENT-ID>",
  client_secret: "<CLIENT-SECRET>",
  developer_token: "<DEVELOPER-TOKEN>",
});

const customer = client.Customer({
  customer_id: "<Customer_ID>",
  refresh_token: "<Refresh_Token>",
});

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

const getManagedAccounts = async (req, res) => {
  try {
    // Query to retrieve customer client details
    const response = await customer.query(
      `SELECT customer_client.client_customer, customer_client.level, customer_client.manager, customer_client.descriptive_name
       FROM customer_client
       WHERE customer_client.level = 1` // Level 1 returns accounts directly under the MCC
    );

    // Map the response to format the account details
    const accountList = response.map((row) => ({
      customerId: row.customer_client.client_customer,
      descriptiveName: row.customer_client.descriptive_name,
      isManagerAccount: row.customer_client.manager,
    }));

    // Return the list in the specified format
    res.status(200).json({
      success: true,
      list: accountList,
    });
  } catch (error) {
    console.error("Error retrieving MCC accounts:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving MCC accounts",
    });
  }
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

  const budgetResponse = await customer.campaignBudgets.create({
    name: "My Campaign Budget", // handle name
    amount_micros: Budget, // $100 budget in micros
    delivery_method: "STANDARD", // handle delivery method
  });

  const missingFields = [];
  if (!Budget) missingFields.push("Budget");
  if (!paymentAccountId) missingFields.push("paymentAccountId");
  if (!currency) missingFields.push("currency");

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
    campaign: budgetResponse.resource_name,
  });
};

module.exports = {
  currency,
  getManagedAccounts,
  register,
  timeZone,
  budgetBilling,
};
