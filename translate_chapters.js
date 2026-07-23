const fs=require('fs');
const chs=['c1_s3','c1_s4','c1_s5'];

const nameEN={'小枝':'Sidney','真橙':'Sunny','阿祐':'Aiden','石辉':'Ray','蒋威':'Victor','琴警官':'Lyra','明淇':'Celeste','肖华':'Shawn','美羽':'Faye','阿凌':'Lynn','茹兰':'Orchid','安童':'Anton','希泉':'Sylva','希枝':'Sidney','Andy':'Andy'};
const locEN={'鬼屋广场':'Haunted House Plaza','更衣室':'Locker Room','主管办公室':'Director Office','问询区域':'Interrogation Area','鬼屋门口':'Haunted House Entrance','大门口':'Main Gate','游客中心':'Visitor Center','大提琴手演出点':'Cellist Spot','红死魔&亲王之妻演出点':'Red Death & PrinceWife Spot','瘟疫医生演出点':'Plague Doctor Spot','假面舞者演出点':'Masked Dancer Spot','癫狂亲王演出点':'Mad Prince Spot','敲钟人演出点':'Bell Ringer Spot'};
const infoEN={'妹妹':'Your sister','安保负责人':'Head of Security','演出部主管':'Performance Director','鬼屋演员':'Haunted house performer','老相识':'Old acquaintance','死者，鬼屋演员':'The victim, haunted house performer','乐园临时演员':'Park understudy performer','动物救助中心员工':'Animal rescue center worker','肖华的未婚妻':"Shawn's fiancee",'三年前死亡的鬼屋演员':'Haunted house performer who died 3 years ago','怪盗':'Phantom thief','扒手':'Pickpocket'};

const nameJA={'小枝':'希枝','真橙':'真橙','阿祐':'阿祐','石辉':'石輝','蒋威':'蒋威','琴警官':'琴','明淇':'明淇','肖华':'肖華','美羽':'美羽','阿凌':'阿凌','茹兰':'茹蘭','安童':'安童','希泉':'希泉','希枝':'希枝','Andy':'Andy'};
const locJA={'鬼屋广场':'お化け屋敷広場','更衣室':'更衣室','主管办公室':'主管執務室','问询区域':'尋問エリア','鬼屋门口':'お化け屋敷入口','大门口':'正門','游客中心':'ビジターセンター','大提琴手演出点':'チェリスト演出Pt','红死魔&亲王之妻演出点':'赤死病＆プリンスの妻Pt','瘟疫医生演出点':'ペスト医師Pt','假面舞者演出点':'仮面の踊り子Pt','癫狂亲王演出点':'狂気のプリンスPt','敲钟人演出点':'鐘つき人Pt'};
const infoJA={'妹妹':'妹','安保负责人':'警備責任者','演出部主管':'演出部主管','鬼屋演员':'お化け屋敷の俳優','老相识':'旧知の刑事','死者，鬼屋演员':'被害者、お化け屋敷の俳優','乐园临时演员':'パーク臨時俳優','动物救助中心员工':'動物救助センター職員',"肖华的未婚妻":'肖華の婚約者','三年前死亡的鬼屋演员':'三年前死亡したお化け屋敷俳優','怪盗':'怪盗','扒手':'スリ'};

function translate(s,nm,lm,im){
  if(typeof s!=='string')return s;
  let r=s;
  for(const[k,v]of Object.entries(nm))r=r.split(k).join(v);
  for(const[k,v]of Object.entries(lm))if(r===k)return v;
  for(const[k,v]of Object.entries(im))if(r===k)return v;
  r=r.replace(/地点：/g,'Location: ');
  return r;
}
function translateJA(s,nm,lm,im){
  if(typeof s!=='string')return s;
  let r=s;
  for(const[k,v]of Object.entries(nm))r=r.split(k).join(v);
  for(const[k,v]of Object.entries(lm))if(r===k)return v;
  for(const[k,v]of Object.entries(im))if(r===k)return v;
  r=r.replace(/地点：/g,'場所：');
  return r;
}
function dt(obj,fn,nm,lm,im){
  if(Array.isArray(obj))return obj.map(v=>dt(v,fn,nm,lm,im));
  if(obj&&typeof obj==='object'){
    const res={};
    for(const[k,v]of Object.entries(obj)){
      if(['t','title','desc','desc_locked','desc_unlocked','text','question','reply','name','info','autoPresent'].includes(k)&&typeof v==='string')
        res[k]=fn(v,nm,lm,im);
      else res[k]=dt(v,fn,nm,lm,im);
    }
    return res;
  }
  return obj;
}

for(const ch of chs){
  const zh=JSON.parse(fs.readFileSync('data/zh/chapter1/'+ch+'.json','utf8'));
  // EN
  fs.writeFileSync('data/en/chapter1/'+ch+'.json',JSON.stringify(dt(zh,translate,nameEN,locEN,infoEN),null,2),'utf8');
  // JA
  fs.writeFileSync('data/ja/chapter1/'+ch+'.json',JSON.stringify(dt(zh,translateJA,nameJA,locJA,infoJA),null,2),'utf8');
  console.log(ch+' done');
}
