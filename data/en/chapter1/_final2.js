const fs=require('fs');
const zh=JSON.parse(fs.readFileSync('../../zh/chapter1/c1_s2.json','utf8'));

// Complete ZH->EN translation dictionary
const D={
// === LOCATIONS: names ===
'鬼屋广场':'Haunted House Plaza','大提琴手演出点':'Cellist Performance Spot',"红死魔&亲王之妻演出点":"Red Death & Prince's Wife Spot",'瘟疫医生演出点':'Plague Doctor Spot','假面舞者演出点':'Masked Dancer Spot','癫狂亲王演出点':'Mad Prince Spot','敲钟人演出点':'Bell Ringer Spot','问询区域':'Interrogation Area',
// === LOCATIONS: desc ===
'地点：鬼屋广场':'Location: Haunted House Plaza','地点：大提琴手演出点':'Location: Cellist Performance Spot',"地点：红死魔&亲王之妻演出点":"Location: Red Death & Prince's Wife Spot",'地点：瘟疫医生演出点':'Location: Plague Doctor Spot','地点：假面舞者演出点':'Location: Masked Dancer Spot','地点：癫狂亲王演出点':'Location: Mad Prince Spot','地点：敲钟人演出点':'Location: Bell Ringer Spot','地点：问询区域':'Location: Interrogation Area',
// === CHARACTERS: name+info (already done by name replace, but add for safety) ===
'小枝':'Sidney','真橙':'Sunny','阿祐':'Aiden','石辉':'Ray','蒋威':'Victor','琴警官':'Lyra','明淇':'Celeste','肖华':'Shawn','美羽':'Faye','阿凌':'Lynn','茹兰':'Orchid','安童':'Anton','希泉':'Sylva','希枝':'Sidney',
'妹妹':'Your sister','鬼屋演员':'Haunted house performer','演出部主管':'Performance Director','老相识':'Old acquaintance','死者，鬼屋演员':'The victim, haunted house performer',
// === HOTSPOTS ===
'大提琴琴箱':'Cello Case','琴箱里用一块暗色的花纹丝绸遮挡着什么。你掀开丝绸，发现里面有口红、女式发夹两件物品。':'Hidden beneath dark patterned silk inside the cello case. You lift the silk and find a lipstick and a hair clip.',
'巨大的道具箱':'Large Prop Crate','一个约为1.5x2x1.5的大箱子，里面放置着一套亲王之妻的人偶。':"A crate roughly 1.5 by 2 by 1.5 meters. Inside rests a Prince's Wife mannequin.",
'头顶的横梁':'Ceiling Beam','头顶的横梁上似乎有些痕迹。但距离地面太高了。':'There seem to be marks on the beam above. But it is too high to reach from the ground.',
'你踩上道具箱看向顶梁，发现一个小型金属滚轴，旁边的木梁边缘有好几道绳索勒过的痕迹，其中一条痕迹较深，但被灰尘覆盖。':'You step onto the prop crate and examine the beam. A small metal roller. The wooden edge beside it bears several rope-rub marks. One is deeper but covered in dust.',
// === INTRO DIALOGUE ===
'2025年10月27日，21时04分，朝夜游乐园，鬼屋门口':'October 27, 2025, 21:04, Chaoye Park, haunted house entrance',
// === ONENTER TEXT ===
'刚才还人潮涌动、四周灯火通明的鬼屋，现在像一只发条松掉的音乐盒，安安静静地躺在那里。':'The haunted house, which moments ago was crowded and brightly lit, now sits quietly like a music box whose spring has run down.',
'你和小枝站在入口处，准备进去查看。':'You and Sidney stand at the entrance, ready to investigate.',
'（*点击左上角「观察现场」查看当前场景细节并收集线索*）':"(*Click 'Search Scene' top-left to inspect this area and collect clues*)",
'角落立着一把用丙烯画出破损和虫蛀效果的大提琴，琴身上布满暗红色的擦痕——估计也是画出来的。旁边散落着几页乐谱，被踩得很皱。':'In the corner stands a cello painted to look damaged and worm-eaten, its body covered in dark red scratches — probably painted on as well. Sheet music lies crumpled nearby.',
'这个点位是整个鬼屋的起点，音乐本该从这里弥漫出去，现在留下的只有寂静了。':'This spot is the haunted house starting point. Music was meant to fill the air from here, but now only silence remains.',
'红死魔的斗篷被随意地扔在地上，宽大的猩红色袍子像一团凝固的血。':"The Red Death's cloak lies discarded on the floor, its wide scarlet robe like a pool of congealed blood.",
'亲王之妻的假人模特倒在地上，脸上戴着白色面具，空洞的眼窝看起来有些可怖。':"The Prince's Wife mannequin lies toppled on the ground, a white mask on its face, its hollow eye sockets eerily unsettling.",
'左侧一个角落，放着一台鼓风机，原来在演出的时候，舞者衣摆飞荡的样子是风吹起来的。':"In one corner sits a blower fan. So the dancer's billowing hems during the show — that was the wind.",
'房间暗处，头顶有几根横梁，似乎能看到上面有个金属的突起，但那儿距离地面太高了。':'In the darkness above, beams cross the ceiling. A metal protrusion is visible on one, but too high to reach.',
'相比于其他区域，这里较为狭窄，更像是走廊边的一处小储藏室，贴着墙壁的位置有一张木头桌子，上面放着医疗手术道具，柳叶刀、镊子等等。':'Narrower than other areas, this feels like a small storage closet along the corridor. A wooden table against the wall holds medical props: scalpels, tweezers, and the like.',
'桌子下面，放置着瘟疫医生的长袍和面具，黑色皮质面具上的鸟喙又长又尖。':"Under the table lie the Plague Doctor's robe and mask. The beak on the black leather mask is long and sharply pointed.",
'旁边的推车上摆满了瓶瓶罐罐，标签上写着一些看不懂的文字，有些瓶子已经打翻，液体干涸后留下深色的渍痕。':'The cart beside it is covered in bottles and jars with unreadable labels. Some have tipped over; dried contents leave dark stains.',
'房间四周垂着暗红色的帷幔，演员表演区域的身后放着一排形成弧度的镜子。':'Dark red drapes hang around the room. Behind the performance area, a row of mirrors is arranged in an arc.',
'这大概是为了营造很多人在跳舞的错觉。':'This was probably to create the illusion of many people dancing.',
'这个房间正中央是一张华丽的宴会长桌，桌旁\u201c宾客\u201d们东倒西歪，穿着中世纪贵族的服饰——当然，都是人偶道具扮作的尸体。':'In the center of this room is a lavish banquet table. Around it, "guests" slump at odd angles in medieval noble costumes — all mannequin props posed as corpses.',
'有些\u201c尸体\u201d的手里还捏着酒杯，身上血迹斑斑。桌布被拉扯得皱皱巴巴，像是真的发生过一场混乱。':'Some "bodies" still clutch wine glasses, their clothes bloodstained. The tablecloth is crumpled, as though a real struggle took place.',
'而一具真正的尸体，刚刚就被发现在长桌的桌布下面。':'And a real body, it turns out, was just discovered beneath the long tablecloth.',
'出口附近的空地上，放置着一口巨大的铜钟，钟槌悬在一旁。':'In the open space near the exit stands a massive bronze bell, its striker hanging beside it.',
'敲钟人的驼背斗篷挂在墙上，背部很明显地鼓出来，那里是有一大块海绵软垫。':"The Bell Ringer's humpback cloak hangs on the wall, its back bulging prominently — a large foam cushion tucked inside.",
'在故事里，最后的丧钟就是从这里敲响的，它提醒观众，瘟疫已至，无处可逃。':'In the story, the final death knell is rung from here, reminding the audience that the plague has arrived, leaving nowhere to flee.',
// === GREETINGS ===
'这里就是鬼屋入口处，玩家会遇到的第一个场景。':'This is the haunted house entrance — the first scene you will encounter.',
'这些道具，细看下来并不觉得可怕了！':'These props do not seem scary up close!',
'是呀。鬼屋这么黑，原因大概就是需要让大家看不清吧。':'Right. The haunted house is so dark probably so no one can see clearly.',
'这个奇怪的机器是干什么的？':'What is this strange machine for?',
'是鼓风机。你还记得演出的时候，他们衣服边缘一条一条的布片飞起来的样子吗？':'It is a blower fan. Remember how strips of cloth on their costumes flew up during the show?',
'哦哦！是干这个用的，我特别喜欢这个效果，很仙气飘飘！':'Ohhh! I loved that effect — so ethereal!',
'你说鬼屋的鬼看起来仙气飘飘吗？':'You are saying the ghosts in the haunted house looked ethereal?',
'又吓人又好看！我喜欢！':'Scary and pretty! I love it!',
'真是充满氛围感的一幕啊！':'What an atmospheric scene!',
'真橙就是在这里跳舞的吗？一个人？':'Did Sunny dance here? All by herself?',
'对呀，虽然看起来是很多人，但这都是利用镜子达成的效果。':'Yeah. Even though it looked like many people, it was all done with mirrors.',
'并且，镜子也能把我们这些观众也照进去，所以看上去就是一群人把舞者圈起来，围着看她跳舞。':'And the mirrors reflected us — the audience — so it looked like a crowd gathered around her.',
'真是有趣的设计呀。':'What a clever design.',
'姐姐，我不敢进去了。':'Sis, I do not want to go in.',
'尸体已经搬走了。':'The body has already been moved.',
'还是觉得好可怕。假的尸体里混进去一具真正的尸体。':'Still terrifying. A real body mixed in with all those fake ones.',
'是啊……想想也觉得脊背发凉。':'Yeah... it sends chills down my spine.',
'你说，我们看的那场会不会……尸体已经放置在那里了？':'Do you think... during the show we watched... the body was already there?',
'应该不会，咱们看的是第三场，死者应该不会是那场被害的。':'Probably not. We saw the third show. The victim would not have been killed during that one.',
'如果大家说的都是实话的话……':'If everyone is telling the truth, that is...',
'啊啊啊啊！姐姐你吓唬我！':'AAAAH! Sis, you are scaring me!',
'我可没有噢。':'I did not say anything.',
'这个驼背敲钟人的形象，让我联想到了《谜侦探柯兰》里面很有名的一集。叫做《绷带怪人杀人事件》。':'This hunchback bell ringer reminds me of a famous Detective Conan episode — "The Bandaged Man Murder Case."',
'嗯？':'Huh?',
'里面有一个#…%&#把#…￥#%放在了#￥#…你是不是没看过！那我不跟你剧透了。超级恐怖的一集，很推荐！':'The killer hid the body inside the humpback costume... You have not seen it? I will not spoil it. Super scary, highly recommended!',
'你差不多已经剧透光了。':'You have basically spoiled the whole thing.',
'啊啊！我错了，姐姐！':'Aah! I am sorry, sis!',
'……':'......',
'你看起来脸色很不好……话说回来……你是怎么发现尸体的？':'You look terrible... How did you find the body?',
'我……我偶尔会在演出后稍微收拾和清点一下道具，今天感觉假人摆得有点乱……原本会有一些假人半身是在桌子下面的，但现在好像露在外面的部分很多。':'I... I sometimes tidy up props after the show. Today the mannequins felt off — usually some are half under the table, but much more seemed exposed.',
'我原本想把假人往里面推一推，发现推不动。然后就……':'I tried to push the mannequin in, but it would not budge. And then...',
'太可怕了……这个场景……':'How horrifying... this scene...',
'是……是啊，吓了我一大跳……':'Y-yeah... gave me a huge fright...',
'哎呀怎么这样！怎么能这样！真让人头疼啊！！！':'Oh, how could this happen! What a headache!!!',
'这地方，是不是让人给诅咒了？肯定有鬼！或者是有人在搞鬼！':'Is this place cursed? There must be ghosts! Or someone is playing tricks!',
'我知道你急，但是你先别急……':'I know you are anxious, but try to calm down...',
'不是……不是我干的！我没有杀人！':'It was not... was not me! I did not kill anyone!',
'我没说你杀人……我是例行问话……':'I am not accusing you... This is a routine interview...',
'呜呜……威哥、就这么死了……昨天我下班时还跟他一起吃烧烤，今天怎么人突然就没了！':'Sob... Vic... just dead... Yesterday we ate barbecue after work. How can he suddenly be gone!',
'世事难料啊……':'Life is unpredictable...',
'姐，我有点难过……虽然我不认识这位演员，但他的装扮和表演给我带来了很多快乐。':'Sis, I feel sad... I did not know this performer, but his acting brought me joy.',
'我们一定会查清楚真相的。':'We will definitely get to the bottom of this.',
// === TOPIC TITLES ===
'小枝的猜测':'Sidney Theory','小枝的猜测1':'Sidney Theory 1','小枝的猜测2':'Sidney Theory 2','和小枝一起调查':'Investigating with Sidney',
'请介绍一下你自己':'Please Introduce Yourself','你和死者的关系':'Your Relationship with the Deceased','死者今天有什么异常':"Was the Deceased Unusual Today",'案发前后你在做什么':'What Were You Doing Around the Incident','死去的同事':'The Deceased Colleague','和肖华的关系':'Relationship with Shawn',
'和其他嫌疑人的关系':'Relationship with Other Suspects','前演出主管明淇':'Former Performance Director Celeste','朝夜乐园的丑闻':'The Chaoye Park Scandal',
// === CHOICE QUESTIONS ===
'请选择：':'Choose:','请指出现场奇怪的东西':'Point out the suspicious item','请指出和哪个线索冲突？':'Which clue does this contradict?','请指出能证明这把刀不是凶器的证据':'Present evidence proving this knife was not the murder weapon','请指出能快速搬进搬出镜子的方式':'Show how mirrors can be quickly moved','请指出可疑的物品':'Point out the suspicious items','请指出哪个证据可以揭示阿祐话语中的矛盾？':'Which evidence reveals the contradiction in Aiden words?',
'A 颜色':'A Color','B 物品':'B Items','C 位置':'C Location','是这样吗？':'Is that so?',
'A 红死魔和亲王之妻的双人舞':'A The Red Death and Prince Wife duet','B 亲王与妻子的双人舞':'B The Prince and his Wife duet','C 红死魔与亲王的双人舞':'C The Red Death and the Prince duet','姐，你再看看呢……':'Sis, take another look...','虽然不太对劲，但好像也不错？':'That is off, but kind of cool?',
'A 用暗门会更绕远':'A Hidden door is a longer detour','B 暗门太窄，演员穿着戏服过不去':'B Door too narrow for costumed performers','C 用暗门无法到达下一个点位':'C Door does not reach the next spot','可是我看真橙小姐的衣服不是很厚重呀……':'But Sunny costume does not look that bulky...','看起来没什么问题，从那个走廊肯定可以啦。':'Looks fine — you could get there through that corridor.',
'A 谁来扮演红死魔':'A Who plays the Red Death','B 如何隐藏尸体':'B How to hide the body','C 如何移动尸体':'C How to move the body','屋子里比较黑，也有一些天鹅绒布料可以使用，隐藏尸体应该不难。':'The room is dark and has velvet — hiding a body should not be too hard.','屋内地面不算粗糙，如果是在5号点位实施谋杀的话，拖动到4号点位，应该可以做到。':'The floor is not rough. If murdered at Spot 5, dragging to Spot 4 is doable.',
'A 时间':'A Time','B 凶器':'B Murder Weapon','C 隐蔽性':'C Concealment','绳子倒是到处都有，看起来不算难找。':'Rope is everywhere — not hard to find.','场地那么黑，或许可以……':'It is so dark, maybe...',
'A 观众的镜像':'A Audience reflection','B 演员和镜子的距离':'B Performer-mirror distance','C 烛光会变成双份':'C Candlelight would double','但观众完全在黑暗里，那么黑的话，也是不会出现镜像的吧？':'But in total darkness, the audience would not appear in the mirror, right?','观众也不会知道这里面放了多少根蜡烛，好像多几根也没什么大碍？':'Audience does not know how many candles are here — a few extra would not matter.',
'A 肖华并没有穿着红死魔服装上吊':'A Shawn was not wearing the Red Death costume','B 肖华是阿祐杀死的':'B Shawn was killed by Aiden','C 肖华的死另有隐情':'C There is more to Shawn death','不……我没有杀人！':'No... I did not kill anyone!',
'A 场地狭小，没有多余空间':'A Cramped space, no extra room','B 观众与演员距离较远':'B Audience far from performers','C 演出没有设计恐怖的桥段':'C No scary segments designed','其实这里不小了，比南州的鬼屋大了足足120平米呢。':'Actually not small — 120 sqm larger than the Nanzhou haunted house.','那怎么行呢？鬼屋也还是要恐怖一些才可以呢……':'How could that work? A haunted house still needs to be scary...',
};

