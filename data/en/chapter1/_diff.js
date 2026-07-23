const fs=require('fs');
const zh=JSON.parse(fs.readFileSync('../../zh/shared.json','utf8'));
const en=JSON.parse(fs.readFileSync('../../en/shared.json','utf8'));
const ja=JSON.parse(fs.readFileSync('../../ja/shared.json','utf8'));

// Find actual content differences (not just name replacements)
const changes=[];
for(const cat of ['EVIDENCE_DICT','PROFILE_DICT']){
  const zhKeys=Object.keys(zh[cat]||{});
  const enKeys=Object.keys(en[cat]||{});
  const jaKeys=Object.keys(ja[cat]||{});
  // Missing keys
  for(const k of zhKeys){
    if(!enKeys.includes(k)) changes.push(`EN MISSING ${cat}.${k}`);
    if(!jaKeys.includes(k)) changes.push(`JA MISSING ${cat}.${k}`);
  }
  // Content diffs: compare ZH vs EN name/desc
  for(const k of zhKeys){
    const z=zh[cat][k], e=en[cat][k], j=ja[cat][k];
    if(!e||!j) continue;
    // Check if ZH was modified (we need to sync name/desc changes)
    // The ZH name is shorter than the EN name in some cases
    // Compare by checking if the EN name matches the OLD ZH name pattern
  }
}

// Count
const zhEv=Object.keys(zh.EVIDENCE_DICT), zhPr=Object.keys(zh.PROFILE_DICT);
const enEv=Object.keys(en.EVIDENCE_DICT), enPr=Object.keys(en.PROFILE_DICT);
const jaEv=Object.keys(ja.EVIDENCE_DICT), jaPr=Object.keys(ja.PROFILE_DICT);
console.log('ZH:',zhEv.length,'ev,',zhPr.length,'profiles');
console.log('EN:',enEv.length,'ev,',enPr.length,'profiles');
console.log('JA:',jaEv.length,'ev,',jaPr.length,'profiles');

// Find items where ZH name differs from EN/JA name after accounting for translation
for(const k of zhEv.slice(0,10)){
  if(!en.EVIDENCE_DICT[k]||!ja.EVIDENCE_DICT[k]){console.log('MISSING:',k);continue}
  console.log(k);
  console.log('  ZH:',zh.EVIDENCE_DICT[k].name);
  console.log('  EN:',en.EVIDENCE_DICT[k].name);
  console.log('  JA:',ja.EVIDENCE_DICT[k].name);
}
for(const k of zhPr.slice(0,5)){
  if(!en.PROFILE_DICT[k]||!ja.PROFILE_DICT[k]){console.log('MISSING:',k);continue}
  console.log(k);
  console.log('  ZH:',zh.PROFILE_DICT[k].name);
  console.log('  EN:',en.PROFILE_DICT[k].name);
  console.log('  JA:',ja.PROFILE_DICT[k].name);
}
