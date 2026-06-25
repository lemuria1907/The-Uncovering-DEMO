// 从 JSON 章节文件生成自然语言剧本
const fs = require('fs');
const path = require('path');

const shared = JSON.parse(fs.readFileSync(path.join(__dirname, 'shared.json'), 'utf8'));
const storyIndex = JSON.parse(fs.readFileSync(path.join(__dirname, 'story_index.json'), 'utf8'));
const EVIDENCE_DICT = shared.EVIDENCE_DICT || {};
const PROFILE_DICT = shared.PROFILE_DICT || {};

function speakerName(speakerId) {
    if (!speakerId || speakerId === 'none') return null;
    if (speakerId === 'system') return '系统';
    // check chapter characters first, then shared profiles
    return PROFILE_DICT[speakerId]?.name || speakerId;
}

function formatLine(line, indent = '') {
    const sp = speakerName(line.speaker);
    const sLabel = line.s === 'player' ? '玩家' : (sp || '系统');
    const prefix = indent + `【${sLabel}】：`;
    return prefix + (line.t || '');
}

function formatUnlocks(line, indent = '') {
    const parts = [];
    if (line.unlockEv) {
        const ids = Array.isArray(line.unlockEv) ? line.unlockEv : [line.unlockEv];
        ids.forEach(id => {
            if (EVIDENCE_DICT[id]) parts.push(`${indent}— 解锁证物 [${EVIDENCE_DICT[id].name}]`);
        });
    }
    if (line.unlockProfile) {
        const ids = Array.isArray(line.unlockProfile) ? line.unlockProfile : [line.unlockProfile];
        ids.forEach(id => {
            if (PROFILE_DICT[id]) parts.push(`${indent}— 解锁人物档案 [${PROFILE_DICT[id].name}]`);
        });
    }
    if (line.unlockTopic) {
        const ids = Array.isArray(line.unlockTopic) ? line.unlockTopic : [line.unlockTopic];
        ids.forEach(id => parts.push(`${indent}— 解锁话题 [${id}]`));
    }
    if (line.unlockLoc) {
        const ids = Array.isArray(line.unlockLoc) ? line.unlockLoc : [line.unlockLoc];
        ids.forEach(id => parts.push(`${indent}— 解锁地点 [${id}]`));
    }
    return parts.join('\n');
}

function formatChoices(choices, indent = '') {
    const lines = [];
    lines.push(`${indent}— 三选一：「${choices.question}」`);
    (choices.options || []).forEach(opt => {
        const mark = opt.correct ? '★' : '✗';
        let entry = `${indent}\t${mark} ${opt.text}`;
        if (opt.reply) entry += ` → ${speakerName('_any') || '对方'}：${opt.reply}`;
        lines.push(entry);
    });
    return lines.join('\n');
}

function formatPresent(present, indent = '') {
    const lines = [];
    Object.entries(present || {}).forEach(([key, pData]) => {
        let label = EVIDENCE_DICT[key]?.name || PROFILE_DICT[key]?.name || key;
        if (pData.dialogue && pData.dialogue.length > 0) {
            lines.push(`${indent}🔍 举证 [${label}]：`);
            lines.push(formatDialogue(pData.dialogue, indent + '\t'));
        }
        if (pData.unlockTopic) {
            const ids = Array.isArray(pData.unlockTopic) ? pData.unlockTopic : [pData.unlockTopic];
            ids.forEach(id => lines.push(`${indent}    — 解锁话题 [${id}]`));
        }
        if (pData.unlockEv) {
            const ids = Array.isArray(pData.unlockEv) ? pData.unlockEv : [pData.unlockEv];
            ids.forEach(id => { if (EVIDENCE_DICT[id]) lines.push(`${indent}    — 解锁证物 [${EVIDENCE_DICT[id].name}]`); });
        }
        if (pData.unlockProfile) {
            const ids = Array.isArray(pData.unlockProfile) ? pData.unlockProfile : [pData.unlockProfile];
            ids.forEach(id => { if (PROFILE_DICT[id]) lines.push(`${indent}    — 解锁人物 [${PROFILE_DICT[id].name}]`); });
        }
    });
    return lines.join('\n');
}

function formatQuestion(question, indent = '') {
    const lines = [];
    if (question.dialogue && question.dialogue.length > 0) {
        lines.push(`${indent}追问：`);
        lines.push(formatDialogue(question.dialogue, indent + '\t'));
    }
    if (question.unlockEv) {
        const ids = Array.isArray(question.unlockEv) ? question.unlockEv : [question.unlockEv];
        ids.forEach(id => { if (EVIDENCE_DICT[id]) lines.push(`${indent}    — 解锁证物 [${EVIDENCE_DICT[id].name}]`); });
    }
    if (question.unlockProfile) {
        const ids = Array.isArray(question.unlockProfile) ? question.unlockProfile : [question.unlockProfile];
        ids.forEach(id => { if (PROFILE_DICT[id]) lines.push(`${indent}    — 解锁人物 [${PROFILE_DICT[id].name}]`); });
    }
    if (question.unlockTopic) {
        const ids = Array.isArray(question.unlockTopic) ? question.unlockTopic : [question.unlockTopic];
        ids.forEach(id => lines.push(`${indent}    — 解锁话题 [${id}]`));
    }
    return lines.join('\n');
}

