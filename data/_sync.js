const fs=require('fs');
const zh=JSON.parse(fs.readFileSync('zh/shared.json','utf8'));
const en=JSON.parse(fs.readFileSync('en/shared.json','utf8'));
const ja=JSON.parse(fs.readFileSync('ja/shared.json','utf8'));

// For each ZH entry, check if EN/JA entry exists. If ZH changed (name/desc differs from what EN/JA would have if untranslated), sync the change.
// Strategy: regenerate only the entries where ZH content genuinely differs from what produced the existing EN/JA.

// SIMPLER: Just list all entries and let me see what changed vs existing EN/JA
console.log('=== Checking for changes ===');
let changes=0;
for(const cat of ['EVIDENCE_DICT','PROFILE_DICT']){
  for(const k of Object.keys(zh[cat]||{})){
    const z=zh[cat][k]; if(!z)continue;
    const e=en[cat][k]; const j=ja[cat][k];
    if(!e){console.log('EN MISSING:',cat,k);changes++;continue}
    if(!j){console.log('JA MISSING:',cat,k);changes++;continue}
    // Compare ZH fields with what's in EN/JA
    // The EN/JA fields were translated from an older ZH version
    // If ZH.name changed, we need to retranslate EN.name and JA.name
    // We can detect changes by comparing ZH content
  }
}

// Better approach: show all 3 versions side by side
for(const k of Object.keys(zh.EVIDENCE_DICT).slice(0,5)){
  console.log(k);
  console.log('  ZH name:',zh.EVIDENCE_DICT[k].name);
  console.log('  EN name:',en.EVIDENCE_DICT[k].name);
  console.log('  JA name:',ja.EVIDENCE_DICT[k].name);
}
console.log('ZH total ev:',Object.keys(zh.EVIDENCE_DICT).length);
console.log('EN total ev:',Object.keys(en.EVIDENCE_DICT).length);
console.log('JA total ev:',Object.keys(ja.EVIDENCE_DICT).length);
