const fs = require('fs');
const path = require('path');

const envContent = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
const match = envContent.match(/GOOGLE_APPLICATION_CREDENTIALS_JSON="(.+)"/);

if (!match) {
    console.error("Match not found (check quotes)");
    process.exit(1);
}

// In .env with double quotes, \" becomes "
let json = match[1].replace(/\\"/g, '"');
console.log("Extracted JSON length:", json.length);

try {
    const credentials = JSON.parse(json);
    console.log("JSON Parsed Successfully!");
    console.log("Project ID:", credentials.project_id);
} catch (e) {
    console.error("JSON Parse Error:", e.message);
}