function formatDialogue(dialogueArr, indent = '') {
    const lines = [];
    for (let i = 0; i < dialogueArr.length; i++) {
        const line = dialogueArr[i];

        // unlock before text
        const unlocks = formatUnlocks(line, indent);
        if (unlocks) lines.push(unlocks);

        // text
        if (line.t && !line.titleCard) {
            const tag = line.endChapter ? '【章节结束】' : '';
            const cTag = line._cutscene ? '【过场】' : '';
            lines.push(formatLine(line, indent) + tag + cTag);
        }

        if (line.titleCard) {
            lines.push(`${indent}【大标题动效】${line.titleCard}`);
        }

        // autoPresent
        if (line.autoPresent) {
            lines.push(`${indent}— 提示：${line.autoPresent}`);
        }

        // choices
        if (line.choices) {
            lines.push(formatChoices(line.choices, indent));
        }

        // present
        if (line.present) {
            lines.push(formatPresent(line.present, indent));
        }

        // question
        if (line.question) {
            lines.push(formatQuestion(line.question, indent));
        }
    }
    return lines.join('\n');
}

function generateScript(jsonPath, outPath, chapterLabel) {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const lines = [];

    lines.push('='.repeat(60));
    lines.push(`${chapterLabel} — 自然语言剧本`);
    lines.push('='.repeat(60));
    lines.push('');

    // Intro Dialogue
    if (data.introDialogue && data.introDialogue.length > 0) {
        lines.push(`◆ 开场导入`);
        lines.push('-'.repeat(40));
        lines.push(formatDialogue(data.introDialogue));
        lines.push('');
    }

    // Locations
    if (data.locations) {
        Object.entries(data.locations).forEach(([locId, loc]) => {
            lines.push(`▶ 地点：${loc.name}`);

            // onEnter
            if (loc.onEnter && loc.onEnter.length > 0) {
                lines.push(formatDialogue(loc.onEnter));
            }

            // Hotspots
            if (loc.hotspots && loc.hotspots.length > 0) {
                lines.push(`\t🔍 可调查点位：`);
                loc.hotspots.forEach(hs => {
                    if (hs.giveEv && EVIDENCE_DICT[hs.giveEv]) {
                        lines.push(`\t— [${hs.title}]：${hs.desc}`);
                        lines.push(`\t  解锁证物 [${EVIDENCE_DICT[hs.giveEv].name}]`);
                    } else if (hs.isLocked) {
                        const unlockLabel = EVIDENCE_DICT[hs.unlockItem]?.name || hs.unlockItem;
                        lines.push(`\t— [${hs.title}]（需解锁：${unlockLabel}）`);
                        if (hs.desc_locked) lines.push(`\t  ${hs.desc_locked}`);
                        if (hs.desc_unlocked) lines.push(`\t  解锁后：${hs.desc_unlocked}`);
                        if (hs.giveEv && EVIDENCE_DICT[hs.giveEv]) lines.push(`\t  解锁证物 [${EVIDENCE_DICT[hs.giveEv].name}]`);
                    } else {
                        lines.push(`\t— [${hs.title}]：${hs.desc}`);
                    }
                });
            }

            // Characters at location
            if (loc.chars && loc.chars.length > 0) {
                loc.chars.forEach(charId => {
                    const charData = data.characters?.[charId] || PROFILE_DICT[charId];
                    const cName = charData?.name || charId;
                    lines.push(`\t人物：[${cName}]${charData?.info ? '（' + charData.info + '）' : ''}`);

                    // Greeting and topics for this character at this location
                    const greeting = data.greetings?.[charId];
                    if (greeting && greeting.length > 0) {
                        lines.push(`\t◆ 寒暄：`);
                        lines.push(formatDialogue(greeting, '\t\t'));
                    }

                    // Topics
                    if (data.topics) {
                        Object.entries(data.topics).forEach(([topicId, topic]) => {
                            if (topic.char === charId) {
                                const hiddenTag = topic.hidden ? '【隐藏话题】' : '';
                                lines.push(`\t◆◆ 话题：${topic.title}${hiddenTag}`);
                                lines.push('\t' + '-'.repeat(30));
                                lines.push(formatDialogue(topic.dialogue, '\t'));
                                lines.push('');
                            }
                        });
                    }
                });
            }

            lines.push('');
        });
    }

    fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
    console.log(`Generated: ${path.basename(outPath)}`);
}

// Main
const chapters = storyIndex.chapters || [];
const chapterNames = storyIndex.chapterInfo || {};

// Group by chapter
const chapterMap = new Map();
chapters.forEach(c => {
    if (!chapterMap.has(c.chapter)) chapterMap.set(c.chapter, []);
    chapterMap.get(c.chapter).push(c);
});

// Generate per-section scripts
chapters.forEach(c => {
    const jsonPath = path.join(__dirname, c.file);
    if (!fs.existsSync(jsonPath)) {
        console.log(`SKIP: ${c.file} (not found)`);
        return;
    }
    const chName = chapterNames[String(c.chapter)]?.name || `第${c.chapter}章`;
    const outPath = jsonPath.replace('.json', '_自然语言剧本.txt');
    generateScript(jsonPath, outPath, `${chName}·第${c.section}节（${c.name}）`);
});

console.log('\n全部完成！');