// Walk and translate
function tr(s){
  if(typeof s!=='string')return s;
  // Check exact match first
  if(D.hasOwnProperty(s))return D[s];
  // Apply name replacements for any remaining names in text
  let r=s;
  const NM={小枝:'Sidney',真橙:'Sunny',阿祐:'Aiden',石辉:'Ray',蒋威:'Victor',琴警官:'Lyra',明淇:'Celeste',肖华:'Shawn',美羽:'Faye',阿凌:'Lynn',茹兰:'Orchid',安童:'Anton',希泉:'Sylva',希枝:'Sidney'};
  for(const[k,v]of Object.entries(NM))r=r.split(k).join(v);
  return r;
}
function walk(obj){
  if(Array.isArray(obj))return obj.map(walk);
  if(obj&&typeof obj==='object'){
    const res={};
    for(const k of Object.keys(obj)){
      if(['t','title','desc','desc_locked','desc_unlocked','question','reply','autoPresent','name','info'].includes(k)&&typeof obj[k]==='string')
        res[k]=tr(obj[k]);
      else res[k]=walk(obj[k]);
    }
    return res;
  }
  return obj;
}
const result=walk(zh);
const output=JSON.stringify(result,null,2);
fs.writeFileSync('c1_s2.json',output,'utf8');
try{JSON.parse(output);console.log('VALID')}catch(e){console.log('ERROR:',e.message)}
const cn=output.match(/[\u4e00-\u9fff]{4,}/g)||[];
console.log('CN remaining:',cn.length);
